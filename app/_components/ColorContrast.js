"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import {
  calculateContrastRatio,
  generateColorPalette,
} from "@/app/_lib/colors";

export default function ColorContrast() {
  const { inputColor } = useSettings();
  // TODO: Save color palette somewhere?
  const colorPalette = generateColorPalette(inputColor);

  return (
    <div className="flex gap-4">
      <Tile contrastColor={"#FFFFFF"}>White #FFFFFF</Tile>

      <Tile contrastColor={colorPalette[50].color}>
        50 {colorPalette[50].color}
      </Tile>

      <Tile contrastColor={colorPalette[950].color}>
        950 {colorPalette[950].color}
      </Tile>

      <Tile contrastColor={"#000000"}>Black #000000</Tile>
    </div>
  );
}

function Tile({ contrastColor, children }) {
  const { inputColor, requiredContrastRatio } = useSettings();
  const contrastRatio = calculateContrastRatio(inputColor, contrastColor);

  return (
    <div className="flex items-center flex-col gap-2">
      <div
        style={{
          backgroundColor: inputColor,
          color: contrastColor,
        }}
        className="size-16 flex items-center justify-center"
      >
        <span className="font-bold">{contrastRatio}</span>:1
      </div>
      <div
        className={`${
          parseFloat(contrastRatio) >= parseFloat(requiredContrastRatio)
            ? "bg-green-500"
            : "bg-red-500"
        } rounded-full px-3 py-1`}
      >
        {children}
      </div>
    </div>
  );
}
