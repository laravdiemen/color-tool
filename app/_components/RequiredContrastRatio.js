"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import { POSSIBLE_CONTRAST_RATIO } from "@/app/_lib/contrastRatio";

export default function RequiredContrastRatio() {
  return (
    <div className="flex sm:items-center gap-2 flex-col sm:flex-row flex-wrap w-full sm:w-fit">
      <h3>Required ratio:</h3>

      {POSSIBLE_CONTRAST_RATIO.map((ratio, index) => (
        <Button key={index} value={ratio} />
      ))}
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
