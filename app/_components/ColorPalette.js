"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorPalette() {
  const { colorPalette } = useSettings();

  return (
    // TODO: Add a button to copy a tailwind config (v3 or v4)
    <div className="flex flex-wrap gap-x-1 gap-y-8">
      {Object.entries(colorPalette).map(([key, value]) => (
        <Tile key={key} number={key} color={value.color} />
      ))}
    </div>
  );
}

function Tile({ number, color }) {
  return (
    <div className="flex items-center flex-col gap-2">
      <div className="text-sm">{number}</div>
      <div
        style={{
          backgroundColor: color,
        }}
        className="rounded size-20 flex items-center justify-center"
      ></div>
      <div className="text-xs">{color}</div>
    </div>
  );
}
