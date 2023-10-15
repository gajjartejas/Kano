import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';
import { Divider, List, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-easy-icon';

//App modules
import styles from './styles';

//ThirdParty

//App Modules
import { ISettingItem, ISettingSection } from 'app/models/viewModels/settingItem';
import Components from 'app/components';
import useCardStatics from 'app/realm/crud/cardStatics';
import useChartStatics from 'app/realm/crud/chartStatics';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import useOtherStatics from 'app/realm/crud/otherStatics';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import AppHeader from 'app/components/AppHeader';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';

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
  const cardAutoSwipeDurationSeconds = useCardAnimationConfigStore(store => store.cardAutoSwipeDurationSeconds);
  const setCardAutoSwipeDurationSeconds = useCardAnimationConfigStore(store => store.setCardAutoSwipeDurationSeconds);

  //States
  const [clearProgressAlertVisible, setClearProgressAlertVisible] = useState(false);
  const [autoSwipeCardModeAlertVisible, setAutoSwipeCardModeAlertVisible] = useState(false);

  const [apps] = useState<ISettingSection[]>([
    {
      id: 0,
      title: t('generalSetting.section1.header'),
      items: [
        {
          id: 0,
          iconName: 'animation-play',
          iconType: 'material-community',
          title: t('generalSetting.section1.row1.title'),
          description: t('generalSetting.section1.row1.subTitle'),
          route: 'CardAnimation',
        },
        {
          id: 1,
          iconName: 'gesture-swipe',
          iconType: 'material-community',
          title: t('generalSetting.section1.row2.title'),
          description: t('generalSetting.section1.row2.subTitle'),
          route: 'CardAnimation',
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
          iconType: 'material-community',
          title: t('generalSetting.section2.row1.title'),
          description: t('generalSetting.section2.row1.subTitle'),
          route: 'SelectAppearance',
        },
      ],
    },
  ]);

  const onGoBack = () => {
    navigation.pop();
  };

  const onPressAppearanceOption = (item: ISettingSection, index: number, subItem: ISettingItem, subIndex: number) => {
    switch (true) {
      case index === 0 && subIndex === 0:
        navigation.navigate('CardAnimation', {});
        break;
      case index === 0 && subIndex === 1:
        setAutoSwipeCardModeAlertVisible(true);
        break;
      case index === 1 && subIndex === 0:
        setClearProgressAlertVisible(true);
        break;
      default:
    }
  };

  const onClearAllData = () => {
    setClearProgressAlertVisible(false);
    clearAllCardData();
    clearAllChartData();
    clearAllOtherData();
  };

  const onPressConfirmCardAutoSwipeDuration = (value: number) => {
    setCardAutoSwipeDurationSeconds(value);
    setAutoSwipeCardModeAlertVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('generalSetting.title')}
        style={{ backgroundColor: colors.background }}
      />

      <View style={styles.safeArea}>
        <ScrollView>
          <View style={[styles.listContainer, largeScreenMode && styles.cardTablet]}>
            {apps.map((item, index) => {
              return (
                <View key={item.id.toString()}>
                  <List.Subheader style={[styles.listSubHeader, { color: colors.primary }]}>
                    {item.title}
                  </List.Subheader>
                  {item.items.map((subItem, subIndex) => {
                    return (
                      <List.Item
                        key={subItem.id.toString()}
                        titleStyle={{ color: colors.onSurface }}
                        descriptionStyle={{ color: `${colors.onSurface}88` }}
                        onPress={() => onPressAppearanceOption(item, index, subItem, subIndex)}
                        title={subItem.title}
                        description={subItem.description}
                        left={() => (
                          <Icon
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
        </ScrollView>
      </View>
      <Components.AppActionDialog
        title={t('generalSetting.section2.row1.dialogTitle')}
        description={t('generalSetting.section2.row1.dialogSubTitle')}
        visible={clearProgressAlertVisible}
        cancelText={t('general.cancel')}
        confirmText={t('general.ok')}
        onPressConfirm={onClearAllData}
        onPressCancel={() => setClearProgressAlertVisible(false)}
      />
      <Components.AppSliderDialog
        title={t('generalSetting.section1.row2.cardAutoSwipeDurationAlert.title')}
        description={t('generalSetting.section1.row2.cardAutoSwipeDurationAlert.desc')}
        visible={autoSwipeCardModeAlertVisible}
        cancelText={t('general.cancel')}
        confirmText={t('general.ok')}
        onPressConfirm={onPressConfirmCardAutoSwipeDuration}
        onPressCancel={() => setAutoSwipeCardModeAlertVisible(false)}
        range={[1, 10]}
        step={1}
        unit={t('generalSetting.section1.row2.cardAutoSwipeDurationAlert.unit')}
        value={cardAutoSwipeDurationSeconds}
      />
    </View>
  );
};

export default GeneralSetting;
