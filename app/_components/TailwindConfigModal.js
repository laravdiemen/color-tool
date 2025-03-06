"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useSettings } from "@/app/_contexts/SettingsContext";
import Modal from "@/app/_components/Modal";
import Button from "@/app/_ui/Button";

export default function TailwindConfigModal() {
  const [tailwindConfig, setTailwindConfig] = useState();
  const { colorPalette } = useSettings();

  useEffect(() => {
    let config = Object.entries(colorPalette).reduce((acc, [key, value]) => {
      if (key === "0" || key === "1000") return acc;

      return (acc += `--color-primary-${key}: ${value.color};\n`);
    }, "");

    config += "--color-primary: var(--color-primary-500);";

    setTailwindConfig(config);
  }, [colorPalette]);

  function copyTailwindConfigToClipboard() {
    try {
      navigator.clipboard.writeText(tailwindConfig);
      toast.success("Tailwind v4 config is copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy Tailwind v4 config to clipboard");
    }
  }

  return (
    <Modal heading="Get Tailwind v4 config" button="Get config">
      <div className="relative rounded bg-slate-300 p-4 pr-15 dark:bg-slate-800">
        <Button
          className="absolute top-2 right-2 !border-transparent !p-2"
          onClick={copyTailwindConfigToClipboard}
        >
          <DocumentDuplicateIcon className="size-5" />
          <span className="sr-only">Copy tailwind v4 config</span>
        </Button>

        <code className="whitespace-pre-line">{tailwindConfig}</code>
      </div>
    </Modal>
  );
}
