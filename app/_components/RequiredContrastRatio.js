"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";

export default function RequiredContrastRatio() {
  const { requiredContrastRatio, setRequiredContrastRatio } = useSettings();

  // TODO: Save selected contrast ratio as search param
  function handleClick(value) {
    setRequiredContrastRatio(value);
  }

  return (
    <div className="flex sm:items-center gap-2 flex-col sm:flex-row flex-wrap w-full sm:w-fit">
      <h3>Required ratio:</h3>
      <Button
        value="3.0"
        handleClick={handleClick}
        activeValue={requiredContrastRatio}
      />
      <Button
        value="4.5"
        handleClick={handleClick}
        activeValue={requiredContrastRatio}
      />
      <Button
        value="7.0"
        handleClick={handleClick}
        activeValue={requiredContrastRatio}
      />
    </div>
  );
}

function Button({ value, handleClick, activeValue }) {
  return (
    <button
      className={`border-slate-400 border rounded px-3 py-2 ${
        activeValue === value ? "bg-slate-400" : ""
      }`}
      onClick={() => handleClick(value)}
    >
      {value}:1
    </button>
  );
}
