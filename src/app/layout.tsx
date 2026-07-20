import type { Metadata } from "next";
import { Libre_Bodoni, Manrope } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const libreBodoni = Libre_Bodoni({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soulmate — Footwear for the Woman Who Walks Her Own Path",
  description:
    "Soulmate crafts premium women's footwear that feels like it was made just for you. Designed in Paris, made with soul. Discover your perfect pair.",
  keywords: [
    "women's footwear",
    "premium shoes",
    "luxury footwear",
    "soulmate shoes",
    "handcrafted shoes",
    "Italian footwear",
  ],
  openGraph: {
    title: "Soulmate — Footwear for the Woman Who Walks Her Own Path",
    description:
      "Premium women's footwear crafted between Paris design and Milanese artistry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBodoni.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-body">
        <LenisProvider />
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />

        {/* Speculation Rules — instant prerender on hover intent */}
        <script
          type="speculationrules"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: { href_matches: "/*" },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}