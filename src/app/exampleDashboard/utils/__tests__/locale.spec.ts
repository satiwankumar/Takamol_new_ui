import { getLocaleName, transformToTranslationObject, capitalize } from '../locale';

describe('capitalize', () => {
  it('sohuld capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });
});

describe('transformToTranslationObject', () => {
  it('should transform a generic translation object to a translation object', () => {
    const genericTranslation = {
      en_text: 'English Text',
      ar_text: 'Arabic Text',
      other_key: 'Other Value',
    };
    const expectedTranslationObject = {
      en: 'English Text',
      ar: 'Arabic Text',
    };

    expect(transformToTranslationObject(genericTranslation)).toEqual(expectedTranslationObject);
  });
});

describe('getLocaleName', () => {
  const defaultValue = '-';

  it('should return the default value if the value is falsy', () => {
    expect(getLocaleName(null, 'en', defaultValue)).toBe(defaultValue);
    expect(getLocaleName(undefined, 'en', defaultValue)).toBe(defaultValue);
    expect(getLocaleName('', 'en', defaultValue)).toBe(defaultValue);
  });

  it('should return the value as is if it is a string', () => {
    expect(getLocaleName('Hello', 'en', defaultValue)).toBe('Hello');
    expect(getLocaleName('مرحباً', 'ar', defaultValue)).toBe('مرحباً');
  });

  it('should return the localized name from a locale with name property', () => {
    const localeWithName = {
      name: {
        en: 'English Name',
        ar: 'Arabic Name',
      },
    };

    expect(getLocaleName(localeWithName, 'en', defaultValue)).toBe('English Name');
    expect(getLocaleName(localeWithName, 'ar', defaultValue)).toBe('Arabic Name');
  });

  it('should return the localized name from a locale with lang prefix', () => {
    const localeWithLangPrefix = {
      en: 'English Value',
      ar: 'Arabic Value',
    };

    expect(getLocaleName(localeWithLangPrefix, 'en', defaultValue)).toBe('English Value');
    expect(getLocaleName(localeWithLangPrefix, 'ar', defaultValue)).toBe('Arabic Value');
  });

  it('should return the localized name from a generic translation object', () => {
    const genericTranslation = {
      en_text: 'English Text',
      ar_text: 'Arabic Text',
    };

    expect(getLocaleName(genericTranslation, 'en', defaultValue)).toBe('English Text');
    expect(getLocaleName(genericTranslation, 'ar', defaultValue)).toBe('Arabic Text');
  });

  it('should return the localized name from a locale with camelized prefix', () => {
    const localeWithCamelizedPrefix = {
      nameEn: 'English Name',
      nameAr: 'Arabic Name',
    };

    expect(getLocaleName(localeWithCamelizedPrefix, 'en', defaultValue)).toBe('English Name');
    expect(getLocaleName(localeWithCamelizedPrefix, 'ar', defaultValue)).toBe('Arabic Name');
  });
});
