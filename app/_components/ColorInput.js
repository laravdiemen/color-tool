"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSettings } from "@/app/_contexts/SettingsContext";
import { useEffect } from "react";

export default function ColorInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { inputColor, setInputColor } = useSettings();

  useEffect(() => {
    const activeColor = searchParams.get("color") ?? "";

    if (activeColor) {
      setInputColor(activeColor);
    }
  }, [searchParams, setInputColor]);

  function handleColorInput(e) {
    const selectedColor = e.target.value;
    setInputColor(selectedColor);
    const params = new URLSearchParams(searchParams);
    params.set("color", selectedColor);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return <input type="color" value={inputColor} onChange={handleColorInput} />;
}
