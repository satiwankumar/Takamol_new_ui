export interface LocaleWithName {
  name: {
    en?: string;
    ar?: string;
  };
}

export interface LocaleWithLangPrefix {
  ar?: string;
  en?: string;
}

export interface LocaleWithCamelizedPrefix {
  nameAr?: string;
  nameEn?: string;
}

export type TranslationObject = Record<string, string>;

export interface GenericTranslation {
  [x: string]: string | number | null | TranslationObject;
}
