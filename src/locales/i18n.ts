import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUS from './en-US.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enUS
      }
    },
    lng: 'en-US',
    fallbackLng: 'en-US',

    interpolation: {
      escapeValue: false
    }
  })
