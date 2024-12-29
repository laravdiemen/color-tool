import ColorPalette from "@/app/_components/ColorPalette";
import ColorInput from "@/app/_components/ColorInput";
import RequiredContrastRatio from "@/app/_components/RequiredContrastRatio";
import ColorContrast from "@/app/_components/ColorContrast";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <ColorInput />
      <RequiredContrastRatio />
      <ColorPalette />
      <ColorContrast />
    </div>
  );
}
