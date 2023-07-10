import * as React from 'react';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils';
import { waitFor, screen } from '@testing-library/react';
import { createTestWrapper } from '@takamol/react-qiwa-core';

import { SectionTitleBar } from '.';

jest.mock('@takamol/qiwa-design-system/utils');

describe('SectionTitleBar', () => {
  it('should display additional link and button labels only on resolutions higher than mobile', () => {
    const useMockWindowUtils = useWindowUtils as jest.MockedFunction<typeof useWindowUtils>;

    useMockWindowUtils.mockImplementation(
      jest.fn(() => ({ isMobileWidth: false, isTabletWidth: false, isSmallDesktopWidth: false, isRtl: false })),
    );

    createTestWrapper({
      children: <SectionTitleBar title="Section title" linkLabel="My link label" buttonLabel="My button label" />,
    });

    waitFor(() => {
      expect(screen.getByText(/my button label/i)).toBeInTheDocument();
      expect(screen.getByText(/my link label/i)).toBeInTheDocument();
    });
  });

  it('should NOT display additional link and button labels only on resolutions higher than mobile', () => {
    const useMockWindowUtils = useWindowUtils as jest.MockedFunction<typeof useWindowUtils>;

    useMockWindowUtils.mockImplementation(
      jest.fn(() => ({ isMobileWidth: false, isTabletWidth: false, isSmallDesktopWidth: false, isRtl: false })),
    );

    createTestWrapper({
      children: <SectionTitleBar title="Section title" />,
    });

    waitFor(() => {
      expect(screen.getByText(/my button label/i)).not.toBeInTheDocument();
      expect(screen.getByText(/my link label/i)).not.toBeInTheDocument();
    });
  });
});
