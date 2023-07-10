import * as React from 'react';
import { createTestWrapper } from '@takamol/react-qiwa-core';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';

import { AppRouter } from '.';

describe('Routes', () => {
  it('should display the skeleton if the auth api is loading', async () => {
    createTestWrapper({
      children: <AppRouter />,
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  });
});
