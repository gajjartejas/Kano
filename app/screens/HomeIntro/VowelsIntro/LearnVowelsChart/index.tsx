import React from 'react';
import { View, Dimensions, ScrollView, StatusBar } from 'react-native';

//ThirdParty
import { Appbar, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

//App modules
import Components from 'app/components';
import styles from './styles';
import Utils from 'app/utils';
import Hooks from 'app/hooks/index';
import Config from 'app/config';
import { IVovelCharCellItem, IVovelListSection } from 'app/components/VowelCharCellItem';
import * as RouterParamTypes from 'app/config/router-params';

//Params
type RootStackParamList = {
  LearnVowelsList: RouterParamTypes.LearnVowelsListParams;
  LearnVowelsCharInfo: RouterParamTypes.LearnVowelsCharInfoParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnVowelsList'>;

const LearnVowelsList = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const groupedEntries = Hooks.useVowels();
  const { t } = useTranslation();

  //States
  const cardTapped = (item: IVovelCharCellItem, index: number, sectionIndex: number) => {
    navigation.push('LearnVowelsCharInfo', { index, sectionIndex, groupedEntries });
  };

  const renderItem = ({
    item,
    index,
    sectionIndex,
  }: {
    item: IVovelCharCellItem;
    index: number;
    sectionIndex: number;
  }) => {
    return (
      <Components.VowelCharCellItem
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
      <StatusBar translucent={false} backgroundColor={colors.background} />

      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnVowelsChartScreen.header.title')} subtitle="" />
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

export default LearnVowelsList;
