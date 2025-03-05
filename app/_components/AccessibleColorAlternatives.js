"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import Tile from "@/app/_components/Tile";
import Wrapper from "@/app/_ui/Wrapper";
import Heading from "@/app/_ui/Heading";
import Button from "@/app/_ui/Button";

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
      parseFloat(colorPalette[accessibleColor.index].contrastRatioBaseColor) >
      requiredContrastRatio
    )
      return null;

    return (
      <Wrapper key={key} className="md:!col-span-6">
        <Heading as="h2" className="mb-2">
          Accessible alternative
        </Heading>
        <p className="mb-6">
          If you want {key} as a text color, try {accessibleColor.color} as your
          base color.
        </p>
        <div className="my-6 flex">
          <Tile>
            <Tile.ColorSquare
              bgColor={accessibleColor.color}
              textColor={accessibleColor.contrast45}
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
          handleClick={() =>
            updateBaseColor(accessibleColor.color, requiredContrastRatio)
          }
        >
          Use {accessibleColor.color} as base color
        </Button>
      </Wrapper>
    );
  });
}
