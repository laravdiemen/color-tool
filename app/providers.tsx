"use client";

// External dependencies
import { type ReactNode } from "react";
import { ThemeProvider } from "next-themes";

// Internal dependencies
import { SettingsProvider } from "@/app/_contexts/SettingsContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SettingsProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SettingsProvider>
  );
}
