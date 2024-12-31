export default function Wrapper({ children }) {
  return (
    <div className="rounded-lg bg-slate-200 p-4 md:rounded-2xl md:p-6">
      {children}
    </div>
  );
}
