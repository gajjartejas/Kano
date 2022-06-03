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
import Config from 'app/config';
import Hooks from 'app/hooks/index';
import { IConsonantListItem } from 'app/components/ConsonantListItem';

//Params
type RootStackParamList = {
  LearnConsonantsList: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnConsonantsList'>;

const LearnConsonantsList = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const groupedEntries = Hooks.useConsonantListItems();
  const { t } = useTranslation();

  //States
  const cardTapped = (item: IConsonantListItem, _index: number, _sectionIndex: number) => {
    Utils.rateApp.saveItem(item);
  };

  const renderItem = ({
    item,
    index,
    sectionIndex,
  }: {
    item: IConsonantListItem;
    index: number;
    sectionIndex: number;
  }) => {
    return (
      <Components.ConsonantListItem
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
        <Appbar.Content title={t('MORE_APPS_TITLE')} subtitle="" />
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

export default LearnConsonantsList;