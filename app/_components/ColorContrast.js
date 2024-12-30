"use client";

import {
  CheckIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
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

// TODO: Create reusable component for ColorTile to share with ColorPalette
function Tile({ number, contrastColor, contrastRatio }) {
  const { baseColor, requiredContrastRatio } = useSettings();

  if (!contrastColor) return null;

  const passesContrast =
    parseFloat(contrastRatio) >= parseFloat(requiredContrastRatio);

  function copyColorToClipboard() {
    navigator.clipboard.writeText(contrastColor);
    toast.success(contrastColor + " is copied to clipboard");
  }

  return (
    <div className="flex items-center flex-col gap-2">
      <div className="text-sm">{number}</div>
      <div
        style={{
          backgroundColor: baseColor,
          color: contrastColor,
        }}
        className="relative group rounded size-20 flex items-center justify-center"
      >
        <span className="font-bold">{contrastRatio}</span>:1
        <button
          className="absolute inset-0 flex bg-inherit transition items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100"
          onClick={copyColorToClipboard}
          title={`Copy ${contrastColor} to clipboard`}
        >
          <ClipboardDocumentIcon className="size-6" />
          <span className="sr-only">Copy {contrastColor} to clipboard</span>
        </button>
      </div>
      <div className="text-xs">{contrastColor}</div>
      <div
        className={`${
          passesContrast ? "bg-green-700 text-white" : "bg-red-600 text-white"
        } rounded-full size-8 flex items-center justify-center`}
      >
        {passesContrast ? (
          <CheckIcon className="size-4" />
        ) : (
          <XMarkIcon className="size-4" />
        )}
      </div>
    </div>
  );
}
