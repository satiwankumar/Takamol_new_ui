import { useCoreLocale } from '@takamol/react-qiwa-core';

import { TranslationKey } from '../models/TranslationKey';

export const useLocale = () => {
  return useCoreLocale<TranslationKey>();
};
