import { snakeCase } from 'snake-case';

import type {
  GenericTranslation,
  LocaleWithCamelizedPrefix,
  LocaleWithLangPrefix,
  LocaleWithName,
  TranslationObject,
} from '../models/Locale';

export const DEFAULT_VALUE = '-';

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformToTranslationObject = (translation: GenericTranslation): TranslationObject => {
  return Object.keys(translation).reduce((item, key: string) => {
    const formattedKey = snakeCase(key);
    if (formattedKey.toLowerCase().includes('en')) {
      return { ...item, en: translation[key] };
    } else if (formattedKey.toLowerCase().includes('ar')) {
      return { ...item, ar: translation[key] };
    }
    return item;
  }, {});
};

const capitalizeLocale = (locale: 'ar' | 'en') => capitalize(locale) as 'Ar' | 'En';

const isLocaleWithName = (localeObject: unknown): localeObject is LocaleWithName => {
  return typeof localeObject === 'object' && localeObject !== null && 'name' in localeObject && 'name' in localeObject;
};

const isLocaleWithLangPrefix = (localeObject: unknown): localeObject is LocaleWithLangPrefix => {
  return typeof localeObject === 'object' && localeObject !== null && ('ar' in localeObject || 'en' in localeObject);
};

const isLocaleWithCamelizedPrefix = (localeObject: unknown): localeObject is LocaleWithCamelizedPrefix => {
  return (
    typeof localeObject === 'object' && localeObject !== null && ('nameAr' in localeObject || 'nameEn' in localeObject)
  );
};

const isGenericTranslation = (localeObject: unknown): localeObject is GenericTranslation => {
  return typeof localeObject === 'object' && localeObject !== null;
};

export const getLocaleName = (value: unknown, locale: 'ar' | 'en', defaultValue = DEFAULT_VALUE): string => {
  if (!value) {
    return defaultValue;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (isLocaleWithName(value)) {
    return value?.name?.[locale] || value?.name?.['ar'] || defaultValue;
  }

  if (isLocaleWithLangPrefix(value)) {
    return value[locale] || value?.['ar'] || defaultValue;
  }

  const objectHasBothLangEntries = typeof value === 'object' ? Object.keys(value).length >= 2 : false;
  if (objectHasBothLangEntries && isGenericTranslation(value)) {
    const translationObject = transformToTranslationObject(value);

    return translationObject[locale] || defaultValue;
  }

  if (isLocaleWithCamelizedPrefix(value)) {
    return value[`name${capitalizeLocale(locale)}`] || value?.nameAr || defaultValue;
  }

  return defaultValue;
};
