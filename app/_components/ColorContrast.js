"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorContrast() {
  const { colorPalette } = useSettings();

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-8">
      {Object.entries(colorPalette).map(([key, value]) => (
        <Tile
          key={key}
          number={key}
          contrastColor={value.color}
          contrastRatio={value.contrastRatioBaseColor}
        />
      ))}
    </div>
  );
}

function Tile({ number, contrastColor, contrastRatio }) {
  const { inputColor, requiredContrastRatio } = useSettings();

  if (!contrastColor) return null;

  const passesContrast =
    parseFloat(contrastRatio) >= parseFloat(requiredContrastRatio);

  return (
    <div className="flex items-center flex-col gap-2">
      <div className="text-sm">{number}</div>
      <div
        style={{
          backgroundColor: inputColor,
          color: contrastColor,
        }}
        className="rounded size-20 flex items-center justify-center"
      >
        <span className="font-bold">{contrastRatio}</span>:1
      </div>
      <div className="text-xs">{contrastColor}</div>
      <div
        className={`${
          passesContrast ? "bg-green-700 text-white" : "bg-red-600 text-white"
        } rounded-full px-3 py-1`}
      >
        {passesContrast ? "Passes" : "Fails"}
      </div>
    </div>
  );
}
