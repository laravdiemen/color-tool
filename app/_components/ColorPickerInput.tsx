// External dependencies
import { type ChangeEvent } from "react";
import { EyeDropperIcon } from "@heroicons/react/24/outline";

type ColorPickerInputProps = {
  label?: string;
  value: string;
  setValue: (value: string) => void;
};

export default function ColorPickerInput({
  label,
  value,
  setValue,
}: ColorPickerInputProps) {
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    setValue(input);
  }

  return (
    <div>
      <label htmlFor="color-picker" className="sr-only">
        {label || "Color picker"}
      </label>
      <div className="hocus:bg-slate-400 dark:hocus:bg-slate-50 dark:hocus:text-slate-950 has-input-focus:outline-animation relative rounded-sm border border-slate-400 p-2.5 transition-colors dark:border-slate-50">
        <EyeDropperIcon className="pointer-events-none size-4" />
        <input
          id="color-picker"
          type="color"
          value={value}
          onChange={handleOnChange}
          className="absolute inset-0 size-full opacity-0"
        />
      </div>
    </div>
  );
}
