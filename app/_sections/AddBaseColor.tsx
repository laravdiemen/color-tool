"use client";

// External dependencies
import { useEffect, useState } from "react";

// Internal dependencies
import ColorPickerInput from "@/app/_components/ColorPickerInput";
import ColorTextInput from "@/app/_components/ColorTextInput";
import { useSettings } from "@/app/_contexts/SettingsContext";
import { isValidHexColor } from "@/app/_lib/colors";
import Wrapper from "@/app/_ui/Wrapper";
import Heading from "@/app/_ui/Heading";

export default function AddBaseColor() {
  const [colorTextInput, setColorTextInput] = useState("");
  const [colorPickerInput, setColorPickerInput] = useState("");
  const { baseColor, updateBaseColor, requiredContrastRatio } = useSettings();

  useEffect(() => {
    if (baseColor) {
      setColorTextInput(baseColor.substring(1));
      setColorPickerInput(baseColor);
    }
  }, [baseColor]);

  function handleOnChangeColor(value: string) {
    setColorTextInput(value);

    if (isValidHexColor("#" + value)) {
      updateBaseColor("#" + value, requiredContrastRatio);
    }
  }

  function handleColorPickerInput(value: string) {
    setColorPickerInput(value);

    if (isValidHexColor(value)) {
      updateBaseColor(value, requiredContrastRatio);
    }
  }

  return (
    <Wrapper>
      <div className="flex flex-wrap items-center gap-4">
        <Heading as="h2">Add your base color:</Heading>

        <ColorTextInput value={colorTextInput} setValue={handleOnChangeColor} />

        <ColorPickerInput
          value={colorPickerInput}
          setValue={handleColorPickerInput}
        />
      </div>
    </Wrapper>
  );
}
