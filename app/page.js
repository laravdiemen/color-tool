import AccessibleColorAlternatives from "@/app/_components/AccessibleColorAlternatives";
import ContrastRatioPalette from "@/app/_components/ContrastRatioPalette";
import ColorInput from "@/app/_components/ColorInput";
import TailwindColorPalette from "@/app/_components/TailwindColorPalette";
import Heading from "@/app/_ui/Heading";

export default function Page() {
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
