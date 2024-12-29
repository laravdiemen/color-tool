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

  const [baseColor, setBaseColor] = useState("");
  const [colorPalette, setColorPalette] = useState({});
  const [requiredContrastRatio, setRequiredContrastRatio] = useState("4.5");

  const updateBaseColor = useCallback(
    (color) => {
      setBaseColor(color);
      setColorPalette(generateColorPalette(color));

      const params = new URLSearchParams(searchParams);
      params.set("color", color.substring(1));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const updateRequiredContrastRatio = useCallback(
    (ratio) => {
      setRequiredContrastRatio(ratio);

      const params = new URLSearchParams(searchParams);
      params.set("ratio", ratio);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const activeColor = searchParams.get("color");

    if (activeColor) {
      updateBaseColor("#" + activeColor);
    }
  }, [searchParams, updateBaseColor]);

  useEffect(() => {
    const activeRatio = searchParams.get("ratio");

    if (activeRatio) {
      setRequiredContrastRatio(activeRatio);
    }
  }, [searchParams]);

  return (
    <SettingsContext.Provider
      value={{
        baseColor,
        updateBaseColor,
        colorPalette,
        requiredContrastRatio,
        updateRequiredContrastRatio,
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
