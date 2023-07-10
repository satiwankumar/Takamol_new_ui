import path from 'path';
import { WebpackConfiguration } from 'webpack-dev-server';

import { httpsConfig } from '../config/utils';

export enum NodeEnvironment {
  development = 'development',
  production = 'production',
  test = 'test',
}

export const appPaths = {
  src: path.resolve(process.cwd(), 'src'),
  entry: path.resolve(process.cwd(), 'src/index.ts'),
  dist: path.resolve(process.cwd(), 'dist'),
  public: path.resolve(process.cwd(), 'public'),
  template: path.resolve(process.cwd(), 'public/index.html'),
  tests: path.resolve(process.cwd(), 'tests'),
};

export const pluginOptions = {
  htmlWebpackPluginOptions: {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  },
  terserPluginOptions: {
    parse: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ecma: 8 as any,
    },
    compress: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ecma: 5 as any,
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    output: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ecma: 5 as any,
      comments: false,
      ascii_only: true,
    },
  },
};

export const createDevServerConfig = (
  portConfig?: Record<string, number | string>,
): WebpackConfiguration['devServer'] => ({
  historyApiFallback: {
    disableDotRule: true,
    index: '/',
  },
  client: {
    overlay: false,
  },
  static: {
    directory: appPaths.public,
    serveIndex: true,
    staticOptions: {},
    watch: true,
  },
  open: false,
  hot: true,
  server: httpsConfig(),
  ...(portConfig ? portConfig : {}),
});
