import i18n from 'i18next'
import translationEn from './locale/en.json'
import config from 'config'

export const DEAFULT_LOCALE = 'en'

const resources = {
  en: {
    translation: translationEn
  }
}

i18n.init({
  lng: DEAFULT_LOCALE,
  fallbackLng: DEAFULT_LOCALE,
  debug: config.APP_ENV === 'local',
  interpolation: {
    escapeValue: false
  },
  resources
})

export default function $t(key: string, params = {}): string {
  return i18n.t(key, params)
}
