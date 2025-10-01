// External dependencies
import { type ReactNode } from "react";

type HeadingProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: ReactNode;
};

const defaultClasses = {
  h1: "text-4xl font-bold",
  h2: "text-2xl font-bold",
  h3: "text-xl font-medium",
  h4: "text-lg font-medium",
  h5: "text-base font-medium",
  h6: "text-base font-medium",
};

export default function Heading({
  as,
  className = "",
  children,
}: HeadingProps) {
  const HeadingTag = as;
  const defaultClass = defaultClasses[HeadingTag] || "";

  return (
    <HeadingTag className={`${defaultClass} ${className}`}>
      {children}
    </HeadingTag>
  );
}
