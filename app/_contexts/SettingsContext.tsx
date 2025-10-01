"use client";

// External dependencies
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Internal dependencies
import {
  generateColorPalette,
  generateAccessibleColors,
  isValidHexColor,
} from "@/app/_lib/colors";
import {
  type ContrastRatio,
  type ColorPalette,
  type AccessibleColors,
} from "@/app/_lib/types";
import { POSSIBLE_CONTRAST_RATIO } from "@/app/_lib/constants";

type SettingsContextValue = {
  baseColor: string;
  updateBaseColor: (color: string, ratio: ContrastRatio) => void;
  colorPalette: ColorPalette;
  accessibleColors: AccessibleColors;
  requiredContrastRatio: ContrastRatio;
  updateRequiredContrastRatio: (ratio: ContrastRatio) => void;
};

const defaultSettings: SettingsContextValue = {
  baseColor: "",
  updateBaseColor: () => {},
  colorPalette: {},
  accessibleColors: {
    white: {
      index: 0,
      color: "",
      contrast3: "",
      contrast45: "",
      contrast7: "",
      contrastRatioBaseColor: 0,
    },
    black: {
      index: 1000,
      color: "",
      contrast3: "",
      contrast45: "",
      contrast7: "",
      contrastRatioBaseColor: 0,
    },
  },
  requiredContrastRatio: 4.5,
  updateRequiredContrastRatio: () => {},
};

const SettingsContext = createContext<SettingsContextValue>(defaultSettings);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [baseColor, setBaseColor] = useState(defaultSettings.baseColor);
  const [colorPalette, setColorPalette] = useState(
    defaultSettings.colorPalette,
  );
  const [accessibleColors, setAccessibleColors] = useState(
    defaultSettings.accessibleColors,
  );
  const [requiredContrastRatio, setRequiredContrastRatio] =
    useState<ContrastRatio>(defaultSettings.requiredContrastRatio);

  const updateBaseColor = useCallback(
    (color: string, ratio: ContrastRatio) => {
      if (!isValidHexColor(color)) return;

      setBaseColor(color);
      setColorPalette(generateColorPalette(color));
      setAccessibleColors(generateAccessibleColors(color, ratio));

      const params = new URLSearchParams(searchParams);
      params.set("color", color.substring(1));
      params.set("ratio", ratio.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const removeColorParam = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("color");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const updateRequiredContrastRatio = useCallback(
    (ratio: ContrastRatio) => {
      if (!POSSIBLE_CONTRAST_RATIO.includes(ratio)) {
        ratio = POSSIBLE_CONTRAST_RATIO[0];
      }

      setRequiredContrastRatio(ratio);

      const params = new URLSearchParams(searchParams);
      params.set("ratio", ratio.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const resetContrastRatioParam = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("ratio", POSSIBLE_CONTRAST_RATIO[0].toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  useEffect(() => {
    const activeColor = searchParams.get("color");

    if (activeColor && isValidHexColor("#" + activeColor)) {
      updateBaseColor("#" + activeColor, requiredContrastRatio);
    } else {
      removeColorParam();
    }
  }, [requiredContrastRatio, searchParams, updateBaseColor, removeColorParam]);

  useEffect(() => {
    const activeRatioParam = searchParams.get("ratio");
    const activeRatio = activeRatioParam ? Number(activeRatioParam) : null;

    if (
      activeRatio &&
      POSSIBLE_CONTRAST_RATIO.includes(activeRatio as ContrastRatio)
    ) {
      setRequiredContrastRatio(activeRatio as ContrastRatio);
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
        accessibleColors,
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
