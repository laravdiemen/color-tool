"use client";

// External dependencies
import { useEffect } from "react";

// Internal dependencies
import { SettingsProvider } from "@/app/_contexts/SettingsContext";
import { BODY_CLASS_TABBING } from "@/app/_lib/constants";
import AccessibleColorAlternatives from "@/app/_sections/AccessibleColorAlternatives";
import AddBaseColor from "@/app/_sections/AddBaseColor";
import ContrastRatioChecker from "@/app/_sections/ContrastRatioChecker";
import ContrastRatioPalette from "@/app/_sections/ContrastRatioPalette";
import Footer from "@/app/_sections/Footer";
import GenerateShade from "@/app/_sections/GenerateShade";
import TailwindColorPalette from "@/app/_sections/TailwindColorPalette";
import Heading from "@/app/_ui/Heading";

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

      <AddBaseColor />

      <TailwindColorPalette />

      <GenerateShade background={255} />

      <GenerateShade background={0} />

      <ContrastRatioPalette />

      <AccessibleColorAlternatives />

      <ContrastRatioChecker />

      <Footer />
    </SettingsProvider>
  );
}
