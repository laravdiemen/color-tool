export default function Button({
  className,
  isActive = false,
  handleClick,
  children,
}) {
  return (
    <button
      className={`${className} ${isActive ? "bg-slate-400" : ""} hocus:bg-slate-400 cursor-pointer rounded border border-slate-400 px-3 py-2 transition-colors active:scale-95`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
