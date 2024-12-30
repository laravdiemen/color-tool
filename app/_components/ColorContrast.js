"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import Tile from "@/app/_components/Tile";

export default function ColorContrast() {
  const { colorPalette } = useSettings();

  return (
    <div className="flex flex-wrap flex-col gap-1 sm:gap-y-8 sm:flex-row">
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
