import { renderHook } from '@testing-library/react';
import { TestAppProviders } from '@takamol/react-qiwa-core';

import { useLocale } from '../useLocale';

jest.unmock('src/app/translations/hooks/useLocale');

describe('useLocale - strongly typed wrapper for core library locale hook', () => {
  it('should have the same default language', () => {
    const { result } = renderHook(() => useLocale(), { wrapper: TestAppProviders });

    expect(result.current.locale).toEqual('ar');
  });
});
