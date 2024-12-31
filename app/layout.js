import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "@/app/_contexts/SettingsContext";
import "@/app/_styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Color Tool",
    default: "Welcome | Color Tool",
  },
  description: "Generated colors for your next project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased bg-slate-50`}>
        <main className="px-4 py-6 md:py-8 max-w-screen-md xl:max-w-screen-xl mx-auto flex flex-col gap-4">
          <SettingsProvider>{children}</SettingsProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                iconTheme: {
                  primary: "#15803d", // Tailwind green 700
                  secondary: "#FFF",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626", // Tailwind red 600
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
