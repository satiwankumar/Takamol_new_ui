import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { createTestWrapper } from '@takamol/react-qiwa-core';

import { nonSaudiEmployeesMock } from '../../constants/nonSaudiEmployeesMock';

import NonSaudiEmployees from './NonSaudiEmployees';

describe('NonSaudiEmployees', () => {
  it('should render number of non-saudis availble to hire api is successfully fetched', async () => {
    createTestWrapper({ children: <NonSaudiEmployees /> });

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    const numberOfLongTermEmployees = nonSaudiEmployeesMock.longTerm;
    const numberOfTemporaryEmployees = nonSaudiEmployeesMock.temporary;
    const numberOfSesonalEmployees = nonSaudiEmployeesMock.seasonal;

    expect(screen.getByText(numberOfLongTermEmployees)).toBeInTheDocument();
    expect(screen.getByText(numberOfTemporaryEmployees)).toBeInTheDocument();
    expect(screen.getByText(numberOfSesonalEmployees)).toBeInTheDocument();
  });
});
