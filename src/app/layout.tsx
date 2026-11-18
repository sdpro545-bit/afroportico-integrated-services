import type { Metadata, Viewport } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";

export const viewport: Viewport = {
  themeColor: "#04374D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Afroportico Integrated Services Limited | Engineering, Procurement & Contracting",
  description:
    "Integrated services from Warri, Delta State. Engineering, procurement and contracting across mechanical, electrical, refrigeration and air conditioning, facility management and telecoms.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_DOMAIN || "https://afroportico.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false, // Protected during domain-pending mode per Section 2.2b
    follow: false,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Afroportico Integrated Services Limited",
    description:
      "Engineering, procurement and contracting across mechanical, electrical, facility management, and oil & gas services in Nigeria.",
    url: "/",
    siteName: "Afroportico Integrated Services Limited",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Afroportico Integrated Services Limited",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#2BC194] selection:text-[#04374D]">
        <Preloader />
        <ScrollAnimationProvider>
          {children}
        </ScrollAnimationProvider>
      </body>
    </html>
  );
}
