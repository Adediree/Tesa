import "qucoon-components/style.css";
import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { NiceModalProvider } from "@/components/providers/NiceModalProvider";

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
      <body>
        <ReduxProvider>
          <SettingsProvider>
            <NiceModalProvider>{children}</NiceModalProvider>
          </SettingsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
