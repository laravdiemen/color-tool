import ColorContrast from "@/app/_components/ColorContrast";
import ColorInput from "@/app/_components/ColorInput";
import ColorPalette from "@/app/_components/ColorPalette";
import RequiredContrastRatio from "@/app/_components/RequiredContrastRatio";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-4xl">Color Tool</h1>

      <div className="bg-slate-200 rounded-lg md:rounded-2xl p-4 md:p-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">Add your base color:</h2>
          <ColorInput />
        </div>
      </div>

      <div className="bg-slate-200 rounded-lg md:rounded-2xl p-4 md:p-6">
        <h2 className="font-bold text-2xl mb-4">Tailwind color palette</h2>
        <ColorPalette />
      </div>

      <div className="bg-slate-200 rounded-lg md:rounded-2xl p-4 md:p-6">
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <h2 className="font-bold text-2xl">Contrast ratio with base color</h2>
          <RequiredContrastRatio />
        </div>
        <ColorContrast />
      </div>
    </>
  );
}
