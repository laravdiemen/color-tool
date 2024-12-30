"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorPalette() {
  const { colorPalette } = useSettings();

  return (
    // TODO: Add a button to copy a tailwind config (v3 or v4)
    <div className="flex flex-wrap gap-x-1 gap-y-8">
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
    <div className="flex items-center flex-col gap-2">
      <div className="text-sm">{number}</div>
      <div
        style={{
          backgroundColor: color,
        }}
        className="relative group rounded size-20 flex items-center justify-center"
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
      <div className="text-xs">{color}</div>
    </div>
  );
}
