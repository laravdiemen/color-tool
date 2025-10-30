"use client";

// External dependencies
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// Internal dependencies
import ColorPickerInput from "@/app/_components/ColorPickerInput";
import ColorTextInput from "@/app/_components/ColorTextInput";
import { useSettings } from "@/app/_contexts/SettingsContext";
import { calculateContrastRatio, isValidHexColor } from "@/app/_lib/colors";
import { POSSIBLE_CONTRAST_RATIO } from "@/app/_lib/constants";
import Heading from "@/app/_ui/Heading";
import Wrapper from "@/app/_ui/Wrapper";

export default function ContrastRatioChecker() {
  const [contrastRatio, setContrastRatio] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [foregroundColor, setForegroundColor] = useState("");
  const { baseColor } = useSettings();

  useEffect(() => {
    if (baseColor && backgroundColor === "") {
      handleOnChangeBackgroundColor(baseColor);
    }

    if (baseColor && foregroundColor === "") {
      setForegroundColor("ffffff");
    }
  }, [baseColor, backgroundColor, foregroundColor]);

  useEffect(() => {
    if (
      isValidHexColor("#" + backgroundColor) &&
      isValidHexColor("#" + foregroundColor)
    ) {
      const contrastRatio = calculateContrastRatio(
        "#" + backgroundColor,
        "#" + foregroundColor,
      );
      setContrastRatio(contrastRatio);
    }
  }, [backgroundColor, foregroundColor]);

  function handleOnChangeBackgroundColor(value: string) {
    const valueWithoutHash = value.startsWith("#") ? value.slice(1) : value;
    setBackgroundColor(valueWithoutHash);
  }

  function handleOnChangeForegroundColor(value: string) {
    const valueWithoutHash = value.startsWith("#") ? value.slice(1) : value;
    setForegroundColor(valueWithoutHash);
  }

  if (!baseColor) return;

  return (
    <Wrapper>
      <Heading as="h2" className="mb-6">
        Check contrast between two colors
      </Heading>

      <div className="flex flex-col flex-wrap gap-x-20 gap-y-10 sm:flex-row">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-4">
            <ColorTextInput
              label="Background color"
              showLabel={true}
              value={backgroundColor}
              setValue={handleOnChangeBackgroundColor}
            />
            <ColorPickerInput
              value={"#" + backgroundColor}
              setValue={handleOnChangeBackgroundColor}
            />
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <ColorTextInput
              label="Foreground color"
              showLabel={true}
              value={foregroundColor}
              setValue={handleOnChangeForegroundColor}
            />
            <ColorPickerInput
              value={"#" + foregroundColor}
              setValue={handleOnChangeForegroundColor}
            />
          </div>
        </div>

        {backgroundColor && foregroundColor && (
          <div className="flex items-center">
            <div
              className="flex size-30 items-center justify-center rounded-sm md:size-38"
              style={{
                backgroundColor: "#" + backgroundColor,
                color: "#" + foregroundColor,
              }}
            >
              <p className="mb-0 text-2xl md:text-3xl">{contrastRatio}:1</p>
            </div>
          </div>
        )}

        {backgroundColor && foregroundColor && contrastRatio && (
          <div>
            <Heading as="h3" className="mb-2 !text-base">
              Passes contrast ratio
            </Heading>
            <ul>
              {POSSIBLE_CONTRAST_RATIO.map((ratio) => {
                const passes = contrastRatio >= ratio;
                return (
                  <li
                    key={ratio}
                    className="mb-2 grid grid-cols-[80px_1fr] items-center"
                  >
                    <span className="text-lg font-bold">{ratio}:1</span>
                    <div
                      className={`inline-flex size-8 items-center justify-center rounded-full ${passes ? "bg-green-700 text-white" : "bg-red-600 text-white"}`}
                    >
                      {passes ? (
                        <>
                          <CheckIcon className="size-4" />
                          <span className="sr-only">Passes</span>
                        </>
                      ) : (
                        <>
                          <XMarkIcon className="size-4" />
                          <span className="sr-only">Fails</span>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
