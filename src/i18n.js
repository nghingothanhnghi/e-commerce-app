// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from './locales/en/translation.json';
import vnTranslation from './locales/vn/translation.json';

const userLanguage = localStorage.getItem('selectedLanguage') || navigator.language.split('-')[0];

const resources = {
  en: {
    translation: enTranslation,
  },
  vn: {
    translation: vnTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage, // Set the language based on user preference or fallback to browser language
    fallbackLng: 'vn',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;