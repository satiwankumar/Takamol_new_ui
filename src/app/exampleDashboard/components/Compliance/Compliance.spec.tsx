import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { createTestWrapper } from '@takamol/react-qiwa-core';

import { mockServerError } from '../../utils/mockServerError';
import { exampleApiUrl } from '../../constants/exampleApiUrl';

import { Compliance } from '.';

describe('Compliance', () => {
  it('should render score once api is successfully fetched', async () => {
    createTestWrapper({ children: <Compliance /> });

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it.skip('should render error message on api failure', async () => {
    createTestWrapper({ children: <Compliance /> });
    mockServerError({ endpoint: `${exampleApiUrl}/compliance-status`, httpMethod: 'get', statusCode: 500 });

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(screen.getByText(/refetch/i)).toBeInTheDocument();
  });
});
