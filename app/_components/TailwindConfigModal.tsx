"use client";

// External dependencies
import { useMemo } from "react";
import toast from "react-hot-toast";

// Internal dependencies
import Modal from "@/app/_components/Modal";
import { useSettings } from "@/app/_contexts/SettingsContext";
import CopyCode from "@/app/_ui/CopyCode";
import Heading from "@/app/_ui/Heading";

export default function TailwindConfigModal() {
  const { colorPalette } = useSettings();

  const tailwindConfigV3 = useMemo(() => {
    let config = `primary: {\n\tDEFAULT: '${colorPalette[500].color}',\n`;

    Object.entries(colorPalette).forEach(([key, value]) => {
      if (key === "0" || key === "1000") return;

      config += `\t${key}: '${value.color}',\n`;
    });

    config += "}";

    return config;
  }, [colorPalette]);

  const tailwindConfigV4 = useMemo(() => {
    let config = "";

    config += "--color-primary: var(--color-primary-500);\n";

    Object.entries(colorPalette).forEach(([key, value]) => {
      if (key === "0" || key === "1000") return;

      config += `--color-primary-${key}: ${value.color};\n`;
    });

    return config;
  }, [colorPalette]);

  function copyTailwindConfigToClipboard(config: string, version: string) {
    try {
      navigator.clipboard.writeText(config);
      toast.success(`Tailwind ${version} config is copied to clipboard`);
    } catch {
      toast.error(`Failed to copy Tailwind ${version} config to clipboard`);
    }
  }

  return (
    <Modal>
      <Modal.ModalButton>Get config</Modal.ModalButton>
      <Modal.ModalDialog title="Get Tailwind config">
        <Heading as="h3" className="mb-4">
          Tailwind v4 config
        </Heading>
        <CopyCode
          handleCopy={() =>
            copyTailwindConfigToClipboard(tailwindConfigV4, "v4")
          }
          button="Copy tailwind v4 config"
          code={tailwindConfigV4}
        />

        <Heading as="h3" className="mb-4">
          Tailwind v3 config
        </Heading>
        <CopyCode
          handleCopy={() =>
            copyTailwindConfigToClipboard(tailwindConfigV3, "v3")
          }
          button="Copy tailwind v3 config"
          code={tailwindConfigV3}
        />
      </Modal.ModalDialog>
    </Modal>
  );
}
