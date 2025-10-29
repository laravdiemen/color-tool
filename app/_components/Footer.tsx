export default function Footer() {
  return (
    <footer className="pt-2 md:pt-4">
      <p className="mb-0 text-center text-sm text-slate-500">
        Built with <span className="sr-only">love</span>
        <span aria-hidden="true">❤️</span> by{" "}
        <a
          href="https://github.com/laravdiemen"
          target="_blank"
          rel="noopener noreferrer"
        >
          @laravdiemen
          <span className="sr-only">, opens in new tab</span>
        </a>{" "}
        <span className="mx-1">•</span> Check out the source code on{" "}
        <a
          href="https://github.com/laravdiemen/color-tool"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <span className="sr-only">, opens in new tab</span>
        </a>{" "}
        <span aria-hidden="true">👀</span>
      </p>
    </footer>
  );
}
