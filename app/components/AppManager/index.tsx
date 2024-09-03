import React, { memo, ReactElement, useEffect } from 'react';
import { Appearance, View } from 'react-native';

//App Modules
import styles from './styles';
import AppearancePreferences = Appearance.AppearancePreferences;
import useThemeConfigStore, { IAppearanceType } from 'app/store/themeConfig';
import i18n from 'app/locales';
import useAppLangConfigStore from 'app/store/appLangConfig';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';

//Interface
export type Props = {
  children: ReactElement[] | ReactElement;
};

const AppManager = ({ children }: Props) => {
  const setIsDarkMode = useThemeConfigStore(store => store.setIsDarkMode);
  const appearance = useThemeConfigStore(store => store.appearance);
  const isDark = useThemeConfigStore(store => store.isDark);
  const selectedLanguageCode = useAppLangConfigStore(store => store.selectedLanguageCode);
  const setThemeCardAnimationConfig = useCardAnimationConfigStore(store => store.setTheme);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguageCode).then(() => {});
  }, [selectedLanguageCode]);

  useEffect(() => {
    const onThemeChange = (preferences: AppearancePreferences) => {
      if (appearance === IAppearanceType.Auto) {
        setIsDarkMode(preferences.colorScheme === 'dark');
      }
    };
    const listener = Appearance.addChangeListener(onThemeChange);
    return () => listener.remove();
  }, [appearance, setIsDarkMode, setThemeCardAnimationConfig]);

  useEffect(() => {
    setThemeCardAnimationConfig(isDark);
  }, [isDark, setThemeCardAnimationConfig]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default memo(AppManager);
