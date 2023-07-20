import React, { useEffect } from 'react';

import { useLocale } from 'src/app/translations/hooks/useLocale';
import { AppRouter } from 'src/app/routing/components/Routes';
import useAuthData from './app/hooks/useAuthData';

export const App = () => {
  const { t, locale } = useLocale();

  useEffect(() => {
    document.title = t('BASE.CORE.PAGE_TITLE');
  }, [locale]);
  useAuthData();

  return <AppRouter />;
};
