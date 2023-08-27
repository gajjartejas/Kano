import React, { useCallback } from 'react';
import { Image, Linking, Platform, ScrollView, View } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';
import { Divider, List, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IconType } from 'react-native-easy-icon/src/Icon';
import DeviceInfo, { isTablet } from 'react-native-device-info';
import Icon from 'react-native-easy-icon';

//App Modules
import Utils from 'app/utils';

//App modules
import Config from 'app/config';
import Components from 'app/components';
import styles from './styles';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import { AppTheme } from 'app/models/theme';

//Interfaces
interface IMoreItem {
  id: number;
  iconName: string;
  iconType: IconType;
  title: string;
}

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'MoreTab'>;

const MoreTab = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  //State
  const [visible, setVisible] = React.useState(false);
  const [aboutItems] = React.useState<IMoreItem[]>([
    {
      id: 0,
      iconName: 'feedback',
      iconType: 'material',
      title: t('about.sendFeedback'),
    },
    {
      id: 1,
      iconName: 'star',
      iconType: 'font-awesome',
      title: t('about.rateApp'),
    },
    {
      id: 2,
      iconName: 'apps',
      iconType: 'material-community',
      title: t('about.moreApps'),
    },
    {
      id: 3,
      iconName: 'github',
      iconType: 'entypo',
      title: t('about.github'),
    },
    {
      id: 4,
      iconName: 'gear',
      iconType: 'font-awesome',
      title: t('about.setting'),
    },
    {
      id: 5,
      iconName: 'info-circle',
      iconType: 'font-awesome',
      title: t('about.app'),
    },
  ]);

  const onPressShowDialog = useCallback(() => setVisible(true), []);
  const onPressHideDialog = useCallback(() => setVisible(false), []);

  const onPressRateApp = useCallback(async () => {
    await Utils.openInAppBrowser(
      Platform.OS === 'android' ? Config.Constants.PLAY_STORE_URL : Config.Constants.APP_STORE_URL,
    );
  }, []);

  const onPressMoreApps = useCallback(() => {
    navigation.push('MoreApps', {});
  }, [navigation]);

  const onPressContribute = useCallback(async () => {
    await Utils.openInAppBrowser(Config.Constants.REPO_URL);
  }, []);

  const onPressSettings = useCallback(() => {
    navigation.push('Settings', {});
  }, [navigation]);

  const onPressAbout = useCallback(() => {
    navigation.push('About', {});
  }, [navigation]);

  const onPress = useCallback(
    (item: IMoreItem, _index: number) => {
      switch (item.id) {
        case 0:
          onPressShowDialog();
          break;
        case 1:
          onPressRateApp();
          break;
        case 2:
          onPressMoreApps();
          break;
        case 3:
          onPressContribute();
          break;
        case 4:
          onPressSettings();
          break;
        case 5:
          onPressAbout();
          break;
      }
    },
    [onPressAbout, onPressContribute, onPressMoreApps, onPressRateApp, onPressSettings, onPressShowDialog],
  );

  const onPressTelegram = useCallback(async () => {
    await Utils.openInAppBrowser(Config.Constants.ABOUT_TELEGRAM_LINK);
  }, []);

  const onPressEmail = useCallback(async () => {
    const email = Config.Constants.ABOUT_SUPPORT_EMAIL;
    const subject = `${t('general.appname')} feedback`;
    const osType = Platform.OS;
    const systemVersion = DeviceInfo.getSystemVersion();
    const brand = DeviceInfo.getBrand();
    const model = DeviceInfo.getModel();
    const readableVersion = DeviceInfo.getReadableVersion();
    const body = `OS: ${osType} (${systemVersion})\nBrand: ${brand} (${model})\nApp Version: ${readableVersion}`;
    await Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  }, [t]);

  return (
    <Components.AppBaseView
      edges={['bottom', 'left', 'right', 'top']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subView}>
          <View style={[styles.imageBackground, isTablet() && styles.cardTablet]}>
            <Image resizeMode={'cover'} style={[styles.imageBackgroundCover]} source={Config.Images.icons.about_bg} />
            <View style={[styles.imageBackgroundCover, { backgroundColor: `${colors.background}88` }]} />
            <Image source={Config.Images.icons.app_icon} resizeMode="contain" style={styles.appIcon} />
            <Text style={[styles.appNameText, { color: colors.text }]}>{t('general.appname')}</Text>
            <Text style={[styles.appVersion, { color: colors.text }]}>v{DeviceInfo.getVersion()}</Text>
          </View>

          <View style={[styles.cardContainer, isTablet() && styles.cardTablet]}>
            {aboutItems.map((subItem, subIndex) => {
              return (
                <View key={subItem.id.toString()}>
                  <List.Item
                    style={styles.listItem}
                    titleStyle={{ color: colors.onSurface }}
                    key={subItem.id.toString()}
                    onPress={() => onPress(subItem, subIndex)}
                    title={subItem.title}
                    left={() => (
                      <Icon
                        style={styles.listIcon}
                        type={subItem.iconType}
                        name={subItem.iconName}
                        color={`${colors.onSurface}88`}
                        size={24}
                      />
                    )}
                  />
                  <Divider style={[styles.divider, { backgroundColor: colors.backdrop }]} />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Components.AboutFeedbackDialog
        visible={visible}
        onPressTelegram={onPressTelegram}
        onPressEmail={onPressEmail}
        onPressHideDialog={onPressHideDialog}
      />
    </Components.AppBaseView>
  );
};

export default MoreTab;
