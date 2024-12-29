"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";

export default function RequiredContrastRatio() {
  return (
    <div className="flex sm:items-center gap-2 flex-col sm:flex-row flex-wrap w-full sm:w-fit">
      <h3>Required ratio:</h3>
      <Button value="3.0" />
      <Button value="4.5" />
      <Button value="7.0" />
    </div>
  );
}

function Button({ value }) {
  const { requiredContrastRatio, updateRequiredContrastRatio } = useSettings();

  return (
    <button
      className={`border-slate-400 border rounded px-3 py-2 ${
        requiredContrastRatio === value ? "bg-slate-400" : ""
      }`}
      onClick={() => updateRequiredContrastRatio(value)}
    >
      {value}:1
    </button>
  );
}
