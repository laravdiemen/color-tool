import ColorContrast from "@/app/_components/ColorContrast";
import ColorInput from "@/app/_components/ColorInput";
import ColorPalette from "@/app/_components/ColorPalette";
import RequiredContrastRatio from "@/app/_components/RequiredContrastRatio";
import Wrapper from "@/app/_ui/Wrapper";
import Heading from "@/app/_ui/Heading";

export default function Page() {
  return (
    <>
      <Heading as="h1">Color Tool</Heading>

      <Wrapper>
        <div className="flex flex-wrap items-center gap-4">
          <Heading as="h2">Add your base color:</Heading>
          <ColorInput />
        </div>
      </Wrapper>

      <Wrapper>
        <Heading as="h2" className="mb-4">
          Tailwind color palette
        </Heading>
        <ColorPalette />
      </Wrapper>

      <Wrapper>
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <Heading as="h2">Add your base color:</Heading>
          <RequiredContrastRatio />
        </div>
        <ColorContrast />
      </Wrapper>
    </>
  );
}
