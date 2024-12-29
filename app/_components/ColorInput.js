"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSettings } from "@/app/_contexts/SettingsContext";

export default function ColorInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { inputColor, setInputColor, updateInputColor } = useSettings();

  useEffect(() => {
    const activeColor = searchParams.get("color") ?? "";

    if (activeColor) {
      // TODO: Fix the issue that you see 1 second the fallback color
      setInputColor(activeColor);
    }
  }, [searchParams, setInputColor]);

  function handleColorInput(e) {
    // TODO: Add check if the input is a valid hex color
    const selectedColor = e.target.value;
    updateInputColor(selectedColor);

    const params = new URLSearchParams(searchParams);
    params.set("color", selectedColor);
    // TODO: Remove # from url?
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // TODO: Add a text input as well with validation for hex colors
  return <input type="color" value={inputColor} onChange={handleColorInput} />;
}
