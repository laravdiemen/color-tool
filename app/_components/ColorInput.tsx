"use client";

// External dependencies
import { useEffect, useState, type ChangeEvent } from "react";
import { EyeDropperIcon } from "@heroicons/react/24/outline";

// Internal dependencies
import { useSettings } from "@/app/_contexts/SettingsContext";
import { isValidHexColor } from "@/app/_lib/colors";
import Wrapper from "@/app/_ui/Wrapper";
import Heading from "@/app/_ui/Heading";

export default function ColorInput() {
  const [hexValue, setHexValue] = useState("");
  const { baseColor, updateBaseColor, requiredContrastRatio } = useSettings();

  useEffect(() => {
    if (baseColor) {
      setHexValue(baseColor.substring(1));
    }
  }, [baseColor]);

  function validateHexColorInput(e: ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;
    input = input.replace(/[^a-zA-Z0-9]/g, "");

    if (input.length > 6) {
      input = input.substring(0, 6);
    }

    setHexValue(input);

    if (isValidHexColor("#" + input)) {
      updateBaseColor("#" + input, requiredContrastRatio);
    }
  }

  function handleColorInput(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (isValidHexColor(input)) {
      updateBaseColor(e.target.value, requiredContrastRatio);
    }
  }

  // TODO: Add a text input for rgb an hsl
  return (
    <Wrapper>
      <div className="flex flex-wrap items-center gap-4">
        <Heading as="h2">Add your base color:</Heading>
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
              className="rounded-sm border border-slate-400 py-1.5 pr-3 pl-5 dark:border-slate-50"
            />
          </div>
        </div>
        <div>
          <label htmlFor="color-picker" className="sr-only">
            Color picker
          </label>
          <div className="hocus:bg-slate-400 dark:hocus:bg-slate-50 dark:hocus:text-slate-950 has-input-focus:outline-animation relative rounded-sm border border-slate-400 p-2.5 transition-colors dark:border-slate-50">
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
      </div>
    </Wrapper>
  );
}
