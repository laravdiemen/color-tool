"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import { EyeDropperIcon } from "@heroicons/react/24/outline";

export default function ColorInput() {
  const { baseColor, updateBaseColor } = useSettings();

  function handleColorInput(e) {
    // TODO: Add check if the input is a valid hex color
    updateBaseColor(e.target.value);
  }

  // TODO: Add a text input as well with validation for hex colors
  return (
    <>
      <div>
        <label htmlFor="color-picker" className="sr-only">
          Color picker
        </label>
        <div className="py-2 px-3 border border-slate-400 rounded relative transition hover:bg-slate-400">
          <EyeDropperIcon className="size-4 pointer-events-none" />
          <input
            id="color-picker"
            type="color"
            value={baseColor}
            onChange={handleColorInput}
            className="opacity-0 absolute inset-0 size-full"
          />
        </div>
      </div>
    </>
  );
}
