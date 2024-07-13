import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

//App modules
import Components from 'app/components';
import { ICharListItem } from 'app/components/CharListItem';
import styles from './styles';
import { LearnCharsMode, LearnCharsType, LoggedInTabNavigatorParams } from 'app/navigation/types';
import useCharListProgressForType from 'app/hooks/useCharListProgressForType';
import AppHeader from 'app/components/AppHeader';
import useCharListItemForType from 'app/hooks/useCharListItemForType';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharsList'>;

const LearnCharsList = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { type, color } = route.params;
  const groupedEntries = useCharListItemForType(type);
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
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: `${color}15` }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={title}
        style={{ backgroundColor: `${color}15` }}
      />

      <Components.AppBaseView edges={[]} scroll={true} style={styles.safeArea}>
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
      </Components.AppBaseView>
    </Components.AppBaseView>
  );
};

export default LearnCharsList;
