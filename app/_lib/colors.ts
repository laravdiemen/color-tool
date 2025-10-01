// Internal dependencies
import { type ContrastRatio } from "@/app/_lib/types";

// Helper function to check if a color is a valid hex color
export function isValidHexColor(hexColor: string) {
  const hexPattern = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
  return hexPattern.test(hexColor);
}

export function generateColorPalette(hexColor: string) {
  const opacities: Record<number, number> = {
    0: 0,
    50: 0.1,
    100: 0.2,
    200: 0.4,
    300: 0.6,
    400: 0.8,
    500: 1.0,
    600: 0.9,
    700: 0.7,
    800: 0.5,
    900: 0.3,
    950: 0.2,
    1000: 0,
  };

  const palette: Record<string, ReturnType<typeof getSingleColor>> = {};

  for (const [key, opacity] of Object.entries(opacities)) {
    palette[Number(key)] = getSingleColor(
      hexColor,
      getHexColorWithOpacity(hexColor, opacity, Number(key) >= 600 ? 0 : 255),
    );
  }

  return palette;
}

export function generateAccessibleColors(
  hexColor: string,
  requiredRatio: ContrastRatio = 4.5,
) {
  const accessibleColorWhite = getFirstAccessibleColor(
    hexColor,
    true,
    requiredRatio,
  );
  const accessibleColorBlack = getFirstAccessibleColor(
    hexColor,
    false,
    requiredRatio,
  );

  return {
    white: {
      index: 0,
      color: accessibleColorWhite,
      contrast3: getContrastColor(accessibleColorWhite, 3),
      contrast45: getContrastColor(accessibleColorWhite, 4.5),
      contrast7: getContrastColor(accessibleColorWhite, 7),
      contrastRatioBaseColor: calculateContrastRatio(
        accessibleColorWhite,
        "#FFF",
      ),
    },
    black: {
      index: 1000,
      color: accessibleColorBlack,
      contrast3: getContrastColor(accessibleColorBlack, 3),
      contrast45: getContrastColor(accessibleColorBlack, 4.5),
      contrast7: getContrastColor(accessibleColorBlack, 7),
      contrastRatioBaseColor: calculateContrastRatio(
        accessibleColorBlack,
        "#000",
      ),
    },
  };
}

// Helper function to generate a color object
export function getSingleColor(baseHexColor: string, hexColor: string) {
  return {
    color: hexColor,
    contrast3: getContrastColor(hexColor, 3),
    contrast45: getContrastColor(hexColor, 4.5),
    contrast7: getContrastColor(hexColor, 7),
    contrastRatioBaseColor: calculateContrastRatio(baseHexColor, hexColor),
  };
}

// Helper function to remove the hash and parse hex color
export function parseHexColor(hexColor: string) {
  hexColor = hexColor.replace(/^#/, "");

  // Handle shorthand hex colors
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return {
    red: parseInt(hexColor.substring(0, 2), 16),
    green: parseInt(hexColor.substring(2, 4), 16),
    blue: parseInt(hexColor.substring(4, 6), 16),
  };
}

// Helper function to blend a color with a specified opacity against a background color
export function blendColorComponent(
  colorComponent: number,
  opacity: number,
  background: number,
) {
  return Math.round(colorComponent * opacity + background * (1 - opacity));
}

// Helper function to convert a color component back to hex
export function colorComponentToHex(colorComponent: number) {
  return colorComponent.toString(16).padStart(2, "0").toUpperCase();
}

// Helper function to convert sRGB to linear RGB
export function sRGBToLinearRGB(colorComponent: number) {
  colorComponent /= 255;

  return colorComponent <= 0.03928
    ? colorComponent / 12.92
    : Math.pow((colorComponent + 0.055) / 1.055, 2.4);
}

// Converts a hex color code to a blended color with specified opacity against a background color.
export function getHexColorWithOpacity(
  hexColor: string,
  opacity: number,
  background: number = 255,
) {
  const { red, green, blue } = parseHexColor(hexColor);

  const blendedRed = blendColorComponent(red, opacity, background);
  const blendedGreen = blendColorComponent(green, opacity, background);
  const blendedBlue = blendColorComponent(blue, opacity, background);

  return `#${colorComponentToHex(blendedRed)}${colorComponentToHex(
    blendedGreen,
  )}${colorComponentToHex(blendedBlue)}`;
}

// Helper function to calculates the luminance of a hex color.
export function getLuminance(hexColor: string) {
  let { red, green, blue } = parseHexColor(hexColor);

  red = sRGBToLinearRGB(red);
  green = sRGBToLinearRGB(green);
  blue = sRGBToLinearRGB(blue);

  // Calculate the luminance
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

// Helper function to calculates the contrast ration between two colors.
export function calculateContrastRatio(color: string, colorContrast: string) {
  const luminance = getLuminance(color);
  const luminanceContrast = getLuminance(colorContrast);

  const lighter = Math.max(luminance, luminanceContrast);
  const darker = Math.min(luminance, luminanceContrast);

  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

// Determines the best contrasting text color (black or white) for a given background hex color based on the specified contrast ratio requirement for WCAG compliance.
export function getContrastColor(
  hexColor: string,
  requiredRatio: ContrastRatio = 4.5,
) {
  // Calculate contrast ratios
  const contrastWhite = calculateContrastRatio(hexColor, "#FFFFFF");
  const contrastBlack = calculateContrastRatio(hexColor, "#000000");

  // Check if either white or black meets the required contrast ratio
  if (contrastWhite >= requiredRatio) {
    return "#FFF";
  }

  if (contrastBlack >= requiredRatio) {
    return "#000";
  }

  // If neither meets the requirement, return the one with the better contrast
  return contrastBlack > contrastWhite ? "#000" : "#FFF";
}

export function getFirstAccessibleColor(
  hexColor: string,
  contrastWhite: boolean = true,
  requiredRatio: ContrastRatio = 4.5,
) {
  const hexColorContrast = contrastWhite ? "#FFF" : "#000";
  const luminanceColorContrast = contrastWhite ? 0 : 255;
  const contrast = calculateContrastRatio(hexColor, hexColorContrast);

  if (contrast >= requiredRatio) {
    return hexColor;
  }

  let low = 0.0;
  let high = 1.0;

  while (high - low > 0.01) {
    const opacity = (low + high) / 2;
    const shadeColor = getHexColorWithOpacity(
      hexColor,
      opacity,
      luminanceColorContrast,
    );
    const shadeColorContrast = calculateContrastRatio(
      shadeColor,
      hexColorContrast,
    );

    if (shadeColorContrast >= requiredRatio) {
      low = opacity;
    } else {
      high = opacity;
    }
  }

  return getHexColorWithOpacity(hexColor, low, luminanceColorContrast);
}
