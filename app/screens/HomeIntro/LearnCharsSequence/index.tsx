import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { DraxProvider, DraxView } from 'react-native-drax';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import Animated, { Easing, FadeInDown, Layout } from 'react-native-reanimated';
import TinderCard from 'react-tinder-card';

//App modules
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import * as RouterParamTypes from 'app/config/router-params';
import Hooks from 'app/hooks/index';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

//Params
type RootStackParamList = {
  LearnCharsSequence: RouterParamTypes.LearnCharsSequenceParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsSequence'>;

const GROUP_COUNT = 2;

const PRACTICE_GROUP_COUNT_0 = 2;
const PRACTICE_GROUP_COUNT_1 = 4;

const LearnCharsSequence = ({ navigation, route }: Props) => {
  //Refs
  const refGroupedEntries = useRef<ICharCellListSection[]>([]);
  const refProgressIndex = useRef<number>(0);
  const refProgressSection = useRef<number>(0);

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { type } = route.params;
  const groupedEntries = Hooks.useChartItemForTypes(type);

  //States
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(0);

  const [progressSection, setProgressSection] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [cardPerGroup, setCardPerGroup] = useState<ICharCellItem[]>([]);

  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceCardPerGroup, setPracticeCardPerGroup] = useState<ICharCellItem[]>([]);
  const [incorrectAnswerIds, setIncorrectAnswerIds] = useState<{ left: number; right: number }[]>([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState<{ left: number; right: number }[]>([]);

  useEffect(() => {
    refGroupedEntries.current = groupedEntries;
  }, [groupedEntries]);

  useEffect(() => {
    console.log('progressIndex', progressIndex);
    if (progressIndex % GROUP_COUNT === 1) {
      return;
    }
    let progressSectionsToShow = refGroupedEntries.current[progressSection];
    let calculatedCharsToShow = progressSectionsToShow.data.slice(progressIndex, GROUP_COUNT + progressIndex).reverse();
    setCardPerGroup([...calculatedCharsToShow]);

    if (progressIndex % PRACTICE_GROUP_COUNT_1 === 0) {
      let calculatedPracticeCardPerGroup = progressSectionsToShow.data
        .slice(progressIndex - PRACTICE_GROUP_COUNT_1, progressIndex)
        .reverse();
      setPracticeCardPerGroup([...calculatedPracticeCardPerGroup]);
      console.log('calculatedPracticeCardPerGroup', JSON.stringify(calculatedPracticeCardPerGroup));
    } else if (progressIndex % PRACTICE_GROUP_COUNT_0 === 0) {
      let calculatedPracticeCardPerGroup = progressSectionsToShow.data
        .slice(progressIndex - PRACTICE_GROUP_COUNT_0, progressIndex)
        .reverse();
      setPracticeCardPerGroup([...calculatedPracticeCardPerGroup]);
      console.log('calculatedPracticeCardPerGroup', JSON.stringify(calculatedPracticeCardPerGroup));
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
    configInterface();
  }, [configInterface]);

  const onGoBack = () => {
    navigation.pop();
  };

  const onSwipe = (direction: any) => {
    setTimeout(() => {
      refProgressIndex.current = refProgressIndex.current + 1;
      setProgressIndex(refProgressIndex.current);

      if (refProgressIndex.current % GROUP_COUNT === 0 && !practiceMode && refProgressIndex.current > 0) {
        setPracticeMode(true);
      }
    }, 200);
  };

  const onCardLeftScreen = (myIdentifier: any) => {};

  return (
    <DraxProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Appbar.Header style={{ backgroundColor: colors.background }}>
          <Appbar.BackAction onPress={onGoBack} />
          <Appbar.Content title={title} subtitle="" />
        </Appbar.Header>
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
                    onCardLeftScreen={onCardLeftScreen}
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
                      <Text maxFontSizeMultiplier={1} style={[styles.titleText, { color: colors.text }]}>
                        {item.gu}
                      </Text>
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
                  {practiceCardPerGroup.map(v => {
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
                        onDragStart={() => {
                          console.log('start drag');
                        }}
                        payload={v.id}>
                        <Text style={styles.practiceCardText}>{v.gu}</Text>
                      </DraxView>
                    );
                  })}
                </View>

                <View style={styles.practiceCardContainer}>
                  {practiceCardPerGroup.map(v => {
                    return (
                      <DraxView
                        style={[
                          styles.receiver,
                          { backgroundColor: colors.card },
                          incorrectAnswerIds.map(l => l.right).includes(v.id) && { backgroundColor: colors.error },
                          correctAnswerIds.map(l => l.right).includes(v.id) && { backgroundColor: colors.primary },
                        ]}
                        draggingStyle={styles.dragging}
                        dragReleasedStyle={styles.dragging}
                        receivingStyle={[styles.receiving, { borderColor: colors.primary }]}
                        onReceiveDragEnter={({ dragged: { payload } }) => {
                          console.log(`hello ${payload}`);
                        }}
                        onReceiveDragExit={({ dragged: { payload } }) => {
                          console.log(`goodbye ${payload}`);
                        }}
                        onReceiveDragDrop={({ dragged: { payload } }) => {
                          console.log(`received ${payload}`);
                          if (correctAnswerIds.map(l => l.right).includes(v.id)) {
                            console.log(`answer already corrected ${payload}`);
                            return;
                          }

                          if (payload === v.id && !correctAnswerIds.map(l => l.right).includes(v.id)) {
                            let newIds = [...correctAnswerIds, { left: payload, right: v.id }];
                            setCorrectAnswerIds(newIds);
                            return;
                          }

                          if (payload !== v.id && !incorrectAnswerIds.map(l => l.right).includes(v.id)) {
                            let newIds = [...incorrectAnswerIds, { left: payload, right: v.id }];
                            setIncorrectAnswerIds(newIds);
                          }
                        }}>
                        <Text style={styles.practiceCardText}>{v.en}</Text>
                      </DraxView>
                    );
                  })}
                </View>
              </Animated.View>
              <Button
                disabled={!(practiceMode && correctAnswerIds.length === practiceCardPerGroup.length)}
                style={styles.nextButtonStyle}
                mode="contained"
                onPress={() => {
                  setIncorrectAnswerIds([]);
                  setCorrectAnswerIds([]);
                  setPracticeMode(false);
                }}>
                {'NEXT'}
              </Button>
            </>
          )}
        </View>
      </SafeAreaView>
    </DraxProvider>
  );
};

export default LearnCharsSequence;
