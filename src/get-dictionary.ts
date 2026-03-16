import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better type safety and to avoid dynamic imports issues
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.fr()
