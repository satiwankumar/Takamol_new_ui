import { renderHook } from '@testing-library/react';
import { TestAppProviders } from '@takamol/react-qiwa-core';

import { useCreateNonSaudiList } from '../useCreateNonSaudiList';
import { nonSaudiEmployeesMock } from '../../constants/nonSaudiEmployeesMock';

describe('useCreateNonSaudiList - for formatting the list of non-saudi employees company can hire', () => {
  it('should return empty list if data from api is not provided', async () => {
    const { result } = renderHook(() => useCreateNonSaudiList(undefined), { wrapper: TestAppProviders });

    expect(result.current.list).toEqual([]);
  });

  it('should return list when proper api response is provided', async () => {
    const { result } = renderHook(() => useCreateNonSaudiList(nonSaudiEmployeesMock), { wrapper: TestAppProviders });

    expect(result.current.list).toEqual([
      {
        description: 'EXAMPLE_DASHBOARD.LONG_TERM_EMPLOYEES.DESECRIPTION',
        id: 1,
        linkName: 'EXAMPLE_DASHBOARD.LONG_TERM_EMPLOYEES.INFO',
        numberOfEmployees: 24,
        title: 'EXAMPLE_DASHBOARD.LONG_TERM_EMPLOYEES',
      },
      {
        description: 'EXAMPLE_DASHBOARD.TEMPORARY_EMPLOYEES.DESECRIPTION',
        id: 2,
        linkName: 'EXAMPLE_DASHBOARD.TEMPORARY_EMPLOYEES.INFO',
        numberOfEmployees: 48,
        title: 'EXAMPLE_DASHBOARD.TEMPORARY_EMPLOYEES',
      },
      {
        description: 'EXAMPLE_DASHBOARD.SEASONAL_EMPLOYEES.DESECRIPTION',
        id: 3,
        linkName: 'EXAMPLE_DASHBOARD.SEASONAL_EMPLOYEE.INFO',
        numberOfEmployees: 13,
        title: 'EXAMPLE_DASHBOARD.SEASONAL_EMPLOYEES',
      },
    ]);
  });
});
