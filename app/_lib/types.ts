export type ContrastRatio = 3.0 | 4.5 | 7.0;

export type Color = {
  color: string;
  contrast3: string;
  contrast45: string;
  contrast7: string;
  contrastRatioBaseColor: number;
};

export type ColorPalette = Record<string, Color>;

export type AccessibleColors = {
  white: Color & {
    index: number;
  };
  black: Color & {
    index: number;
  };
};
