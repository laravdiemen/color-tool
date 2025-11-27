"use client";

// Internal dependencies
import Tile from "@/app/_components/Tile";
import { useSettings } from "@/app/_contexts/SettingsContext";
import Button from "@/app/_ui/Button";
import Heading from "@/app/_ui/Heading";
import Wrapper from "@/app/_ui/Wrapper";

export default function AccessibleColorAlternatives() {
  const {
    colorPalette,
    accessibleColors,
    requiredContrastRatio,
    updateBaseColor,
  } = useSettings();

  if (Object.keys(colorPalette).length === 0) return;

  return Object.entries(accessibleColors).map(([key, accessibleColor]) => {
    if (
      colorPalette[accessibleColor.index].contrastRatioBaseColor >=
      requiredContrastRatio
    )
      return null;

    return (
      <Wrapper key={key} className="md:!col-span-6">
        <Heading as="h2" className="mb-2">
          Accessible alternative
        </Heading>
        <p className="mb-6">
          {`If you want ${key} as a text color, try ${accessibleColor.color} as your
          base color.`}
        </p>
        <div className="my-6 flex flex-wrap gap-4">
          <Tile>
            <Tile.ColorSquare
              bgColor={colorPalette[500].color}
              textColor={colorPalette[accessibleColor.index].color}
              colorToCopy={colorPalette[500].color}
              contrastRatio={
                colorPalette[accessibleColor.index].contrastRatioBaseColor
              }
            />
            <Tile.ColorLabel color={colorPalette[500].color} />
            <Tile.PassesContrastLabel
              colorContrast={colorPalette[accessibleColor.index].color}
              contrastRatio={
                colorPalette[accessibleColor.index].contrastRatioBaseColor
              }
            />
          </Tile>
          <Tile>
            <Tile.ColorSquare
              bgColor={accessibleColor.color}
              textColor={colorPalette[accessibleColor.index].color}
              colorToCopy={accessibleColor.color}
              contrastRatio={accessibleColor.contrastRatioBaseColor}
            />
            <Tile.ColorLabel color={accessibleColor.color} />
            <Tile.PassesContrastLabel
              colorContrast={accessibleColor.color}
              contrastRatio={accessibleColor.contrastRatioBaseColor}
            />
          </Tile>
        </div>
        <Button
          onClick={() =>
            updateBaseColor(accessibleColor.color, requiredContrastRatio)
          }
        >
          {`Use ${accessibleColor.color} as base color`}
        </Button>
      </Wrapper>
    );
  });
}
