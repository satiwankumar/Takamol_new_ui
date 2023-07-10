import '@testing-library/jest-dom';
import 'jest-styled-components';

import { server } from './testsServer';

jest.mock('src/app/translations/hooks/useLocale', () => ({
  __esModule: true,
  useLocale: () => ({
    t: (key: string) => key,
    locale: 'en',
  }),
}));

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});
afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
