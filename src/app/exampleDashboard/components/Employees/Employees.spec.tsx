import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { createTestWrapper } from '@takamol/react-qiwa-core';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils/windowUtils';

import Employees from './Employees';

jest.mock('@takamol/qiwa-design-system/utils/windowUtils');

describe('Employees', () => {
  it('should render employees section with correct data', async () => {
    const useMockWindowUtils = useWindowUtils as jest.MockedFunction<typeof useWindowUtils>;

    useMockWindowUtils.mockImplementation(
      jest.fn(() => ({ isMobileWidth: false, isTabletWidth: false, isSmallDesktopWidth: false, isRtl: false })),
    );

    createTestWrapper({ children: <Employees /> });

    waitFor(() => {
      const heading = screen.getByText('EXAMPLE_DASHBOARD.EMPLOYEES');
      expect(heading).toBeInTheDocument();
    });
  });

  it('should display "Manage Employees" link on desktop', () => {
    const useMockWindowUtils = useWindowUtils as jest.MockedFunction<typeof useWindowUtils>;
    useMockWindowUtils.mockImplementation(
      jest.fn(() => ({ isMobileWidth: false, isTabletWidth: false, isSmallDesktopWidth: false, isRtl: false })),
    );

    createTestWrapper({ children: <Employees /> });

    waitFor(() => {
      const manageEmployeesLink = screen.getByRole('link', { name: 'EXAMPLE_DASHBOARD.MANAGE_EMPLOYEES' });
      expect(manageEmployeesLink).toBeInTheDocument();
    });
  });

  it('should display "Manage Employees" link on mobile', () => {
    const useMockWindowUtils = useWindowUtils as jest.MockedFunction<typeof useWindowUtils>;
    useMockWindowUtils.mockImplementation(
      jest.fn(() => ({ isMobileWidth: true, isTabletWidth: false, isSmallDesktopWidth: false, isRtl: false })),
    );

    createTestWrapper({ children: <Employees /> });

    waitFor(() => {
      const manageEmployeesLink = screen.getByRole('link', { name: 'EXAMPLE_DASHBOARD.MANAGE_EMPLOYEES' });
      expect(manageEmployeesLink).toBeInTheDocument();
    });
  });
});
