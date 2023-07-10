// eslint-disable-next-line import/default
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import detect from 'detect-port';

import { NodeEnvironment } from './setup';

export const getModes = (mode: NodeEnvironment) => ({
  isProd: mode === NodeEnvironment.production,
  isDev: mode === NodeEnvironment.development,
});

export const useLoader = (condition: boolean, loader: Record<string, unknown> | string) => (condition ? [loader] : []);

export const usePlugin = (condition: boolean, plugin: unknown) => (condition ? [plugin] : []);

export const loadEnvs = (mode?: NodeEnvironment) => {
  const testOptions = mode === NodeEnvironment.test && { path: path.resolve(process.cwd(), '.env.test') };
  const options = { path: path.resolve(process.cwd(), '.env.local') };

  try {
    return dotenv.config(testOptions || options);
  } catch (err: unknown) {
    console.log(err);
    console.log('Missing or wrong env files');
  }
};

export const getEnvs = (mode: NodeEnvironment) => {
  const rawEnvs = loadEnvs(mode)?.parsed;

  if (!rawEnvs)
    return {
      rawEnvs: { NODE_ENV: mode },
      stringifiedEnvs: {
        'process.env': {
          NODE_ENV: `"${mode}"`,
        },
      },
    };

  const stringified = Object.keys(rawEnvs).reduce((env, key) => {
    env[key] = JSON.stringify(rawEnvs[key]);
    return env;
  }, {} as Record<string, string>);

  if (process.env.APP_API_MOCK) {
    stringified['APP_API_MOCK'] = process.env.APP_API_MOCK;
  }

  return {
    rawEnvs: {
      NODE_ENV: mode,
      ...rawEnvs,
    },
    stringifiedEnvs: {
      'process.env': {
        NODE_ENV: `"${mode}"`,
        ...stringified,
      },
    },
  };
};

export const httpsConfig = () => {
  const isHttps = process.env.HTTPS === 'true';

  if (isHttps) {
    return {
      type: 'https',
      options: {
        key: fs.readFileSync(path.resolve('config/ssl/localhost.key')),
        cert: fs.readFileSync(path.resolve('config/ssl/localhost.crt')),
      },
    };
  }

  return undefined;
};

export const detectPort = async (port: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    detect(port, (err, _port) => {
      if (err) {
        reject(err);
      }
      resolve(_port);
    });
  });
};
