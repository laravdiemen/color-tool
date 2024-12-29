"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { generateColorPalette } from "@/app/_lib/colors";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // TODO: Remove fallback color?
  const [inputColor, setInputColor] = useState("#14b8a6");
  const [colorPalette, setColorPalette] = useState({});
  const [requiredContrastRatio, setRequiredContrastRatio] = useState("4.5");

  const updateInputColor = (color) => {
    setInputColor(color);
    setColorPalette(generateColorPalette(color));
  };

  useEffect(() => {
    if (inputColor) {
      setColorPalette(generateColorPalette(inputColor));
    }
  }, [inputColor]);

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
