import * as React from 'react';

import { NonSaudiEmployees } from '../models/NonSaudiEmployees';
import { useLocale } from 'src/app/translations/hooks/useLocale';

export const useCreateNonSaudiList = (data?: NonSaudiEmployees) => {
  const { t } = useLocale();

  if (!data)
    return {
      list: [],
    };

  return {
    list: [
      {
        id: 1,
        numberOfEmployees: data?.longTerm,
        title: t('EXAMPLE_DASHBOARD.LONG_TERM_EMPLOYEES'),
        description: t('EXAMPLE_DASHBOARD.LONG_TERM_EMPLOYEES.DESECRIPTION'),
        linkName: t('EXAMPLE_DASHBOARD.LONG_TERM_EMPLOYEES.INFO'),
      },
      {
        id: 2,
        numberOfEmployees: data?.temporary,
        title: t('EXAMPLE_DASHBOARD.TEMPORARY_EMPLOYEES'),
        description: t('EXAMPLE_DASHBOARD.TEMPORARY_EMPLOYEES.DESECRIPTION'),
        linkName: t('EXAMPLE_DASHBOARD.TEMPORARY_EMPLOYEES.INFO'),
      },
      {
        id: 3,
        numberOfEmployees: data?.seasonal,
        title: t('EXAMPLE_DASHBOARD.SEASONAL_EMPLOYEES'),
        description: t('EXAMPLE_DASHBOARD.SEASONAL_EMPLOYEES.DESECRIPTION'),
        linkName: t('EXAMPLE_DASHBOARD.SEASONAL_EMPLOYEE.INFO'),
      },
    ],
  };
};
