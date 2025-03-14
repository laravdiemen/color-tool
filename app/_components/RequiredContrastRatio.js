"use client";

import { useSettings } from "@/app/_contexts/SettingsContext";
import { POSSIBLE_CONTRAST_RATIO } from "@/app/_lib/constants";
import Button from "@/app/_ui/Button";

export default function RequiredContrastRatio() {
  const { requiredContrastRatio, updateRequiredContrastRatio } = useSettings();

  return (
    <div className="flex w-full flex-col flex-wrap gap-2 sm:w-fit sm:flex-row sm:items-center">
      <h3>Required ratio:</h3>

      {POSSIBLE_CONTRAST_RATIO.map((ratio, index) => (
        <Button
          key={index}
          isActive={requiredContrastRatio === ratio}
          onClick={() => updateRequiredContrastRatio(ratio)}
        >
          {`${ratio}:1`}
        </Button>
      ))}
    </div>
  );
}
