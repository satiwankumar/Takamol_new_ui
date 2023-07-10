import { Language } from '@takamol/react-qiwa-core';

import enMessages from './locale/en.json';
import arMessages from './locale/ar.json';

type KeyAsValue<T> = { [P in keyof T]: P };

export const keysToValues = <T extends Record<string, string>>(source: T): KeyAsValue<typeof source> => {
  return (Object.keys(source) as Array<keyof T>).reduce((accumulated, current) => {
    accumulated[current] = current;
    return accumulated;
  }, {} as KeyAsValue<typeof source>);
};

export const Messages = {
  ...keysToValues(enMessages),
  ...keysToValues(arMessages),
};

export const messages: Record<Language, Record<keyof typeof Messages, string>> = {
  en: enMessages,
  ar: arMessages,
};
