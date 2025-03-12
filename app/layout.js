import { Suspense } from "react";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: { template: "%s | Color Tool", default: "Welcome | Color Tool" },
  description: "Generated colors for your next project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} bg-slate-50 font-sans text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50`}
      >
        <main className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6 *:col-span-12 md:py-8">
          <Suspense>{children}</Suspense>

          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                iconTheme: {
                  primary: "oklch(0.527 0.154 150.069)", // Tailwind green 700
                  secondary: "#FFF",
                },
              },
              error: {
                iconTheme: {
                  primary: "oklch(0.577 0.245 27.325)", // Tailwind red 600
                  secondary: "#FFF",
                },
              },
            }}
          />
        </main>
      </body>
    </html>
  );
}
