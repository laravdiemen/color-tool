"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorInput() {
  const { baseColor, updateBaseColor } = useSettings();

  function handleColorInput(e) {
    // TODO: Add check if the input is a valid hex color
    updateBaseColor(e.target.value);
  }

  // TODO: Add a text input as well with validation for hex colors
  return <input type="color" value={baseColor} onChange={handleColorInput} />;
}
