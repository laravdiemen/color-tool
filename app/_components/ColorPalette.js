"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorPalette() {
  const { colorPalette } = useSettings();

  return (
    // TODO: Add a button to copy a tailwind config (v3 or v4)
    <div className="flex flex-wrap flex-col gap-1 sm:gap-y-8 sm:flex-row">
      {Object.entries(colorPalette).map(([key, value]) => (
        <Tile
          key={key}
          number={key}
          color={value.color}
          colorContrast={value.contrast45}
        />
      ))}
    </div>
  );
}

// TODO: Create reusable component for ColorTile to share with ColorContrast
function Tile({ number, color, colorContrast }) {
  function copyColorToClipboard() {
    navigator.clipboard.writeText(color);
    toast.success(color + " is copied to clipboard");
  }

  return (
    <div className="flex items-center flex-row sm:flex-col gap-y-2 gap-x-4">
      <div className="text-sm max-sm:min-w-8">{number}</div>
      <div
        style={{
          backgroundColor: color,
        }}
        className="relative group rounded size-20 flex items-center justify-center max-sm:order-first"
      >
        <button
          style={{ color: colorContrast }}
          className="absolute inset-0 flex bg-inherit transition items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100"
          onClick={copyColorToClipboard}
          title={`Copy ${color} to clipboard`}
        >
          <DocumentDuplicateIcon className="size-6" />
          <span className="sr-only">Copy {color} to clipboard</span>
        </button>
      </div>
      <div className="sm:text-xs max-sm:font-bold">{color}</div>
    </div>
  );
}
