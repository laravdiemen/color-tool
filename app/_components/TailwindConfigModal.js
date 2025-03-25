"use client";

import { useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useSettings } from "@/app/_contexts/SettingsContext";
import Modal from "@/app/_components/Modal";
import Heading from "@/app/_ui/Heading";
import CopyCode from "@/app/_ui/CopyCode";

export default function TailwindConfigModal() {
  const [tailwindConfigV3, setTailwindConfigV3] = useState();
  const [tailwindConfigV4, setTailwindConfigV4] = useState();
  const { colorPalette } = useSettings();

  useEffect(() => {
    function generateTailwindConfigV3() {
      let config = `primary: {\n\tDEFAULT: '${colorPalette[500].color}',\n`;

      Object.entries(colorPalette).forEach(([key, value]) => {
        if (key === "0" || key === "1000") return;

        config += `\t${key}: '${value.color}',\n`;
      });

      config += "}";

      return config;
    }

    function generateTailwindConfigV4() {
      let config = "";

      config += "--color-primary: var(--color-primary-500);\n";

      Object.entries(colorPalette).forEach(([key, value]) => {
        if (key === "0" || key === "1000") return;

        config += `--color-primary-${key}: ${value.color};\n`;
      });

      return config;
    }

    setTailwindConfigV3(generateTailwindConfigV3());
    setTailwindConfigV4(generateTailwindConfigV4());
  }, [colorPalette]);

  function copyTailwindConfigToClipboard(config, version) {
    try {
      navigator.clipboard.writeText(config);
      toast.success(`Tailwind ${version} config is copied to clipboard`);
    } catch (error) {
      toast.error(`Failed to copy Tailwind ${version} config to clipboard`);
    }
  }

  return (
    <Modal heading="Get Tailwind config" button="Get config">
      <Heading as="h3" className="mb-4">
        Tailwind v4 config
      </Heading>
      <CopyCode
        handleCopy={() => copyTailwindConfigToClipboard(tailwindConfigV4, "v4")}
        button="Copy tailwind v4 config"
        code={tailwindConfigV4}
      />

      <Heading as="h3" className="mb-4">
        Tailwind v3 config
      </Heading>
      <CopyCode
        handleCopy={() => copyTailwindConfigToClipboard(tailwindConfigV3, "v3")}
        button="Copy tailwind v3 config"
        code={tailwindConfigV3}
      />
    </Modal>
  );
}
