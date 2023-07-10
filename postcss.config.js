/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  plugins: [
    require('postcss-rtlcss'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};
