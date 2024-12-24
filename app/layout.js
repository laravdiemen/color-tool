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
      <body className={`${roboto.variable} font-sans antialiased`}>
        <main>
          <SettingsProvider>{children}</SettingsProvider>
        </main>
      </body>
    </html>
  );
}
