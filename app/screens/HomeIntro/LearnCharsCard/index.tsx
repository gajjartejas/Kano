import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { DraxProvider, DraxView } from 'react-native-drax';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-easy-icon';
import Toast from 'react-native-toast-message';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import IdleTimerManager from 'react-native-idle-timer';

//App modules
import styles from './styles';
import Components from 'app/components';
import { easingSymbols } from 'app/config/extra-symbols';
import { LearnCharsMode, LearnCharsType, LoggedInTabNavigatorParams } from 'app/navigation/types';
import { AppTheme } from 'app/models/theme';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import { ICardLearnType, ICardOrderType, ICardSelectionType } from 'app/realm/modals/cardStatics';
import AppHeader from 'app/components/AppHeader';
import { useChartSectionsForTypes } from 'app/hooks/useChartItemForType';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import useToastMessages from 'app/hooks/useToastMessages';
import useHintConfig from 'app/hooks/useHintConfig';
import useCardStatics from 'app/realm/crud/cardStatics';
import useSoundPlayer from 'app/hooks/useAudioPlayer';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharsCard'>;

const GROUP_COUNT = 1;

const PRACTICE_GROUP_COUNT_0 = 2;
const PRACTICE_GROUP_COUNT_1 = 4;

const LearnCharsCard = ({ navigation, route }: Props) => {
  //Refs
  const refGroupedEntries = useRef<ICharCellListSection[]>([]);
  const refProgressIndex = useRef<number>(0);
  const refAutoSwipeTimer = useRef<any | null>(null);

  //Actions

  //Constants
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation();
  const { play } = useSoundPlayer();
  const { type, learnMode, onlyInclude, isRandomMode, color } = route.params;
  const groupedEntries = useChartSectionsForTypes(type, isRandomMode, onlyInclude);
  const isLearningMode = learnMode === LearnCharsMode.Learn;
  const [cardHints] = useHintConfig();
  const { addCardStatics } = useCardStatics();
  const insets = useSafeAreaInsets();
  const largeScreenMode = useLargeScreenMode();
  const [
    initialDelay,
    duration,
    strokeWidth,
    arrowFontSize,
    arrowSymbol,
    easingId,
    emptyStroke,
    highlightStroke,
    arrowFill,
    stroke,
    disableStrokeAnimation,
    showArrow,
    cardAutoSwipeDuration,
  ] = useCardAnimationConfigStore(store => [
    store.initialDelay,
    store.duration,
    store.strokeWidth,
    store.arrowFontSize,
    store.arrowSymbol,
    store.easingId,
    store.emptyStroke,
    store.highlightStroke,
    store.arrowFill,
    store.stroke,
    store.disableStrokeAnimation,
    store.showArrow,
    store.cardAutoSwipeDuration,
  ]);
  useToastMessages(cardHints);

  //States
  const [playing, setPlaying] = useState(true);
  const [progressSection, setProgressSection] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [cardPerGroup, setCardPerGroup] = useState<ICharCellItem[]>([]);

  //For practice mode
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceLeftCardPerGroup, setPracticeLeftCardPerGroup] = useState<ICharCellItem[]>([]);
  const [practiceRightCardPerGroup, setPracticeRightCardPerGroup] = useState<ICharCellItem[]>([]);
  const [incorrectAnswerIds, setIncorrectAnswerIds] = useState<{ left: number; right: number }[]>([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState<{ left: number; right: number }[]>([]);

  //UI Elements
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(0);

  //Mute
  const [mute, setMute] = useState(false);

  //Auto Play
  const [autoSwiping, setAutoSwiping] = useState(false);

  //Alerts
  const [switchToRandomModeAlertVisible, setSwitchToRandomModeAlertVisible] = useState(false);

  const [finishButtonTitle, setFinishButtonTitle] = useState('');
  const [finishButtonDisabled, setFinishButtonDisabled] = useState(false);
  const [finishLevelVisible, setFinishLevelVisible] = React.useState(false);

  useEffect(() => {
    IdleTimerManager.setIdleTimerDisabled(autoSwiping);
    return () => IdleTimerManager.setIdleTimerDisabled(false);
  }, [autoSwiping]);

  useEffect(() => {
    if (!autoSwiping) {
      return;
    }
    if (refAutoSwipeTimer.current === null) {
      //Increase progress index
      refProgressIndex.current = refProgressIndex.current + 1;
      setProgressIndex(refProgressIndex.current);
    }

    refAutoSwipeTimer.current = setInterval(() => {
      //Increase progress index
      refProgressIndex.current = refProgressIndex.current + 1;
      setProgressIndex(refProgressIndex.current);

      if (refProgressIndex.current === refGroupedEntries.current[progressSection].data.length) {
        Toast.show({
          text1: t('learnCharsCardScreen.completeDialog.title', { section: progressSection + 1 }),
          text2: t('learnCharsCardScreen.completeDialog.description', { section: progressSection + 1 }),
          position: 'bottom',
        });
        if (progressSection === refGroupedEntries.current.length - 1) {
          navigation.pop();
        }

        //Go to next level
        refProgressIndex.current = 0;
        setIncorrectAnswerIds([]);
        setCorrectAnswerIds([]);
        setPracticeMode(false);
        setProgressSection(progressSection + 1);
        setProgressIndex(0);
        return;
      }
    }, cardAutoSwipeDuration);

    return () => {
      refAutoSwipeTimer.current && clearInterval(refAutoSwipeTimer.current);
      refAutoSwipeTimer.current = null;
    };
  }, [autoSwiping, cardAutoSwipeDuration, navigation, progressSection, t]);

  useEffect(() => {
    if (refGroupedEntries.current.length > 0) {
      return;
    }
    refGroupedEntries.current = isRandomMode
      ? [
          ...groupedEntries
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value),
        ]
      : groupedEntries;
  }, [groupedEntries, isRandomMode]);

  useEffect(() => {
    if (mute) {
      return;
    }
    //Play audio after screen loads/animation completes
    if (cardPerGroup.length < 1 || practiceMode) {
      return;
    }
    if (play === null) {
      return;
    }
    let refTimeout = setTimeout(() => {
      play(cardPerGroup[0].audio);
      addCardStatics({
        charId: cardPerGroup[0].id,
        orderType: isRandomMode ? ICardOrderType.RANDOM : ICardOrderType.SEQUENCE,
        learnType: isLearningMode ? ICardLearnType.LEARN : ICardLearnType.PRACTICE,
        selectedType: onlyInclude === undefined ? ICardSelectionType.ALL : ICardSelectionType.CUSTOM,
        createdDate: new Date(),
        synced: false,
        sectionType: type,
      });
    }, initialDelay);
    return () => clearTimeout(refTimeout);
  }, [
    addCardStatics,
    cardPerGroup,
    initialDelay,
    isLearningMode,
    isRandomMode,
    mute,
    onlyInclude,
    play,
    practiceMode,
    type,
  ]);

  useEffect(() => {
    if (progressIndex % GROUP_COUNT === 1) {
      return;
    }

    let progressSectionsToShow = refGroupedEntries.current[progressSection];
    let calculatedCharsToShow = progressSectionsToShow.data.slice(progressIndex, GROUP_COUNT + progressIndex).reverse();
    setCardPerGroup([...calculatedCharsToShow]);

    if (progressIndex % PRACTICE_GROUP_COUNT_1 === 0) {
      let calculatedPracticeCardPerGroup = progressSectionsToShow.data.slice(
        progressIndex - PRACTICE_GROUP_COUNT_1,
        progressIndex,
      );

      //No change in right cards
      setPracticeLeftCardPerGroup([...calculatedPracticeCardPerGroup]);

      //Randomize the right/answer cards
      setPracticeRightCardPerGroup([
        ...calculatedPracticeCardPerGroup
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),
      ]);
    } else if (progressIndex % PRACTICE_GROUP_COUNT_0 === 0) {
      let calculatedPracticeCardPerGroup = progressSectionsToShow.data.slice(
        progressIndex - PRACTICE_GROUP_COUNT_0,
        progressIndex,
      );

      //No change in right cards
      setPracticeLeftCardPerGroup([...calculatedPracticeCardPerGroup]);

      //Randomize the right/answer cards
      setPracticeRightCardPerGroup([
        ...calculatedPracticeCardPerGroup
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),
      ]);
    }
  }, [progressIndex, progressSection]);

  useEffect(() => {
    // Enable/Disable finish button according to progress.
    setFinishButtonDisabled(!(practiceMode && correctAnswerIds.length === practiceLeftCardPerGroup.length));
    setFinishButtonTitle(
      progressIndex === refGroupedEntries.current[progressSection].data.length
        ? t('general.finish')
        : t('general.next'),
    );
  }, [correctAnswerIds.length, practiceLeftCardPerGroup.length, practiceMode, progressIndex, progressSection, t]);

  useEffect(() => {
    switch (type) {
      case LearnCharsType.Vowel:
        setTitle(t('learnCharsCardScreen.header.titleVowels'));
        break;
      case LearnCharsType.Constant:
        setTitle(t('learnCharsCardScreen.header.titleConsonants'));
        break;
      case LearnCharsType.Barakhadi:
        setTitle(t('learnCharsCardScreen.header.titleBarakhadi'));
        break;
      case LearnCharsType.Number:
        setTitle(t('learnCharsCardScreen.header.titleNumerals'));
        break;
      default:
        break;
    }
  }, [t, type]);

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onSwipe = useCallback(
    (_direction: any) => {
      //Check learn mode or practice mode

      //For learning mode skip the practice mode section
      if (isLearningMode) {
        setTimeout(() => {
          //Increase progress index
          refProgressIndex.current = refProgressIndex.current + 1;
          setProgressIndex(refProgressIndex.current);

          if (refProgressIndex.current === refGroupedEntries.current[progressSection].data.length) {
            //Show finish level modal

            setFinishLevelVisible(true);
          }
        }, 300);
        return;
      }

      //Enable practice mode
      setTimeout(() => {
        refProgressIndex.current = refProgressIndex.current + 1;
        setProgressIndex(refProgressIndex.current);

        if (refProgressIndex.current % PRACTICE_GROUP_COUNT_0 === 0 && !practiceMode && refProgressIndex.current > 0) {
          setPracticeMode(true);
        }
      }, 200);
    },
    [isLearningMode, practiceMode, progressSection],
  );

  const onReceiveDragDrop = useCallback(
    (payload: any, item: ICharCellItem, _index: number) => {
      //Answer is already correct
      //Remaining  card -> Already Correct Answer
      if (correctAnswerIds.map(l => l.right).includes(item.id)) {
        return;
      }

      //Answer is correct
      //Remaining  card -> Correct Answer
      if (payload === item.id && !correctAnswerIds.map(l => l.right).includes(item.id)) {
        let newIds = [...correctAnswerIds, { left: payload, right: item.id }];
        setTimeout(() => {
          setCorrectAnswerIds(newIds);
        }, 500);
      }

      //Answer is incorrect
      //Remaining  card -> Incorrect Answer
      if (payload !== item.id && !incorrectAnswerIds.map(l => l.right).includes(item.id)) {
        let newIds = [...incorrectAnswerIds, { left: payload, right: item.id }];
        setTimeout(() => {
          setIncorrectAnswerIds(newIds);
        }, 500);
      }
    },
    [correctAnswerIds, incorrectAnswerIds],
  );

  const onPressNext = useCallback(() => {
    if (progressIndex === refGroupedEntries.current[progressSection].data.length) {
      //Show finish level modal
      setFinishLevelVisible(true);
    } else {
      //Go to card mode
      //Disable practice mode
      setIncorrectAnswerIds([]);
      setCorrectAnswerIds([]);
      setPracticeMode(false);
    }
  }, [progressIndex, progressSection]);

  const onPressHideDialog = useCallback(() => {
    setFinishLevelVisible(false);

    if (progressSection === refGroupedEntries.current.length - 1) {
      navigation.pop();
    }

    //Go to next level
    refProgressIndex.current = 0;
    setIncorrectAnswerIds([]);
    setCorrectAnswerIds([]);
    setPracticeMode(false);
    setProgressSection(progressSection + 1);
    setProgressIndex(0);
  }, [navigation, progressSection]);

  const onPressCard = useCallback(
    (item: ICharCellItem, _index: number) => {
      if (mute) {
        return;
      }
      if (play === null) {
        return;
      }
      play(item.audio);
      setPlaying(false);
      setTimeout(() => {
        setPlaying(true);
      }, 100);
    },
    [mute, play],
  );

  const onToggleRandomSequence = useCallback(() => {
    setSwitchToRandomModeAlertVisible(true);
  }, []);

  const onToggleMuteUnmute = useCallback(() => {
    setMute(!mute);
  }, [mute]);

  const onPresentCharInfo = useCallback(() => {
    navigation.push('LearnCharInfo', {
      index: progressIndex,
      sectionIndex: progressSection,
      groupedEntries,
      type,
      color: color,
    });
  }, [color, groupedEntries, navigation, progressIndex, progressSection, type]);

  const switchToRandom = useCallback(() => {
    navigation.replace('LearnCharsCard', {
      type,
      learnMode: learnMode,
      isRandomMode: !isRandomMode,
      onlyInclude: onlyInclude,
      color: color,
    });
  }, [color, isRandomMode, learnMode, navigation, onlyInclude, type]);

  const onPressSetting = useCallback(() => {
    navigation.push('SwipeCardSetting', {});
  }, [navigation]);

  const onCloseRandomDialog = useCallback(() => {
    setSwitchToRandomModeAlertVisible(false);
  }, []);

  const onToggleAutoSwipe = useCallback(() => {
    setAutoSwiping(!autoSwiping);
  }, [autoSwiping]);

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container, { backgroundColor: `${color}15` }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={title}
        style={{ backgroundColor: `${color}15` }}
      />

      <DraxProvider>
        <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
          {!practiceMode && (
            <View
              pointerEvents={autoSwiping ? 'none' : 'auto'}
              onLayout={e => {
                const { width: w, height: h } = e.nativeEvent.layout;
                setWidth(w > h ? h : w);
              }}
              style={styles.cardContainer}>
              {cardPerGroup.map((item, index) => {
                return (
                  <Components.SwipeCard
                    key={item.id.toString()}
                    onSwipe={onSwipe}
                    onPress={() => onPressCard(item, index)}
                    index={index}
                    color={color}
                    width={width}
                    initialDelay={initialDelay}
                    duration={duration}
                    emptyStroke={emptyStroke}
                    highlightStroke={highlightStroke}
                    arrowFill={arrowFill}
                    stroke={stroke}
                    disableStrokeAnimation={disableStrokeAnimation}
                    showArrow={showArrow}
                    strokeWidth={strokeWidth}
                    play={playing}
                    item={item}
                    arrowSymbol={arrowSymbol}
                    arrowFontSize={arrowFontSize}
                    easing={easingSymbols.filter(v => v.id === easingId)[0].easing}
                    groupCount={GROUP_COUNT}
                  />
                );
              })}
            </View>
          )}

          {practiceMode && (
            <>
              <Animated.View
                entering={FadeInDown.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
                style={[styles.practiceCardsContainer, largeScreenMode && styles.practiceCardsContainerTablet]}>
                <View style={styles.practiceCardContainer}>
                  {practiceLeftCardPerGroup.map(v => {
                    return (
                      <DraxView
                        key={v.id.toString()}
                        animateSnapback={false}
                        draggable={!correctAnswerIds.map(l => l.left).includes(v.id)}
                        draggingStyle={styles.dragging}
                        dragReleasedStyle={styles.dragging}
                        style={[
                          styles.draggable,
                          { backgroundColor: colors.card },
                          incorrectAnswerIds.map(l => l.left).includes(v.id) && { backgroundColor: colors.error },
                          correctAnswerIds.map(l => l.left).includes(v.id) && { backgroundColor: colors.primary },
                        ]}
                        payload={v.id}>
                        <Text style={styles.practiceCardText}>{v.gu}</Text>
                      </DraxView>
                    );
                  })}
                </View>

                <View style={styles.practiceCardContainer}>
                  {practiceRightCardPerGroup.map((item: ICharCellItem, index: number) => {
                    return (
                      <DraxView
                        receptive
                        key={item.id.toString()}
                        style={[
                          styles.receiver,
                          { backgroundColor: colors.card },
                          incorrectAnswerIds.map(l => l.right).includes(item.id) && { backgroundColor: colors.error },
                          correctAnswerIds.map(l => l.right).includes(item.id) && { backgroundColor: colors.primary },
                        ]}
                        draggingStyle={styles.dragging}
                        dragReleasedStyle={styles.dragging}
                        longPressDelay={0}
                        receivingStyle={[styles.receiving, { borderColor: colors.primary }]}
                        onReceiveDragDrop={({ dragged: { payload } }) => onReceiveDragDrop(payload, item, index)}>
                        <Text style={styles.practiceCardText}>{item.en}</Text>
                      </DraxView>
                    );
                  })}
                </View>
              </Animated.View>
              <Button
                disabled={finishButtonDisabled}
                style={[styles.nextButtonStyle, largeScreenMode && styles.practiceCardsContainerTablet]}
                mode="contained-tonal"
                onPress={onPressNext}>
                {finishButtonTitle}
              </Button>
            </>
          )}

          {!practiceMode && (
            <View style={[styles.bottomButtons, insets.bottom > 0 && styles.bottomMargin]}>
              {isLearningMode && (
                <Button
                  mode="contained-tonal"
                  icon={autoSwiping ? 'stop' : 'play'}
                  labelStyle={[styles.playPauseButtonLabel]}
                  onPress={onToggleAutoSwipe}>
                  {autoSwiping ? t('learnCharsCardScreen.stop') : t('learnCharsCardScreen.play')}
                </Button>
              )}

              <IconButton
                style={[styles.randomModeIconButton, { backgroundColor: `${color}30` }]}
                icon={() => (
                  <Icon
                    type={'font-awesome'}
                    name={isRandomMode ? 'long-arrow-right' : 'random'}
                    color={colors.white}
                    size={18}
                  />
                )}
                mode="contained-tonal"
                onPress={onToggleRandomSequence}
              />

              <IconButton
                style={[styles.muteUnmuteButton, { backgroundColor: `${color}30` }]}
                icon={() => (
                  <Icon
                    type={'font-awesome5'}
                    name={mute ? 'volume-mute' : 'volume-up'}
                    color={colors.white}
                    size={18}
                  />
                )}
                mode="contained-tonal"
                onPress={onToggleMuteUnmute}
              />

              <IconButton
                style={[styles.settingButton, { backgroundColor: `${color}30` }]}
                icon={() => <Icon type={'font-awesome5'} name={'info'} color={colors.white} size={18} />}
                mode="contained-tonal"
                onPress={onPresentCharInfo}
              />

              <IconButton
                style={[styles.presentCharInfoButton, { backgroundColor: `${color}30` }]}
                icon={() => <Icon type={'font-awesome'} name={'gear'} color={colors.white} size={18} />}
                mode="contained-tonal"
                onPress={onPressSetting}
              />
            </View>
          )}
        </Components.AppBaseView>
      </DraxProvider>
      <Components.AppLevelFinishDialog
        title={t('learnCharsCardScreen.completeDialog.title', { section: progressSection + 1 })}
        description={t('learnCharsCardScreen.completeDialog.description', { section: progressSection + 1 })}
        buttonTitle={t('general.continue')}
        visible={finishLevelVisible}
        onPressHideDialog={onPressHideDialog}
      />
      <Components.AppActionDialog
        title={t('learnCharsCardScreen.switchRandomAlert.title')}
        description={
          isRandomMode
            ? t('learnCharsCardScreen.switchRandomAlert.descSeq')
            : t('learnCharsCardScreen.switchRandomAlert.descRandom')
        }
        visible={switchToRandomModeAlertVisible}
        cancelText={t('general.cancel')}
        confirmText={t('general.ok')}
        onPressConfirm={() => {
          setSwitchToRandomModeAlertVisible(false);
          setTimeout(() => {
            switchToRandom();
          }, 500);
        }}
        onPressCancel={onCloseRandomDialog}
      />
    </SafeAreaView>
  );
};

export default LearnCharsCard;
