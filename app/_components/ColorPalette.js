"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import { generateColorPalette } from "@/app/_lib/colors";

export default function ColorPalette() {
  const { inputColor, requiredContrastRatio } = useSettings();
  const colorPalette = generateColorPalette(inputColor);

  return (
    // TODO: Add a button to copy a tailwind config
    <div>
      <div className="grid grid-cols-3 gap-4">
        <span>Key</span>
        <span>Color</span>
        <span>{requiredContrastRatio}</span>
      </div>
      {Object.entries(colorPalette).map(([key, value]) => (
        // TODO: Create seperate component for this
        <div
          key={key}
          style={{ backgroundColor: value.color, color: value.contrast3 }}
          className="grid grid-cols-3 gap-4"
        >
          <span>{key}</span>
          {/* TODO: Add a copy to clipboard button */}
          <span>{value.color}</span>
          {requiredContrastRatio === "3.0" && (
            <span style={{ color: value.contrast3 }}>{value.contrast3}</span>
          )}
          {requiredContrastRatio === "4.5" && (
            <span style={{ color: value.contrast45 }}>{value.contrast45}</span>
          )}
          {requiredContrastRatio === "7.0" && (
            <span style={{ color: value.contrast7 }}>{value.contrast7}</span>
          )}
        </div>
      ))}
    </div>
  );
}
