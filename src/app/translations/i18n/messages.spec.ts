/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Language } from '@takamol/react-qiwa-core';

import { Messages, messages, keysToValues } from './messages';
import enMessages from './locale/en.json';
import arMessages from './locale/ar.json';

describe('Messages', () => {
  it('should return keysToValues function', () => {
    const enKeys = Object.keys(enMessages);
    const arKeys = Object.keys(arMessages);

    const enResult = keysToValues(enMessages);
    expect(enResult).toEqual(
      expect.objectContaining(
        enKeys.reduce((acc, key) => {
          //@ts-ignore
          acc[key] = key;
          return acc;
        }, {}),
      ),
    );

    const arResult = keysToValues(arMessages);
    expect(arResult).toEqual(
      expect.objectContaining(
        arKeys.reduce((acc, key) => {
          //@ts-ignore
          acc[key] = key;
          return acc;
        }, {}),
      ),
    );
  });

  it('should return messages object', () => {
    const languages = Object.keys(messages) as Language[];
    const messageKeys = Object.keys(Messages);

    languages.forEach((lang) => {
      const langMessages = messages[lang];

      expect(Object.keys(langMessages)).toEqual(expect.arrayContaining(messageKeys));

      messageKeys.forEach((key) => {
        expect(typeof langMessages[key as keyof typeof Messages]).toBe('string');
      });
    });
  });
});
