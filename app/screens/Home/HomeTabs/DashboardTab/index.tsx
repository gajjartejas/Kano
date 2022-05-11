import React from 'react';
import { View, Image, ScrollView, StatusBar } from 'react-native';

//ThirdParty
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

//App modules
import Components from 'app/components';
import styles from './styles';
import { IAdsActivity } from 'app/components/DashboardItem';
import Utils from 'app/utils';
import Config from 'app/config';

//Params
type RootStackParamList = {
  DashboardTab: { userId: string };
  Purchase: {};
};
type Props = NativeStackScreenProps<RootStackParamList, 'DashboardTab'>;

const DashboardTab = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();

  //States

  const cardTapped = (item: IAdsActivity, _index: number) => {
    Utils.rateApp.saveItem(item);
  };

  const renderItem = ({ item, index }: { item: IAdsActivity; index: number; sectionIndex: number }) => {
    return <Components.DashboardItem key={item.id} item={item} index={index} onPress={cardTapped} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <ScrollView style={styles.carouselContainer}>
        <View style={styles.headerDetailContainer} />

        <View style={styles.listContainer}>
          {/* {groupedEntries.map((section, sectionIndex) => {
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
          })} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardTab;
