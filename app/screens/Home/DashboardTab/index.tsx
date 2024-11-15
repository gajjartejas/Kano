import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Text, useTheme } from 'react-native-paper';

//App modules
import Components from 'app/components';
import styles from './styles';
import Config from 'app/config';
import { IHomeListItem } from 'app/components/HomeListItem';
import { LearnCharsType, LoggedInTabNavigatorParams } from 'app/navigation/types';
import { AppTheme } from 'app/models/theme';
import useHomeListProgressItems from 'app/hooks/useHomeListProgressItems';
import { OtherStaticTypes } from 'app/realm/modals/otherStatics';
import useHomeListItems from 'app/hooks/useHomeListItems';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'DashboardTab'>;

const DashboardTab = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme<AppTheme>();
  const groupedEntries = useHomeListItems();
  const groupedEntriesProgress = useHomeListProgressItems();
  const { t } = useTranslation();

  //States
  const cardTapped = useCallback(
    (item: IHomeListItem, index: number, sectionIndex: number) => {
      if (sectionIndex === 0 && index === 0) {
        navigation.push('GujaratiScriptIntro', {
          content: t('homeScreen.listItemsSection1.itemDesc1'),
          title: t('learnIntroScreen.header.title'),
          type: OtherStaticTypes.OverViewIntro,
          color: item.color,
        });
      } else if (sectionIndex === 0 && index === 1) {
        navigation.push('GujaratiScriptIntro', {
          content: t('homeScreen.listItemsSection1.itemDesc2'),
          title: t('learnIntroScreen.header.title'),
          type: OtherStaticTypes.CulturalIntro,
          color: item.color,
        });
      } else if (sectionIndex === 1 && index === 0) {
        navigation.push('LearnCharsList', { type: LearnCharsType.Vowel, color: item.color });
      } else if (sectionIndex === 1 && index === 1) {
        navigation.push('LearnCharsList', { type: LearnCharsType.Constant, color: item.color });
      } else if (sectionIndex === 1 && index === 2) {
        navigation.push('LearnCharsList', { type: LearnCharsType.Barakhadi, color: item.color });
      } else if (sectionIndex === 2 && index === 0) {
        navigation.push('LearnCharsList', { type: LearnCharsType.Number, color: item.color });
      }
    },
    [navigation, t],
  );

  const renderItem = ({
    item,
    index,
    sectionIndex,
    progress,
  }: {
    item: IHomeListItem;
    index: number;
    sectionIndex: number;
    progress: number;
  }) => {
    return (
      <Components.HomeListItem
        key={item.id}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
        progress={progress}
      />
    );
  };

  return (
    <Components.AppBaseView
      edges={['left', 'right', 'top']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <Components.AppBaseView edges={[]} scroll={true} style={styles.carouselContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerDetailContainer}>
            <Text style={[styles.headerDetailText, { color: colors.text }]}>
              {t('homeScreen.header.title', { name: 'Tejas' })}
            </Text>
            <Text style={[styles.headerSubDetailText, { color: colors.textTitle }]}>
              {t('homeScreen.header.subTitle')}
            </Text>
          </View>
          <View style={[styles.avatar]}>
            <Image
              style={[styles.avatar, { backgroundColor: `${colors.primary}80` }]}
              resizeMode={'contain'}
              borderRadius={25}
              source={Config.Images.icons.avatar}
            />
          </View>
        </View>

        <View style={styles.listContainer}>
          {groupedEntries.map((section, sectionIndex) => {
            const progressSection = groupedEntriesProgress[sectionIndex];
            return (
              <View style={styles.section} key={sectionIndex.toString()}>
                <Text style={[styles.sectionHeader, { color: colors.text }]}>{t(section.title)}</Text>
                <View style={styles.sectionItems}>
                  {section.data.map((item, index) => {
                    const progress = progressSection.data[index];
                    return renderItem({ item, index, sectionIndex, progress });
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </Components.AppBaseView>
    </Components.AppBaseView>
  );
};

export default DashboardTab;
