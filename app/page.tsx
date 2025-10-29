"use client";

// External dependencies
import { useEffect } from "react";

// Internal dependencies
import AccessibleColorAlternatives from "@/app/_components/AccessibleColorAlternatives";
import ContrastRatioPalette from "@/app/_components/ContrastRatioPalette";
import ColorInput from "@/app/_components/ColorInput";
import Footer from "@/app/_components/Footer";
import GenerateShade from "@/app/_components/GenerateShade";
import TailwindColorPalette from "@/app/_components/TailwindColorPalette";
import { SettingsProvider } from "@/app/_contexts/SettingsContext";
import Heading from "@/app/_ui/Heading";
import { BODY_CLASS_TABBING } from "@/app/_lib/constants";

export default function Page() {
  useEffect(() => {
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      document.body.classList.add(BODY_CLASS_TABBING);
    };

    const handleMouseDown = () => {
      document.body.classList.remove(BODY_CLASS_TABBING);
    };

    window.addEventListener("keydown", handleTab);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleTab);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <SettingsProvider>
      <Heading as="h1">Color Tool</Heading>

      <ColorInput />

      <TailwindColorPalette />

      <GenerateShade background={255} />

      <GenerateShade background={0} />

      <ContrastRatioPalette />

      <AccessibleColorAlternatives />

      <Footer />
    </SettingsProvider>
  );
}
