// External dependencies
import { type ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function Wrapper({ children, className = "" }: WrapperProps) {
  return (
    <div
      className={`${className} rounded-lg bg-slate-200 p-4 text-slate-950 *:first:mt-0 *:last:mb-0 md:rounded-2xl md:p-6 dark:bg-slate-900 dark:text-slate-300`}
    >
      {children}
    </div>
  );
}
