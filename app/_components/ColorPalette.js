"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import Tile from "@/app/_components/Tile";

export default function ColorPalette() {
  const { colorPalette } = useSettings();

  return (
    // TODO: Add a button to copy a tailwind config (v3 or v4)
    <div className="flex flex-wrap flex-col gap-1 sm:gap-y-8 sm:flex-row">
      {Object.entries(colorPalette).map(([key, value]) => (
        <Tile key={key}>
          <Tile.NumberLabel number={key} />
          <Tile.ColorSquare
            bgColor={value.color}
            textColor={value.contrast45}
            colorToCopy={value.color}
          />
          <Tile.ColorLabel color={value.color} />
        </Tile>
      ))}
    </div>
  );
}
