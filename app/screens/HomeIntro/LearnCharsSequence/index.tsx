import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';
import TinderCard from 'react-tinder-card';
import Animated, { Easing, FadeIn, FadeInDown, FadeOutLeft, Layout } from 'react-native-reanimated';
//App modules
import * as RouterParamTypes from 'app/config/router-params';
import Hooks from 'app/hooks/index';
import styles from './styles';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';

//Params
type RootStackParamList = {
  LearnCharsSequence: RouterParamTypes.LearnCharsSequenceParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsSequence'>;

const GROUP_COUNT = 2;

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
    }, 200);
    console.log('setProgressIndex ' + refProgressIndex.current);
  };

  const onCardLeftScreen = (myIdentifier: any) => {};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
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
      </View>
    </View>
  );
};

export default LearnCharsSequence;
