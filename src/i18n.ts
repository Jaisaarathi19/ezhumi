import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import taCommon from './locales/ta/common.json';
import hiCommon from './locales/hi/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  ta: {
    common: taCommon,
  },
  hi: {
    common: hiCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    // Configure language detection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Use common namespace as default
    defaultNS: 'common',
    ns: ['common'],
  });

export default i18n;
