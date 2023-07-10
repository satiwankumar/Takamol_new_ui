import { rest } from 'msw';

import { todoListMock } from '../constants/todoListMock';
import { complianceMock } from '../constants/complianceMock';
import { nitaqatMock } from '../constants/nitaqatMock';
import { employeesMock } from '../constants/employeesMock';
import { nonSaudiEmployeesMock } from '../constants/nonSaudiEmployeesMock';

export const createExampleApiHandlerMocks = (apiBaseUrl: string) => {
  const formatUrl = (path: string) => `${apiBaseUrl}/${path}`;

  return [
    rest.get(formatUrl('todo-list'), (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(todoListMock));
    }),
    rest.get(formatUrl('compliance-status'), (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(complianceMock));
    }),
    rest.get(formatUrl('economic-activity'), (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(complianceMock));
    }),
    rest.get(formatUrl('nitaqat-score'), (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(nitaqatMock));
    }),
    rest.get(formatUrl('employees'), (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(employeesMock));
    }),
    rest.get(formatUrl('non-saudi-employees'), (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(nonSaudiEmployeesMock));
    }),
  ];
};
