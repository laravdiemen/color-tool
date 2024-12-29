import { Roboto } from "next/font/google";
import { SettingsProvider } from "@/app/_contexts/SettingsContext";
import "@/app/_styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Color Generator",
    default: "Welcome | Color Generator",
  },
  description: "Generated colors for your next project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased bg-slate-50`}>
        <main className="p-4 max-w-screen-xl mx-auto flex flex-col gap-4">
          <SettingsProvider>{children}</SettingsProvider>
        </main>
      </body>
    </html>
  );
}
