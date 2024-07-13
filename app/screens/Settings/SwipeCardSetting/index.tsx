import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

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
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import AppHeader from 'app/components/AppHeader';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'SwipeCardSetting'>;

const SwipeCardSetting = ({ navigation }: Props) => {
  //Refs

  //Constants
  const { t } = useTranslation();
  const { colors } = useTheme();
  const largeScreenMode = useLargeScreenMode();
  const cardAutoSwipeDuration = useCardAnimationConfigStore(store => store.cardAutoSwipeDuration);
  const setCardAutoSwipeDuration = useCardAnimationConfigStore(store => store.setCardAutoSwipeDuration);

  //States
  const [autoSwipeCardModeAlertVisible, setAutoSwipeCardModeAlertVisible] = useState(false);

  const apps: ISettingSection[] = useMemo(
    () => [
      {
        id: 0,
        title: t('swipeCardSetting.section1.header'),
        items: [
          {
            id: 0,
            iconName: 'animation-play',
            iconType: 'material-community',
            title: t('swipeCardSetting.section1.row1.title'),
            description: t('swipeCardSetting.section1.row1.subTitle'),
            route: 'CardAnimation',
          },
          {
            id: 1,
            iconName: 'gesture-swipe',
            iconType: 'material-community',
            title: t('swipeCardSetting.section1.row2.title'),
            description: t('swipeCardSetting.section1.row2.subTitle'),
            route: 'CardAnimation',
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
          navigation.navigate('CardAnimation', {});
          break;
        case index === 0 && subIndex === 1:
          setAutoSwipeCardModeAlertVisible(true);
          break;
        default:
      }
    },
    [navigation],
  );

  const onPressConfirmCardAutoSwipeDuration = useCallback(
    (value: number) => {
      setCardAutoSwipeDuration(value * 1000);
      setAutoSwipeCardModeAlertVisible(false);
    },
    [setCardAutoSwipeDuration],
  );

  return (
    <Components.AppBaseView edges={[]} style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('swipeCardSetting.title')}
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
      </Components.AppBaseView>
      <Components.AppSliderDialog
        title={t('swipeCardSetting.section1.row2.cardAutoSwipeDurationAlert.title')}
        description={t('swipeCardSetting.section1.row2.cardAutoSwipeDurationAlert.desc')}
        visible={autoSwipeCardModeAlertVisible}
        cancelText={t('general.cancel')}
        confirmText={t('general.ok')}
        onPressConfirm={onPressConfirmCardAutoSwipeDuration}
        onPressCancel={() => setAutoSwipeCardModeAlertVisible(false)}
        range={[1, 10]}
        step={1}
        unit={t('swipeCardSetting.section1.row2.cardAutoSwipeDurationAlert.unit')}
        value={cardAutoSwipeDuration / 1000}
      />
    </Components.AppBaseView>
  );
};

export default SwipeCardSetting;
