const defaultClasses = {
  h1: "text-4xl font-bold",
  h2: "text-2xl font-bold",
  h3: "text-xl font-medium",
  h4: "text-lg font-medium",
  h5: "text-base font-medium",
  h6: "text-base font-medium",
};

export default function Heading({ as, className, children }) {
  const HeadingTag = as;
  const defaultClass = defaultClasses[HeadingTag] || "";

  return (
    <HeadingTag className={`${defaultClass} ${className}`}>
      {children}
    </HeadingTag>
  );
}
