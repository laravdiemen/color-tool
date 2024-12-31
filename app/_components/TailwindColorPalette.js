"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import Tile from "@/app/_components/Tile";
import Wrapper from "@/app/_ui/Wrapper";
import Heading from "@/app/_ui/Heading";

export default function TailwindColorPalette() {
  const { baseColor, colorPalette } = useSettings();

  if (!baseColor) return;

  return (
    <Wrapper>
      <Heading as="h2" className="mb-4">
        Tailwind color palette
      </Heading>
      {/* TODO: Add a button to copy a tailwind config (v3 or v4) */}
      <div className="flex flex-col flex-wrap gap-1 sm:flex-row sm:gap-y-8">
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
    </Wrapper>
  );
}
