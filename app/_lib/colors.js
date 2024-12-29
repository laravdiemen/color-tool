export function generateColorPalette(hexColor) {
  const opacities = {
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
    950: 0.1,
    1000: 0,
  };

  const palette = {};

  for (const [key, opacity] of Object.entries(opacities)) {
    palette[key] = getSingleColor(
      getHexColorWithOpacity(hexColor, opacity, key >= 600 ? 0 : 255)
    );
  }

  return palette;
}

// Helper function to generate a color object
export function getSingleColor(hexColor) {
  return {
    color: hexColor,
    contrast3: getContrastColor(hexColor, 3),
    contrast45: getContrastColor(hexColor, 4.5),
    contrast7: getContrastColor(hexColor, 7),
  };
}

// Helper function to remove the hash and parse hex color
export function parseHexColor(hexColor) {
  hexColor = hexColor.replace(/^#/, "");

  return {
    red: parseInt(hexColor.substring(0, 2), 16),
    green: parseInt(hexColor.substring(2, 4), 16),
    blue: parseInt(hexColor.substring(4, 6), 16),
  };
}

// Helper function to blend a color with a specified opacity against a background color
export function blendColorComponent(colorComponent, opacity, background) {
  return Math.round(colorComponent * opacity + background * (1 - opacity));
}

// Helper function to convert a color component back to hex
export function colorComponentToHex(colorComponent) {
  return colorComponent.toString(16).padStart(2, "0").toUpperCase();
}

// Helper function to convert sRGB to linear RGB
export function sRGBToLinearRGB(colorComponent) {
  colorComponent /= 255;

  return colorComponent <= 0.03928
    ? colorComponent / 12.92
    : Math.pow((colorComponent + 0.055) / 1.055, 2.4);
}

// Converts a hex color code to a blended color with specified opacity against a background color.
export function getHexColorWithOpacity(hexColor, opacity, background = 255) {
  const { red, green, blue } = parseHexColor(hexColor);

  const blendedRed = blendColorComponent(red, opacity, background);
  const blendedGreen = blendColorComponent(green, opacity, background);
  const blendedBlue = blendColorComponent(blue, opacity, background);

  return `#${colorComponentToHex(blendedRed)}${colorComponentToHex(
    blendedGreen
  )}${colorComponentToHex(blendedBlue)}`;
}

// Helper function to calculates the luminance of a hex color.
export function getLuminance(hexColor) {
  let { red, green, blue } = parseHexColor(hexColor);

  red = sRGBToLinearRGB(red);
  green = sRGBToLinearRGB(green);
  blue = sRGBToLinearRGB(blue);

  // Calculate the luminance
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

// Helper function to calculates the contrast ration between two colors.
export function calculateContrastRatio(color, colorContrast) {
  const luminance = getLuminance(color);
  const luminanceContrast = getLuminance(colorContrast);

  const lighter = Math.max(luminance, luminanceContrast);
  const darker = Math.min(luminance, luminanceContrast);

  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// Determines the best contrasting text color (black or white) for a given background hex color based on the specified contrast ratio requirement for WCAG compliance.
export function getContrastColor(hexColor, requiredRatio = 4.5) {
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
