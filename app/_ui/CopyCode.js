import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Button from "@/app/_ui/Button";

export default function CopyCode({ handleCopy, button, code }) {
  return (
    <div className="relative mb-6 rounded bg-slate-300 p-4 pr-15 dark:bg-slate-800">
      <Button
        className="absolute top-2 right-2 !border-transparent !p-2"
        onClick={handleCopy}
      >
        <DocumentDuplicateIcon className="size-5" />
        <span className="sr-only">{button}</span>
      </Button>

      <code className="whitespace-pre-wrap">{code}</code>
    </div>
  );
}
