"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import { calculateContrastRatio } from "@/app/_lib/colors";

export default function ColorContrast() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tile value={0} />
      <Tile value={50} />
      <Tile value={950} />
      <Tile value={1000} />
    </div>
  );
}

function Tile({ value }) {
  const { inputColor, requiredContrastRatio, colorPalette } = useSettings();
  const contrastColor = colorPalette[value]?.color;

  if (!contrastColor) return null;

  const contrastRatio = calculateContrastRatio(inputColor, contrastColor);
  const passesContrast =
    parseFloat(contrastRatio) >= parseFloat(requiredContrastRatio);

  return (
    <div className="flex items-center flex-col gap-2 min-w-20">
      <div>{value}</div>
      <div
        style={{
          backgroundColor: inputColor,
          color: contrastColor,
        }}
        className="size-16 flex items-center justify-center"
      >
        <span className="font-bold">{contrastRatio}</span>:1
      </div>
      <div>{contrastColor}</div>
      <div
        className={`${
          passesContrast ? "bg-green-500" : "bg-red-500"
        } rounded-full px-3 py-1`}
      >
        {passesContrast ? "Passes" : "Fails"}
      </div>
    </div>
  );
}
