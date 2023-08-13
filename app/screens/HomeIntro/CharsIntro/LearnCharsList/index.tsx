import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';

//App modules
import Components from 'app/components';
import { ICharListItem } from 'app/components/CharListItem';
import Hooks from 'app/hooks/index';
import styles from './styles';
import { LearnCharsMode, LearnCharsType, LoggedInTabNavigatorParams } from 'app/navigation/types';
import useCharListProgressForType from 'app/hooks/useCharListProgressForType';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharsList'>;

const LearnCharsList = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { type, color } = route.params;
  const groupedEntries = Hooks.useCharListItemForType(type);
  const { t } = useTranslation();
  const { getCharListProgressForType } = useCharListProgressForType();
  const progressListItems = getCharListProgressForType(type);

  //States
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (type) {
      case LearnCharsType.Vowel:
        setTitle(t('learnCharsListScreen.header.titleVowels'));
        break;

      case LearnCharsType.Constant:
        setTitle(t('learnCharsListScreen.header.titleConsonants'));
        break;

      case LearnCharsType.Barakhadi:
        setTitle(t('learnCharsListScreen.header.titleBarakhadi'));
        break;

      case LearnCharsType.Number:
        setTitle(t('learnCharsListScreen.header.titleNumerals'));
        break;

      default:
        break;
    }
  }, [t, type]);

  const cardTapped = useCallback(
    (item: ICharListItem, index: number, sectionIndex: number) => {
      if (sectionIndex === 0 && index === 0) {
        navigation.push('LearnCharsChart', { type, color: item.color });
      } else if (sectionIndex === 0 && index === 1) {
        navigation.push('LearnCharsCard', {
          type,
          learnMode: LearnCharsMode.Learn,
          isRandomMode: false,
          color: item.color,
        });
      } else if (sectionIndex === 0 && index === 2) {
        navigation.push('LearnBySelectedChar', {
          type,
          learnMode: LearnCharsMode.Learn,
          isRandomMode: false,
          color: item.color,
        });
      } else if (sectionIndex === 1 && index === 0) {
        navigation.push('LearnCharsCard', {
          type,
          learnMode: LearnCharsMode.Practice,
          isRandomMode: false,
          color: item.color,
        });
      } else if (sectionIndex === 1 && index === 1) {
        navigation.push('LearnBySelectedChar', {
          type,
          learnMode: LearnCharsMode.Practice,
          isRandomMode: false,
          color: item.color,
        });
      }
    },
    [navigation, type],
  );

  const renderItem = ({
    item,
    index,
    sectionIndex,
    progress,
  }: {
    item: ICharListItem;
    index: number;
    sectionIndex: number;
    progress: number;
  }) => {
    return (
      <Components.CharListItem
        key={item.id}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
        progress={progress}
      />
    );
  };

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: `${color}20` }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {groupedEntries.map((section, sectionIndex) => {
            const progressSection = progressListItems[sectionIndex];
            return (
              <View style={styles.section} key={sectionIndex.toString()}>
                <Text style={styles.sectionHeader}>{t(section.title)}</Text>
                <View style={styles.sectionItem}>
                  {section.data.map((item, index) => {
                    const progress = progressSection.data[index];
                    return renderItem({ item, index, sectionIndex, progress });
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Components.AppBaseView>
    </View>
  );
};

export default LearnCharsList;
