"use client";

import {
  CheckIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorContrast() {
  const { colorPalette } = useSettings();

  return (
    <div className="flex flex-wrap flex-col gap-1 sm:gap-y-8 sm:flex-row">
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
    <div className="flex items-center flex-row sm:flex-col gap-y-2 gap-x-4 max-sm:w-full">
      <div className="text-sm max-sm:min-w-8">{number}</div>
      <div
        style={{
          backgroundColor: baseColor,
          color: contrastColor,
        }}
        className="relative group rounded size-20 flex items-center justify-center max-sm:order-first"
      >
        <span className="font-bold">{contrastRatio}</span>:1
        <button
          className="absolute inset-0 flex bg-inherit transition items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100"
          onClick={copyColorToClipboard}
          title={`Copy ${contrastColor} to clipboard`}
        >
          <DocumentDuplicateIcon className="size-6" />
          <span className="sr-only">Copy {contrastColor} to clipboard</span>
        </button>
      </div>
      <div className="sm:text-xs max-sm:font-bold">{contrastColor}</div>
      <div
        className={`${
          passesContrast ? "bg-green-700 text-white" : "bg-red-600 text-white"
        } rounded-full size-8 flex items-center justify-center max-sm:ml-auto`}
      >
        {passesContrast ? (
          <>
            <CheckIcon className="size-4" />
            <span className="sr-only">
              {contrastColor} has sufficient contrast with {baseColor} to meet
              the required ratio of {requiredContrastRatio}:1
            </span>
          </>
        ) : (
          <>
            <XMarkIcon className="size-4" />
            <span className="sr-only">
              {contrastColor} has not sufficient contrast with {baseColor} to
              meet the required ratio of {requiredContrastRatio}:1
            </span>
          </>
        )}
      </div>
    </div>
  );
}
