import React from 'react';
import { View, Image, ScrollView, StatusBar } from 'react-native';

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

//Params
type RootStackParamList = {
  DashboardTab: { userId: string };
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
  const cardTapped = (item: IHomeListItem, _index: number, _sectionIndex: number) => {
    Utils.rateApp.saveItem(item);
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
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <ScrollView style={styles.carouselContainer}>
        {/* <Image source={Config.Images.icons.home_header} style={styles.headerImage} /> */}

        <View style={styles.headerDetailContainer}>
          <View>
            <Text style={styles.headerDetailText}>{t('miui_version', { version: 'Lorem' })}</Text>
            <Text style={styles.headerDetailText}>
              {t('android_version', { version: DeviceInfo.getSystemVersion() })}
            </Text>
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
