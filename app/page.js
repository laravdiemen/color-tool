import ColorPalette from "@/app/_components/ColorPalette";
import ColorInput from "@/app/_components/ColorInput";

export default function Page() {
  return (
    <div className="grid grid-cols-[300px_1fr]">
      <ColorInput />
      <ColorPalette />
    </div>
  );
}
