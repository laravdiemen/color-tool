"use client";

import {
  CheckIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSettings } from "@/app/_contexts/SettingsContext";

export default function Tile({ children }) {
  return (
    <div className="flex flex-row items-center gap-x-4 gap-y-2 max-sm:w-full sm:flex-col">
      {children}
    </div>
  );
}

function NumberLabel({ number }) {
  return <div className="text-sm max-sm:min-w-8">{number}</div>;
}

function ColorSquare({ bgColor, textColor, colorToCopy, contrastRatio }) {
  const { requiredContrastRatio } = useSettings();

  const passesContrast = contrastRatio
    ? parseFloat(contrastRatio) >= parseFloat(requiredContrastRatio)
    : null;

  function copyColorToClipboard() {
    try {
      navigator.clipboard.writeText(colorToCopy);
      toast.success(colorToCopy + " is copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy " + colorToCopy + " to clipboard");
    }
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className="group relative flex size-20 items-center justify-center rounded-sm max-sm:order-first"
    >
      {passesContrast !== null && (
        <span>{passesContrast ? "Pass" : "Fail"}</span>
      )}
      <button
        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-sm bg-inherit opacity-0 transition group-hover:opacity-100 focus:opacity-100"
        onClick={copyColorToClipboard}
        title={`Copy ${colorToCopy} to clipboard`}
      >
        <DocumentDuplicateIcon className="size-6" />
        <span className="sr-only">{`Copy ${colorToCopy} to clipboard`}</span>
      </button>
    </div>
  );
}

function ColorLabel({ color }) {
  return <div className="max-sm:font-bold sm:text-xs">{color}</div>;
}

function PassesContrastLabel({ colorContrast, contrastRatio }) {
  const { baseColor, requiredContrastRatio } = useSettings();

  const passesContrast =
    parseFloat(contrastRatio) >= parseFloat(requiredContrastRatio);

  return (
    <div className="flex flex-col items-center gap-2 max-sm:ml-auto">
      <div
        className={`${
          passesContrast ? "bg-green-700 text-white" : "bg-red-600 text-white"
        } flex size-8 items-center justify-center rounded-full`}
      >
        {passesContrast ? (
          <>
            <CheckIcon className="size-4" />
            <span className="sr-only">
              {`${colorContrast} has sufficient contrast with ${baseColor} to meet
              the required ratio of ${requiredContrastRatio}:1`}
            </span>
          </>
        ) : (
          <>
            <XMarkIcon className="size-4" />
            <span className="sr-only">
              {`${colorContrast} has not sufficient contrast with ${baseColor} to
              meet the required ratio of ${requiredContrastRatio}:1`}
            </span>
          </>
        )}
      </div>
      <div className="text-sm font-bold">{`${contrastRatio}:1`}</div>
    </div>
  );
}

Tile.NumberLabel = NumberLabel;
Tile.ColorSquare = ColorSquare;
Tile.ColorLabel = ColorLabel;
Tile.PassesContrastLabel = PassesContrastLabel;
