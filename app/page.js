"use client";

import { useEffect } from "react";
import AccessibleColorAlternatives from "@/app/_components/AccessibleColorAlternatives";
import ContrastRatioPalette from "@/app/_components/ContrastRatioPalette";
import ColorInput from "@/app/_components/ColorInput";
import TailwindColorPalette from "@/app/_components/TailwindColorPalette";
import Heading from "@/app/_ui/Heading";
import { BODY_CLASS_TABBING } from "@/app/_lib/constants";

export default function Page() {
  useEffect(() => {
    const handleTab = (e) => {
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
    <>
      <Heading as="h1">Color Tool</Heading>

      <ColorInput />

      <TailwindColorPalette />

      <ContrastRatioPalette />

      <AccessibleColorAlternatives />
    </>
  );
}
