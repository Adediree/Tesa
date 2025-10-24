import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "qucoon-components/style.css";
import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { NiceModalProvider } from "@/components/providers/NiceModalProvider";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

const biome = localFont({
  src: [
    {
      path: "./fonts/Biome-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Biome-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Biome-Semi-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Biome-Semi-Bold-Italic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qucoon Tesa - Learn AI, Data Analytics & Software Engineering",
  description:
    "Master high-quality educational content in Artificial Intelligence, Data Analytics, and Software Engineering through Qucoon's Tesa program.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={biome.className}>
        <ReduxProvider>
          <SettingsProvider>
            <NiceModalProvider>{children}</NiceModalProvider>
          </SettingsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
