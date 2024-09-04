import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import Config from 'app/config';

export const SUPPORTED_LANGUAGES = [
  { id: 0, selected: false, code: 'en', icon: Config.Images.icons.flag_en, translators: [], language: 'English' },
  {
    id: 1,
    selected: false,
    code: 'gu',
    icon: Config.Images.icons.flag_hi,
    translators: [],
    language: 'ગુજરાતી(Gujarati)',
  },
];

const resources = {
  en: {
    translation: require('./en.json'),
  },
  gu: {
    translation: require('./gu.json'),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: RNLocalize.getLocales()[0].languageCode,
  fallbackLng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
