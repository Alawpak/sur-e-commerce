import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { codecCold, codecWarm, epoch } from "../fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBody } from "@/components/layout/PageBody";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Preloader } from "@/components/layout/Preloader";
import { MEDIA } from "@/lib/cloudinary";
import "../globals.css";

export const metadata: Metadata = {
  title: "SURCYCLE — SS/26",
  description: "Engineered apparel for high-output training.",
  icons: {
    icon: "/favicon-logo.png",
    shortcut: "/favicon-logo.png",
    apple: "/favicon-logo.png",
  },
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
        <PageBody>{children}</PageBody>
        <Footer />
        <CartDrawer />
        <Preloader imageSrc={MEDIA.loadingImage} videoSrc={MEDIA.brandFilm} />
        <Analytics />
      </body>
    </html>
  );
}
