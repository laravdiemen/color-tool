export default function Wrapper({ children }) {
  return (
    <div className="bg-slate-200 rounded-lg md:rounded-2xl p-4 md:p-6">
      {children}
    </div>
  );
}
