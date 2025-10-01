// External dependencies
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

// Internal dependencies
import Button from "@/app/_ui/Button";

type CopyCodeProps = {
  handleCopy: () => void;
  button: string;
  code: string;
};

export default function CopyCode({ handleCopy, button, code }: CopyCodeProps) {
  return (
    <div className="relative mb-8 rounded bg-slate-300 p-4 pr-12 dark:bg-slate-800">
      <Button
        className="absolute top-2 right-2 !border-transparent !p-2"
        onClick={handleCopy}
      >
        <DocumentDuplicateIcon className="size-5" />
        <span className="sr-only">{button}</span>
      </Button>

      <code className="text-xs whitespace-pre-wrap sm:text-sm md:text-base">
        {code}
      </code>
    </div>
  );
}
