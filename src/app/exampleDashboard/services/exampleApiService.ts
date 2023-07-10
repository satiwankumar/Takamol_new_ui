import { ApiService } from '@takamol/react-qiwa-core';

import { exampleApiUrl } from '../constants/exampleApiUrl';
import { todoListMock } from '../constants/todoListMock';
import { economicActivityMock } from '../constants/economicActivityMock';
import { complianceMock } from '../constants/complianceMock';
import { nitaqatMock } from '../constants/nitaqatMock';
import { employeesMock } from '../constants/employeesMock';
import { nonSaudiEmployeesMock } from '../constants/nonSaudiEmployeesMock';

const addNetworkDelay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

class ExampleApiService extends ApiService {
  constructor() {
    super(exampleApiUrl);
  }

  getTodoList = async () => {
    return Promise.resolve(todoListMock);
  };

  getComplianceStatus = async () => {
    await addNetworkDelay(1000);
    return Promise.resolve(complianceMock);
  };

  getEconomicActivity = async () => {
    await addNetworkDelay(1000);
    return Promise.resolve(economicActivityMock);
  };

  getNitaqatScore = async () => {
    await addNetworkDelay(1000);
    return Promise.resolve(nitaqatMock);
  };

  getEmployees = async () => {
    await addNetworkDelay(1000);
    return Promise.resolve(employeesMock);
  };

  getNonSaudisEmployees = async () => {
    await addNetworkDelay(1000);
    return Promise.resolve(nonSaudiEmployeesMock);
  };
}

export const exampleApiService = new ExampleApiService();
