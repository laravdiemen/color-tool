import ColorContrast from "@/app/_components/ColorContrast";
import ColorInput from "@/app/_components/ColorInput";
import ColorPalette from "@/app/_components/ColorPalette";
import RequiredContrastRatio from "@/app/_components/RequiredContrastRatio";
import Wrapper from "@/app/_ui/Wrapper";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-4xl">Color Tool</h1>

      <Wrapper>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-bold text-2xl">Add your base color:</h2>
          <ColorInput />
        </div>
      </Wrapper>

      <Wrapper>
        <h2 className="font-bold text-2xl mb-4">Tailwind color palette</h2>
        <ColorPalette />
      </Wrapper>

      <Wrapper>
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <h2 className="font-bold text-2xl">Contrast ratio with base color</h2>
          <RequiredContrastRatio />
        </div>
        <ColorContrast />
      </Wrapper>
    </>
  );
}
