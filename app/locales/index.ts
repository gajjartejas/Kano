import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// tips: export each translation to a seperate file
const resources = {
  en: {
    translation: require('./en.json'),
  },
  ru: {
    translation: require('./gu.json'),
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode,
    fallbackLng: 'en',
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
