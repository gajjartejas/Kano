import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';
import TinderCard from 'react-tinder-card';

//App modules
import * as RouterParamTypes from 'app/config/router-params';
import Hooks from 'app/hooks/index';
import styles from './styles';

//Params
type RootStackParamList = {
  LearnCharsSequence: RouterParamTypes.LearnCharsSequenceParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsSequence'>;

const LearnCharsSequence = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { type } = route.params;
  const groupedEntries = Hooks.useChartItemForTypes(type);

  //States
  const [title, setTitle] = useState('');

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
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <View style={styles.cardContainer}>
          {groupedEntries[0].data.map(item => {
            return (
              <TinderCard onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} preventSwipe={[]}>
                <View style={styles.card}>
                  <Text style={[styles.titleText, { color: colors.text }]}>{item.gu}</Text>
                </View>
              </TinderCard>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default LearnCharsSequence;
