import { DefaultBodyType, rest as baseRest } from 'msw';

import { exampleApiUrl } from '../app/exampleDashboard/constants/exampleApiUrl';

import { server } from './testsServer';

const authApi = 'https://api.qiwa.info';

type HttpMethodsType = 'head' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';

const createRestHandler = <MethodType extends keyof typeof baseRest>(
  method: MethodType,
  apiPath: string,
): typeof baseRest[MethodType] => {
  const wrapperFn = ((...params: Parameters<typeof baseRest[MethodType]>) => {
    const [path, resolver] = params;
    const url = new RegExp('^(?:[a-z+]+:)?//', 'i').test(path.toString()) ? path : `${apiPath}${path}`;
    return baseRest[method](url, resolver);
  }) as typeof baseRest[MethodType];

  return wrapperFn;
};

export const restAuth = {
  head: createRestHandler('head', authApi),
  get: createRestHandler('get', authApi),
  post: createRestHandler('post', authApi),
  put: createRestHandler('put', authApi),
  delete: createRestHandler('delete', authApi),
  patch: createRestHandler('patch', authApi),
  options: createRestHandler('options', authApi),
};

type MockCreateInternalServerErrorProps = {
  httpMethod?: HttpMethodsType;
  endpoint: string;
  statusCode?: number;
  enMessage?: string;
  arMessage?: string;
  response?: DefaultBodyType;
  service?: 'authApi';
};

type MockCreateDifferentServerResponseProps = Omit<MockCreateInternalServerErrorProps, 'enMessage' | 'arMessage'>;

export const mockServerError = ({
  endpoint,
  httpMethod = 'get',
  statusCode = 500,
  enMessage = 'Internal server error',
  arMessage = 'خطأ في الخادم الداخلي',
  response = {
    data: {
      error: { ar: arMessage, code: 402, en: enMessage },
    },
  },
}: MockCreateInternalServerErrorProps) => {
  return server.use(
    restAuth[httpMethod](endpoint, (_req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(response));
    }),
  );
};

export const mockDifferentServerResponse = ({
  endpoint,
  httpMethod = 'get',
  statusCode = 200,
  response = [],
}: MockCreateDifferentServerResponseProps) => {
  return server.use(
    restAuth[httpMethod](endpoint, (_req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(response));
    }),
  );
};

export const exampleRest = {
  head: createRestHandler('head', exampleApiUrl),
  get: createRestHandler('get', exampleApiUrl),
  post: createRestHandler('post', exampleApiUrl),
  put: createRestHandler('put', exampleApiUrl),
  delete: createRestHandler('delete', exampleApiUrl),
  patch: createRestHandler('patch', exampleApiUrl),
  options: createRestHandler('options', exampleApiUrl),
};
