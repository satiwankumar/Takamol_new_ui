import * as React from 'react';
import { createTestWrapper } from '@takamol/react-qiwa-core';
import { screen } from '@testing-library/react';

import ExampleDashboard from './ExampleDashboard';

describe('ExampleDashboard', () => {
  it('should show skeletons for individual boxes with content and display crucial data after it', async () => {
    createTestWrapper({ children: <ExampleDashboard /> });
    const complianceBoxTitle = await screen.findByText(
      'EXAMPLE_DASHBOARD.COMPLIANCE_WITH_MINISTRY',
      {},
      { timeout: 2000 },
    );
    const economicActivityBoxTitle = await screen.findByText(
      'EXAMPLE_DASHBOARD.ECONOMIC_ACTIVITY.TITLE',
      {},
      { timeout: 2000 },
    );
    const employeesBoxTitle = await screen.findByText('EXAMPLE_DASHBOARD.EMPLOYEES', {}, { timeout: 2000 });

    expect(complianceBoxTitle).toBeInTheDocument();
    expect(economicActivityBoxTitle).toBeInTheDocument();
    expect(employeesBoxTitle).toBeInTheDocument();
  });
});
