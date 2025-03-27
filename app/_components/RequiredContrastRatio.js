"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import AccessibilityInfoModal from "@/app/_components/AccessibilityInfoModal";
import { POSSIBLE_CONTRAST_RATIO } from "@/app/_lib/constants";
import Button from "@/app/_ui/Button";

export default function RequiredContrastRatio() {
  const { requiredContrastRatio, updateRequiredContrastRatio } = useSettings();

  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <div
        role="radiogroup"
        aria-labelledby="contrast-ratio-legend"
        className="flex flex-row flex-wrap items-center gap-2"
      >
        <div id="contrast-ratio-legend">Required ratio:</div>
        {POSSIBLE_CONTRAST_RATIO.map((ratio, index) => (
          <label
            key={index}
            className="hocus:bg-slate-400 dark:hocus:bg-slate-50 dark:hocus:text-slate-950 has-input-focus:outline-animation cursor-pointer rounded border border-slate-400 px-3 py-2 transition-colors active:scale-95 has-checked:bg-slate-400 dark:border-slate-50 has-checked:dark:bg-slate-50 has-checked:dark:text-slate-950"
          >
            <input
              type="radio"
              id={`contrast-ratio-${ratio}`}
              name="contrast-ratio"
              className="sr-only"
              value={ratio}
              checked={requiredContrastRatio === ratio}
              onChange={() => updateRequiredContrastRatio(ratio)}
            />
            {`${ratio}:1`}
          </label>
        ))}
      </div>
      <AccessibilityInfoModal />
    </div>
  );
}
