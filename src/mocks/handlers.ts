import { createAuthApiHandlerMocks, getEnvironmentVar } from '@takamol/react-qiwa-core';

import { createExampleApiHandlerMocks } from '../app/exampleDashboard/utils/createExampleApiHandlerMocks';
import { exampleApiUrl } from 'src/app/exampleDashboard/constants/exampleApiUrl';

const AUTH_API_URL = getEnvironmentVar('AUTH_API_URL_API');

const authApiHandlers = createAuthApiHandlerMocks(AUTH_API_URL);
const exampleApiRest = createExampleApiHandlerMocks(exampleApiUrl);

export const handlers = [...authApiHandlers, ...exampleApiRest];
