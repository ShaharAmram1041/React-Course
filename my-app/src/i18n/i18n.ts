import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './locale';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'he', 'he-IL'],
    ns: ['common', 'products'],         
    defaultNS: 'common',
    debug: true,

    interpolation: {
      escapeValue: false
    },

    resources
  });
  
export default i18n;
