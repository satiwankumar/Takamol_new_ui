import { pxToRem } from 'src/utils/pxToRem';

describe('pxToRem util', () => {
  test('should change pixels to rem', () => {
    const rem1 = pxToRem(16);
    expect('1rem').toEqual(rem1);
  });
});
