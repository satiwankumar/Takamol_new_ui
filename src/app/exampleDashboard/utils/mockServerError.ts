import { rest } from 'msw';

import { server } from 'src/tests/testsServer';

type HttpMethodsType = 'head' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';

type MockCreateInternalServerErrorProps = {
  httpMethod?: HttpMethodsType;
  endpoint: string;
  statusCode?: number;
  enMessage?: string;
  arMessage?: string;
};

export const mockServerError = ({
  endpoint,
  httpMethod = 'get',
  statusCode = 500,
  enMessage = 'Internal server error',
  arMessage = 'خطأ في الخادم الداخلي',
}: MockCreateInternalServerErrorProps) => {
  return server.use(
    rest[httpMethod](endpoint, (_req, res, ctx) => {
      return res(
        ctx.status(statusCode),
        ctx.json({
          data: {
            error: { ar: arMessage, code: 402, en: enMessage },
          },
        }),
      );
    }),
  );
};
