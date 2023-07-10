const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

export const pxToRem = (px: number): string => `${(1 / (rootFontSize || 16)) * px}rem`;
