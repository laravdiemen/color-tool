export default function Wrapper({ children, className }) {
  return (
    <div
      className={`${className} rounded-lg bg-slate-200 p-4 md:rounded-2xl md:p-6`}
    >
      {children}
    </div>
  );
}
