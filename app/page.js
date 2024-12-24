import ColorPalette from "@/app/_components/ColorPalette";
import ColorInput from "@/app/_components/ColorInput";
import RequiredContrastRatio from "@/app/_components/RequiredContrastRatio";

export default function Page() {
  return (
    <div className="grid grid-cols-[300px_1fr]">
      <div>
        <ColorInput />
        <RequiredContrastRatio />
      </div>
      <ColorPalette />
    </div>
  );
}
