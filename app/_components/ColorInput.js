"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorInput() {
  const { inputColor, setInputColor } = useSettings();

  return (
    <input
      type="color"
      value={inputColor}
      onChange={(e) => setInputColor(e.target.value)}
    />
  );
}
