"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateColorPalette, isValidHexColor } from "@/app/_lib/colors";
import { POSSIBLE_CONTRAST_RATIO } from "@/app/_lib/contrastRatio";

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
      if (!isValidHexColor(color)) return;

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
      if (!POSSIBLE_CONTRAST_RATIO.includes(ratio)) {
        ratio = POSSIBLE_CONTRAST_RATIO[0];
      }

      setRequiredContrastRatio(ratio);

      const params = new URLSearchParams(searchParams);
      params.set("ratio", ratio);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const resetContrastRatioParam = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("ratio", POSSIBLE_CONTRAST_RATIO[0]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  useEffect(() => {
    const activeColor = searchParams.get("color");

    if (activeColor && isValidHexColor("#" + activeColor)) {
      updateBaseColor("#" + activeColor);
    }
  }, [searchParams, updateBaseColor]);

  useEffect(() => {
    const activeRatio = searchParams.get("ratio");

    if (activeRatio && POSSIBLE_CONTRAST_RATIO.includes(activeRatio)) {
      setRequiredContrastRatio(activeRatio);
    } else {
      resetContrastRatioParam();
    }
  }, [searchParams, resetContrastRatioParam]);

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
