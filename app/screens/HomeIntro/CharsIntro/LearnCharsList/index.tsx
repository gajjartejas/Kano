import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';

//ThirdParty
import { Appbar, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

//App modules
import Components from 'app/components';
import styles from './styles';
import Hooks from 'app/hooks/index';
import { ICharListItem } from 'app/components/CharListItem';
import * as RouterParamTypes from 'app/config/router-params';

//Params
type RootStackParamList = {
  LearnCharsList: RouterParamTypes.LearnCharsListParams;
  LearnCharsChart: RouterParamTypes.LearnCharsChartParams;
  LearnCharsSequence: RouterParamTypes.LearnCharsSequenceParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsList'>;

const LearnCharsList = ({ navigation, route }: Props) => {
  //Refs

  //Actions unnecessary

  //Constants
  const { colors } = useTheme();
  const groupedEntries = Hooks.useVowelstListItems();
  const { t } = useTranslation();
  const { type } = route.params;

  //States
  const [title, setTitle] = useState('');

  const configInterface = useCallback(() => {
    switch (type) {
      case RouterParamTypes.LearnCharsType.Vowel:
        setTitle(t('learnCharsListScreen.header.titleVowels'));
        break;

      case RouterParamTypes.LearnCharsType.Constant:
        setTitle(t('learnCharsListScreen.header.titleConsonants'));

        break;

      case RouterParamTypes.LearnCharsType.Barakhadi:
        setTitle(t('learnCharsListScreen.header.titleBarakhadi'));

        break;

      case RouterParamTypes.LearnCharsType.Number:
        setTitle(t('learnCharsListScreen.header.titleNumerals'));

        break;
      default:
        break;
    }
  }, [t, type]);

  useEffect(() => {
    configInterface();
  }, [configInterface]);

  const cardTapped = (item: ICharListItem, index: number, sectionIndex: number) => {
    if (sectionIndex === 0 && index === 0) {
      navigation.push('LearnCharsChart', { type });
    } else if (sectionIndex === 0 && index === 1) {
      navigation.push('LearnCharsSequence', { type });
    } else if (sectionIndex === 0 && index === 2) {
      // navigation.push('LearnConsonantsList', {});
    } else if (sectionIndex === 0 && index === 3) {
      //navigation.push('LearnBarakhadisList', {});
    } else if (sectionIndex === 0 && index === 4) {
      //navigation.push('LearnNumeralsList', {});
    }
  };

  const renderItem = ({ item, index, sectionIndex }: { item: ICharListItem; index: number; sectionIndex: number }) => {
    return (
      <Components.VowelstListItem
        key={item.id}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
      />
    );
  };

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {groupedEntries.map((section, sectionIndex) => {
            return (
              <View style={styles.section} key={section.title}>
                <Text style={styles.sectionHeader}>{t(section.title)}</Text>
                <View style={styles.sectionItem}>
                  {section.data.map((item, index) => {
                    return renderItem({ item, index, sectionIndex });
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default LearnCharsList;
