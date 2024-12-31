"use client";

import { EyeDropperIcon } from "@heroicons/react/24/outline";
import { useSettings } from "@/app/_contexts/SettingsContext";
import { isValidHexColor } from "@/app/_lib/colors";
import { useEffect, useState } from "react";

export default function ColorInput() {
  const [hexValue, setHexValue] = useState("");
  const { baseColor, updateBaseColor } = useSettings();

  useEffect(() => {
    if (baseColor) {
      setHexValue(baseColor.substring(1));
    }
  }, [baseColor]);

  function validateHexColorInput(e) {
    let input = e.target.value;
    input = input.replace(/[^a-zA-Z0-9]/g, "");

    if (input.length > 6) {
      input = input.substring(0, 6);
    }

    setHexValue(input);

    if (isValidHexColor("#" + input)) {
      updateBaseColor("#" + input);
    }
  }

  function handleColorInput(e) {
    const input = e.target.value;

    if (isValidHexColor(input)) {
      updateBaseColor(e.target.value);
    }
  }

  // TODO: Add a text input for rgb an hsl
  return (
    <>
      <div>
        <label htmlFor="hex-color-input" className="sr-only">
          Hex color
        </label>
        <div className="relative">
          <span className="absolute top-1/2 left-2 -translate-y-1/2">#</span>

          <input
            id="hex-color-input"
            type="text"
            value={hexValue}
            onChange={validateHexColorInput}
            maxLength={7}
            placeholder="RRGGBB"
            className="py-1.5 pl-5 pr-3 rounded border border-slate-400"
          />
        </div>
      </div>
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
