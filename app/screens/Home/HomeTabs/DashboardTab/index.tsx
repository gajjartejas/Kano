import React from 'react';
import { View, Dimensions, ScrollView, StatusBar } from 'react-native';

//ThirdParty
import { Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

//App modules
import Components from 'app/components';
import styles from './styles';
import Utils from 'app/utils';
import Config from 'app/config';
import Hooks from 'app/hooks/index';
import { IHomeListItem } from 'app/components/HomeListItem';
import * as RouterParamTypes from 'app/config/router-params';

//Params
type RootStackParamList = {
  DashboardTab: RouterParamTypes.DashboardTabParams;
  LearnCharsList: RouterParamTypes.LearnCharsListParams;
  GujaratiScriptIntro: RouterParamTypes.GujaratiScriptIntroParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'DashboardTab'>;

const DashboardTab = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const groupedEntries = Hooks.useHomeListItems();
  const { t } = useTranslation();

  //States
  const cardTapped = (item: IHomeListItem, index: number, sectionIndex: number) => {
    if (sectionIndex === 0 && index === 0) {
      navigation.push('GujaratiScriptIntro', {});
    } else if (sectionIndex === 0 && index === 1) {
      navigation.push('LearnCharsList', { type: RouterParamTypes.LearnCharsType.Vowel });
    } else if (sectionIndex === 0 && index === 2) {
      navigation.push('LearnCharsList', { type: RouterParamTypes.LearnCharsType.Constant });
    } else if (sectionIndex === 0 && index === 3) {
      navigation.push('LearnCharsList', { type: RouterParamTypes.LearnCharsType.Barakhadi });
    } else if (sectionIndex === 0 && index === 4) {
      navigation.push('LearnCharsList', { type: RouterParamTypes.LearnCharsType.Number });
    }
    // Utils.rateApp.saveItem(item);
  };

  const renderItem = ({ item, index, sectionIndex }: { item: IHomeListItem; index: number; sectionIndex: number }) => {
    return (
      <Components.HomeListItem
        key={item.id}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.carouselContainer}>
        <View style={styles.headerImage}>
          <Components.WaveBackground />
        </View>

        <View style={styles.headerDetailContainer}>
          <View>
            <Text style={styles.headerDetailText}>{t('homeScreen.header.title', { name: 'Tejas' })}</Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          {groupedEntries.map((section, sectionIndex) => {
            return (
              <View style={styles.section} key={section.title}>
                <Text style={[styles.sectionHeader, sectionIndex === 0 ? styles.whiteSectionHeader : null]}>
                  {t(section.title)}
                </Text>
                <View style={styles.sectionItem}>
                  {section.data.map((item, index) => {
                    return renderItem({ item, index, sectionIndex });
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardTab;
