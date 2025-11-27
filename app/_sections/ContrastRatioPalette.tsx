"use client";

// Internal dependencies
import RequiredContrastRatio from "@/app/_components/RequiredContrastRatio";
import Tile from "@/app/_components/Tile";
import { useSettings } from "@/app/_contexts/SettingsContext";
import Heading from "@/app/_ui/Heading";
import Wrapper from "@/app/_ui/Wrapper";

export default function ContrastRatioPalette() {
  const { baseColor, colorPalette } = useSettings();

  if (!baseColor) return;

  return (
    <Wrapper>
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Heading as="h2">Check contrast with your base color</Heading>
        <RequiredContrastRatio />
      </div>
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
    </Wrapper>
  );
}
