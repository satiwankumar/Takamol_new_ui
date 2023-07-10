import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';

import { appPaths, createDevServerConfig, NodeEnvironment, pluginOptions } from './setup';
import { getEnvs, getModes, useLoader, usePlugin } from './utils';

export default (mode: NodeEnvironment, portConfig?: Record<string, number | string>) => {
  const { isProd, isDev } = getModes(mode);
  const envs = getEnvs(mode);

  return {
    mode,
    entry: appPaths.entry,
    output: {
      path: appPaths.dist,
      publicPath: '/',
      filename: isProd ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
      chunkFilename: isProd ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
      hashFunction: 'xxhash64',
    },
    resolve: {
      fallback: {
        url: require.resolve('url/'),
      },
      alias: {
        src: appPaths.src,
        react: path.resolve('node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'react-router-dom': path.resolve('./node_modules/react-router-dom'),
        'styled-components': path.resolve('./node_modules/styled-components'),
        '@tanstack/react-query': path.resolve('./node_modules/@tanstack/react-query'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: isDev ? 'source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              // Other Babel options
            },
          },
        },
        {
          test: /\.cjs$/,
          use: 'babel-loader', // or any other loader you prefer
        },
        // Add a rule for handling other JS files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader', // or any other loader you prefer
        },
        // Add a rule for handling other assets (e.g., images)
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: appPaths.src,
          loader: 'babel-loader',
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
            presets: [['babel-preset-react-app', { runtime: 'automatic' }]],
            plugins: [
              [
                'babel-plugin-named-asset-import',
                { loaderMap: { svg: { ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]' } } },
              ],
            ],
            cacheDirectory: true,
            cacheCompression: false,
            compact: isProd,
          },
        },
        {
          test: /\.css$/,
          use: [
            ...useLoader(isDev, { loader: 'style-loader' }),
            ...useLoader(isProd, MiniCssExtractPlugin.loader),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isDev,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          loader: 'file-loader',
          exclude: [/(^|\.(js|mjs|jsx|ts|tsx|css|bmp|gif|png|jpeg|jpg))$/, /\.html$/, /\.json$/],
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin({ terserOptions: pluginOptions.terserPluginOptions }), new CssMinimizerPlugin()],
    },
    ...(isDev
      ? {
          devServer: createDevServerConfig(portConfig),
        }
      : {}),
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        favicon: './public/favicon.ico',
        inject: true,
        template: appPaths.template,
        ...(isProd ? pluginOptions.htmlWebpackPluginOptions : {}),
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...usePlugin(!!envs.stringifiedEnvs, new webpack.DefinePlugin(envs.stringifiedEnvs!)),
    ],
  };
};
