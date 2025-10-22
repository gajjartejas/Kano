import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Divider, List, useTheme } from 'react-native-paper';

//App modules
import Config from 'app/config';
import Utils from 'app/utils';
import styles from './styles';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import CommonIcon from 'app/components/CommonIcon';

//Modals
import { ISettingItem, ISettingSection } from 'app/models/viewModels/settingItem';
import Components from 'app/components';
import AppHeader from 'app/components/AppHeader';
import useAppLangConfigStore from 'app/store/appLangConfig';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'Settings'>;

const Settings = ({ navigation }: Props) => {
  //Constants
  const { t } = useTranslation();
  const { colors } = useTheme();
  const largeScreenMode = useLargeScreenMode();
  const selectedLanguageName = useAppLangConfigStore(store => store.selectedLanguageName);

  //States
  const apps: ISettingSection[] = useMemo(
    () => [
      {
        id: 0,
        title: t('settings.commonHeader'),
        items: [
          {
            id: 0,
            iconName: 'translate',
            iconType: 'material',
            title: t('settings.languageTitle'),
            description: t('settings.languageSubTitle', {
              id10001: selectedLanguageName,
            })!,
            route: 'ChangeLanguage',
          },
          {
            id: 1,
            iconName: 'theme-light-dark',
            iconType: 'material',
            title: t('settings.appearanceTitle'),
            description: t('settings.appearanceSubTitle')!,
            route: 'SelectAppearance',
          },
          {
            id: 2,
            iconName: 'tune',
            iconType: 'material',
            title: t('settings.generalTitle'),
            description: t('settings.generalSubTitle'),
            route: 'GeneralSetting',
          },
        ],
      },
      {
        id: 1,
        title: t('settings.infoHeader'),
        items: [
          {
            id: 0,
            iconName: 'file-document-outline',
            iconType: 'material',
            title: t('settings.changelogTitle'),
            description: t('settings.changelogSubTitle')!,
            route: 'Changelog',
          },
          {
            id: 1,
            iconName: 'book-open',
            iconType: 'material',
            title: t('settings.librariesTitle'),
            description: t('settings.librariesSubTitle')!,
            route: 'License',
          },
          {
            id: 2,
            iconName: 'help-circle-outline',
            iconType: 'material',
            title: t('settings.faqTitle'),
            description: t('settings.faqSubTitle')!,
            route: 'FAQ',
          },
          {
            id: 3,
            iconName: 'earth',
            iconType: 'material',
            title: t('settings.translateTitle'),
            description: t('settings.translateSubTitle')!,
            route: 'Translate',
          },
          {
            id: 4,
            iconName: 'account-multiple-outline',
            iconType: 'material',
            title: t('settings.translatorsTitle'),
            description: t('settings.translatorsSubTitle')!,
            route: 'Translators',
          },
          {
            id: 5,
            iconName: 'shield-check',
            iconType: 'material',
            title: t('settings.privacyTitle'),
            description: t('settings.privacySubTitle')!,
            route: 'PrivacyPolicy',
          },
        ],
      },
    ],
    [selectedLanguageName, t],
  );

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onPress = useCallback(
    async (item: ISettingItem, _index: number) => {
      switch (item.route) {
        case 'Changelog':
          await Utils.openInAppBrowser(Config.Constants.CHANGE_LOG);
          break;

        case 'Translate':
          await Utils.openInAppBrowser(Config.Constants.TRANSLATE_APP);
          break;

        case 'FAQ':
          await Utils.openInAppBrowser(Config.Constants.FAQ);
          break;

        case 'PrivacyPolicy':
          await Utils.openInAppBrowser(Config.Constants.PRIVACY_POLICY);
          break;

        default:
          // @ts-ignore
          navigation.push(item.route, {});
      }
    },
    [navigation],
  );

  return (
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('settings.title')}
        style={{ backgroundColor: colors.background }}
      />

      <Components.AppBaseView edges={[]} scroll={true} style={styles.safeArea}>
        <View style={[styles.listContainer, largeScreenMode && styles.cardTablet]}>
          {apps.map(item => {
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
                      onPress={() => onPress(subItem, subIndex)}
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
    </Components.AppBaseView>
  );
};

export default Settings;
