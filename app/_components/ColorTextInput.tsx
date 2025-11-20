// External dependencies
import { type ChangeEvent } from "react";

type ColorTextInputProps = {
  id?: string;
  label?: string;
  showLabel?: boolean;
  value: string;
  setValue: (value: string) => void;
};

export default function ColorTextInput({
  id = "hex-color-input",
  label,
  showLabel = false,
  value,
  setValue,
}: ColorTextInputProps) {
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;
    input = input.replace(/[^a-zA-Z0-9]/g, "");

    if (input.length > 6) {
      input = input.substring(0, 6);
    }

    setValue(input);
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={showLabel ? "mb-1 block font-medium" : "sr-only"}
      >
        {label || "Hex color"}
      </label>
      <div className="relative">
        <span className="absolute top-1/2 left-2 -translate-y-1/2">#</span>

        <input
          id={id}
          type="text"
          value={value}
          onChange={handleOnChange}
          maxLength={7}
          placeholder="RRGGBB"
          className="rounded-sm border border-slate-400 py-1.5 pr-3 pl-5 dark:border-slate-400"
        />
      </div>
    </div>
  );
}
