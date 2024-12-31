"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import Tile from "@/app/_components/Tile";

export default function ColorContrast() {
  const { colorPalette } = useSettings();

  return (
    <div className="flex flex-col flex-wrap gap-1 sm:flex-row sm:gap-y-8">
      {Object.entries(colorPalette).map(([key, value]) => (
        <Tile key={key}>
          <Tile.NumberLabel number={key} />
          <Tile.ColorSquare
            bgColor={colorPalette[500].color}
            textColor={value.color}
            colorToCopy={value.color}
            contrastRatio={value.contrastRatioBaseColor}
          />
          <Tile.ColorLabel color={value.color} />
          <Tile.PassesContrastLabel
            colorContrast={value.color}
            contrastRatio={value.contrastRatioBaseColor}
          />
        </Tile>
      ))}
    </div>
  );
}
