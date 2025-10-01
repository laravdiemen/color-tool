// External dependencies
import { type ReactNode } from "react";

type ButtonProps = {
  className?: string;
  isActive?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function Button({
  className = "",
  isActive = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`${className} ${isActive ? "bg-slate-400 dark:bg-slate-50 dark:text-slate-950" : ""} hocus:bg-slate-400 dark:hocus:bg-slate-50 dark:hocus:text-slate-950 cursor-pointer rounded border border-slate-400 px-3 py-2 transition-colors active:scale-95 dark:border-slate-50`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
