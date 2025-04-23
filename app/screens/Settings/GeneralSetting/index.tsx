import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';
import { Divider, List, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//App modules
import styles from './styles';

//App Modules
import { ISettingItem, ISettingSection } from 'app/models/viewModels/settingItem';
import Components from 'app/components';
import useCardStatics from 'app/realm/crud/cardStatics';
import useChartStatics from 'app/realm/crud/chartStatics';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import useOtherStatics from 'app/realm/crud/otherStatics';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import AppHeader from 'app/components/AppHeader';
import CommonIcon from 'app/components/CommonIcon';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'GeneralSetting'>;

const GeneralSetting = ({ navigation }: Props) => {
  //Refs

  //Constants
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { clearAllData: clearAllCardData } = useCardStatics();
  const { clearAllData: clearAllChartData } = useChartStatics();
  const { clearAllData: clearAllOtherData } = useOtherStatics();
  const largeScreenMode = useLargeScreenMode();

  //States
  const [clearProgressAlertVisible, setClearProgressAlertVisible] = useState(false);

  const apps: ISettingSection[] = useMemo(
    () => [
      {
        id: 0,
        title: t('generalSetting.section1.header'),
        items: [
          {
            id: 0,
            iconName: 'gesture-swipe',
            iconType: 'material',
            title: t('generalSetting.section1.row1.title'),
            description: t('generalSetting.section1.row1.subTitle'),
            route: 'CardAnimation',
          },
          {
            id: 1,
            iconName: 'format-font',
            iconType: 'material-community',
            title: t('generalSetting.section1.row2.title'),
            description: t('generalSetting.section1.row2.subTitle'),
            route: 'SelectGujaratiFonts',
          },
        ],
      },
      {
        id: 1,
        title: t('generalSetting.section2.header'),
        items: [
          {
            id: 0,
            iconName: 'backup-restore',
            iconType: 'material',
            title: t('generalSetting.section2.row1.title'),
            description: t('generalSetting.section2.row1.subTitle'),
            route: 'SelectAppearance',
          },
        ],
      },
    ],
    [t],
  );

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onPressAppearanceOption = useCallback(
    (item: ISettingSection, index: number, subItem: ISettingItem, subIndex: number) => {
      switch (true) {
        case index === 0 && subIndex === 0:
          navigation.navigate('SwipeCardSetting', {});
          break;
        case index === 0 && subIndex === 1:
          navigation.navigate('SelectGujaratiFonts', {});
          break;
        case index === 1 && subIndex === 0:
          setClearProgressAlertVisible(true);
          break;
        default:
      }
    },
    [navigation],
  );

  const onClearAllData = useCallback(() => {
    setClearProgressAlertVisible(false);
    clearAllCardData();
    clearAllChartData();
    clearAllOtherData();
  }, [clearAllCardData, clearAllChartData, clearAllOtherData]);

  return (
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('generalSetting.title')}
        style={{ backgroundColor: colors.background }}
      />

      <Components.AppBaseView edges={[]} scroll={true} style={styles.safeArea}>
        <View style={[styles.listContainer, largeScreenMode && styles.cardTablet]}>
          {apps.map((item, index) => {
            return (
              <View key={item.id.toString()}>
                <List.Subheader style={[styles.listSubHeader, { color: colors.primary }]}>{item.title}</List.Subheader>
                {item.items.map((subItem, subIndex) => {
                  return (
                    <List.Item
                      key={subItem.id.toString()}
                      style={styles.itemContainer}
                      titleStyle={{ color: colors.onSurface }}
                      descriptionStyle={[{ color: `${colors.onSurface}88` }, styles.topMargin]}
                      onPress={() => onPressAppearanceOption(item, index, subItem, subIndex)}
                      title={subItem.title}
                      description={subItem.description}
                      left={() => (
                        <CommonIcon
                          style={styles.listItemIcon}
                          type={subItem.iconType}
                          name={subItem.iconName}
                          color={`${colors.onSurface}88`}
                          size={24}
                        />
                      )}
                    />
                  );
                })}
                <Divider />
              </View>
            );
          })}
        </View>
      </Components.AppBaseView>
      <Components.AppActionDialog
        title={t('generalSetting.section2.row1.dialogTitle')}
        description={t('generalSetting.section2.row1.dialogSubTitle')}
        visible={clearProgressAlertVisible}
        cancelText={t('general.cancel')}
        confirmText={t('general.ok')}
        onPressConfirm={onClearAllData}
        onPressCancel={() => setClearProgressAlertVisible(false)}
      />
    </Components.AppBaseView>
  );
};

export default GeneralSetting;
