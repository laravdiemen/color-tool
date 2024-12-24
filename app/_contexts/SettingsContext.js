"use client";

import { createContext, useState, useContext } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // TODO: Remove fallback color?
  const [inputColor, setInputColor] = useState("#14b8a6");

  // TODO: Add setting to save the selected contrast ratio

  return (
    <SettingsContext.Provider value={{ inputColor, setInputColor }}>
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
