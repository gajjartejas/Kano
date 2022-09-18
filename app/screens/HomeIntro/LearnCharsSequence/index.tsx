import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { DraxProvider, DraxView } from 'react-native-drax';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import Animated, { Easing, FadeIn, FadeInDown, Layout } from 'react-native-reanimated';
import TinderCard from 'react-tinder-card';

//App modules
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import * as RouterParamTypes from 'app/config/router-params';
import Hooks from 'app/hooks/index';
import styles from './styles';
import Components from 'app/components';
import { LearnCharsMode } from 'app/config/router-params';
import AnimatedCharacter from 'app/components/AnimatedCharacter';

//Params
type RootStackParamList = {
  LearnCharsSequence: RouterParamTypes.LearnCharsSequenceParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsSequence'>;

const GROUP_COUNT = 1;

const PRACTICE_GROUP_COUNT_0 = 2;
const PRACTICE_GROUP_COUNT_1 = 4;

const LearnCharsSequence = ({ navigation, route }: Props) => {
  //Refs
  const refGroupedEntries = useRef<ICharCellListSection[]>([]);
  const refProgressIndex = useRef<number>(0);

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { type, learnMode } = route.params;
  const isRandomMode = learnMode === LearnCharsMode.LearnInRandom || learnMode === LearnCharsMode.PracticeInRandom;

  const groupedEntries = Hooks.ChartItemForTypes.useChartSectionsForTypes(type, isRandomMode);
  const isLearningMode = learnMode === LearnCharsMode.LearnInSequence || learnMode === LearnCharsMode.LearnInRandom;

  //States
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

  const [finishButtonTitle, setFinishButtonTitle] = useState('');
  const [finishButtonDisabled, setFinishButtonDisabled] = useState(false);
  const [finishLevelVisible, setFinishLevelVisible] = React.useState(false);

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

  const configInterface = useCallback(() => {
    switch (type) {
      case RouterParamTypes.LearnCharsType.Vowel:
        setTitle(t('LearnCharsSequenceScreen.header.titleVowels'));
        break;
      case RouterParamTypes.LearnCharsType.Constant:
        setTitle(t('LearnCharsSequenceScreen.header.titleConsonants'));
        break;
      case RouterParamTypes.LearnCharsType.Barakhadi:
        setTitle(t('LearnCharsSequenceScreen.header.titleBarakhadi'));
        break;
      case RouterParamTypes.LearnCharsType.Number:
        setTitle(t('LearnCharsSequenceScreen.header.titleNumerals'));
        break;
      default:
        break;
    }
  }, [t, type]);

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
    configInterface();
  }, [configInterface]);

  const onGoBack = () => {
    navigation.pop();
  };

  const onSwipe = (_direction: any) => {
    //Check learn mode or practice mode

    //For learning mode skip the practice mode section
    if (isLearningMode) {
      //Increase progress index
      refProgressIndex.current = refProgressIndex.current + 1;
      setProgressIndex(refProgressIndex.current);

      if (refProgressIndex.current === refGroupedEntries.current[progressSection].data.length) {
        //Show finish level modal
        setTimeout(() => {
          setFinishLevelVisible(true);
        }, 300);
      }
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
  };

  const onReceiveDragDrop = (payload: any, item: ICharCellItem, _index: number) => {
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
      setIncorrectAnswerIds(newIds);
    }
  };

  const onPressNext = () => {
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
  };

  const onPressHideDialog = () => {
    setFinishLevelVisible(false);

    console.log('progressSection', progressSection);
    console.log('groupedEntries.length', refGroupedEntries.current.length);
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
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <DraxProvider>
        <View style={styles.safeArea}>
          {!practiceMode && (
            <View
              onLayout={e => {
                setWidth(e.nativeEvent.layout.width);
              }}
              style={styles.cardContainer}>
              {cardPerGroup.map((item, index) => {
                return (
                  <TinderCard
                    key={item.id.toString()}
                    onSwipe={onSwipe}
                    swipeRequirementType={'position'}
                    swipeThreshold={100}
                    preventSwipe={[]}>
                    <Animated.View
                      entering={FadeInDown.duration(index % GROUP_COUNT === 1 ? 0 : 1000).easing(
                        Easing.bezierFn(1, 0, 0.17, 0.98),
                      )}
                      layout={Layout.springify()}
                      style={[
                        styles.card,
                        {
                          backgroundColor: colors.card,
                          width: width * 0.7,
                          height: width * 0.7,
                          top: (-width * 0.7) / 2 - 50,
                          left: (-width * 0.7) / 2,
                        },
                      ]}>
                      <Animated.View
                        entering={FadeIn.duration(1200).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
                        layout={Layout.springify()}
                        style={styles.animatedView}>
                        <AnimatedCharacter
                          emptyStroke={`${colors.onBackground}20`}
                          stroke={colors.onBackground}
                          strokeWidth={6}
                          initialDelay={0}
                          path={`svgs/${item.svg}`}
                        />
                      </Animated.View>
                      <Text style={[styles.subtitleText, { color: colors.text }]}>{item.en}</Text>
                    </Animated.View>
                  </TinderCard>
                );
              })}
            </View>
          )}

          {practiceMode && (
            <>
              <Animated.View
                entering={FadeInDown.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
                style={styles.practiceCardsContainer}>
                <View style={styles.practiceCardContainer}>
                  {practiceLeftCardPerGroup.map(v => {
                    return (
                      <DraxView
                        key={v.id.toString()}
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
                        key={item.id.toString()}
                        style={[
                          styles.receiver,
                          { backgroundColor: colors.card },
                          incorrectAnswerIds.map(l => l.right).includes(item.id) && { backgroundColor: colors.error },
                          correctAnswerIds.map(l => l.right).includes(item.id) && { backgroundColor: colors.primary },
                        ]}
                        draggingStyle={styles.dragging}
                        dragReleasedStyle={styles.dragging}
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
                style={styles.nextButtonStyle}
                mode="contained"
                onPress={onPressNext}>
                {finishButtonTitle}
              </Button>
            </>
          )}
        </View>
      </DraxProvider>
      <Components.AppLevelFinishDialog
        title={t('LearnCharsSequenceScreen.completeDialog.title', { section: progressSection + 1 })}
        description={t('LearnCharsSequenceScreen.completeDialog.description', { section: progressSection + 1 })}
        buttonTitle={t('general.continue')}
        visible={finishLevelVisible}
        onPressHideDialog={onPressHideDialog}
      />
    </View>
  );
};

export default LearnCharsSequence;
