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
          <span className="absolute left-2 top-1/2 -translate-y-1/2">#</span>

          <input
            id="hex-color-input"
            type="text"
            value={hexValue}
            onChange={validateHexColorInput}
            maxLength={7}
            placeholder="RRGGBB"
            className="rounded border border-slate-400 py-1.5 pl-5 pr-3"
          />
        </div>
      </div>
      <div>
        <label htmlFor="color-picker" className="sr-only">
          Color picker
        </label>
        <div className="relative rounded border border-slate-400 px-3 py-2 transition hover:bg-slate-400">
          <EyeDropperIcon className="pointer-events-none size-4" />
          <input
            id="color-picker"
            type="color"
            value={baseColor}
            onChange={handleColorInput}
            className="absolute inset-0 size-full opacity-0"
          />
        </div>
      </div>
    </>
  );
}
