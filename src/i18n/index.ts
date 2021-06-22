// @ts-ignore
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

// @ts-ignore
import en from './locale/en';

i18n.fallbacks = true;

i18n.translations = {
  en,
};

i18n.locale = Localization.locale;

export default function $t(key: string, params = {}): string {
  return i18n.t(key, params);
}