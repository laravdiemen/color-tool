"use client";

// Internal dependencies
import TailwindConfigModal from "@/app/_components/TailwindConfigModal";
import Tile from "@/app/_components/Tile";
import { useSettings } from "@/app/_contexts/SettingsContext";
import Heading from "@/app/_ui/Heading";
import Wrapper from "@/app/_ui/Wrapper";

export default function TailwindColorPalette() {
  const { baseColor, colorPalette } = useSettings();

  if (!baseColor) return;

  return (
    <Wrapper>
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Heading as="h2">Tailwind color palette</Heading>
        <TailwindConfigModal />
      </div>
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
