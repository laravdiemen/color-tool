"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import { generateColorPalette } from "@/app/_lib/colors";

export default function ColorPalette() {
  const { inputColor } = useSettings();
  const colorPalette = generateColorPalette(inputColor);

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <span>Key</span>
        <span>Color</span>
        <span>3.0</span>
        <span>4.5</span>
        <span>7.0</span>
      </div>
      {Object.entries(colorPalette).map(([key, value]) => (
        <div
          key={key}
          style={{ backgroundColor: value.color, color: value.contrast3 }}
          className="grid grid-cols-5 gap-4"
        >
          <span>{key}</span>
          <span>{value.color}</span>
          <span style={{ color: value.contrast3 }}>{value.contrast3}</span>
          <span style={{ color: value.contrast45 }}>{value.contrast45}</span>
          <span style={{ color: value.contrast7 }}>{value.contrast7}</span>
        </div>
      ))}
    </div>
  );
}
