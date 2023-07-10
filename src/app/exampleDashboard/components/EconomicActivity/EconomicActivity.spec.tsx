import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { createTestWrapper } from '@takamol/react-qiwa-core';

import { EconomicActivity } from '.';

describe('EconomicActivity', () => {
  it('should fetch and display crucial informations about the economic activity of the company', async () => {
    createTestWrapper({ children: <EconomicActivity /> });

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    const economicActivityOfCompany = screen.getByText(/Manufacturing/i);
    const uidOfCompany = screen.getByText(/23040123/i);

    expect(economicActivityOfCompany).toBeInTheDocument();
    expect(uidOfCompany).toBeInTheDocument();
  });
});
