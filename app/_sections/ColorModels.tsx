"use client";

// External dependencies
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

// Internal dependencies
import { useSettings } from "@/app/_contexts/SettingsContext";
import {
  convertHexToCmyk,
  convertHexToHsl,
  convertHexToRgb,
} from "@/app/_lib/colors";
import Button from "@/app/_ui/Button";
import Heading from "@/app/_ui/Heading";
import Wrapper from "@/app/_ui/Wrapper";

export default function ColorModels() {
  const { baseColor } = useSettings();

  if (!baseColor) return;

  const rgbColor = convertHexToRgb(baseColor);
  const rgbColorString = rgbColor
    ? `${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}`
    : "";

  const cmykColor = convertHexToCmyk(baseColor);
  const cmykColorString = cmykColor
    ? `${cmykColor.cyan}%, ${cmykColor.magenta}%, ${cmykColor.yellow}%, ${cmykColor.key}%`
    : "";

  const hslColor = convertHexToHsl(baseColor);
  const hslColorString = hslColor
    ? `${hslColor.hue}°, ${hslColor.saturation}%, ${hslColor.lightness}%`
    : "";

  const models = [
    { name: "HEX", value: baseColor },
    { name: "RGB", value: rgbColorString },
    { name: "CMYK", value: cmykColorString },
    { name: "HSL", value: hslColorString },
  ];

  function copyToClipboard(string: string, model: string) {
    try {
      navigator.clipboard.writeText(string);
      toast.success(`${model} is copied to clipboard`);
    } catch {
      toast.error(`Failed to copy ${model} to clipboard`);
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" className="mb-6">
        Other color models
      </Heading>

      <div className="flex flex-col flex-wrap gap-x-8 gap-y-4 md:flex-row lg:gap-x-16">
        {models.map((model) =>
          model.value ? (
            <p key={model.name} className="mb-0 flex items-center">
              <span className="font-bold">{model.name}:</span>
              <span className="mx-2">{model.value}</span>
              <Button
                className="border-transparent! p-2!"
                onClick={() => copyToClipboard(model.value, model.name)}
              >
                <DocumentDuplicateIcon className="size-5" />
                <span className="sr-only">Copy {model.name}</span>
              </Button>
            </p>
          ) : null,
        )}
      </div>
    </Wrapper>
  );
}
