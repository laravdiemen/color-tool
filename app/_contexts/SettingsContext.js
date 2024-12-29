"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateColorPalette } from "@/app/_lib/colors";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [inputColor, setInputColor] = useState("");
  const [colorPalette, setColorPalette] = useState({});
  const [requiredContrastRatio, setRequiredContrastRatio] = useState("4.5");

  const updateInputColor = useCallback(
    (color) => {
      setInputColor(color);
      setColorPalette(generateColorPalette(color));

      const params = new URLSearchParams(searchParams);
      params.set("color", color.substring(1));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const activeColor = searchParams.get("color");

    if (activeColor) {
      updateInputColor("#" + activeColor);
    }
  }, [searchParams, updateInputColor]);

  return (
    <SettingsContext.Provider
      value={{
        inputColor,
        setInputColor,
        updateInputColor,
        colorPalette,
        setColorPalette,
        requiredContrastRatio,
        setRequiredContrastRatio,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("Context was used outside provider");
  }

  return context;
}
