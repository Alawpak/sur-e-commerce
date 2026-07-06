import type { Metadata } from "next";
import { codecCold, codecWarm, epoch } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "SURCYCLE — SS/26",
  description: "Engineered apparel for high-output training.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${epoch.variable} ${codecCold.variable} ${codecWarm.variable}`}
    >
      <body>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
