import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";

export const viewport: Viewport = {
  themeColor: "#04374D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Innovative Engineering, Reliable Delivery | Afroportico Integrated Services Limited",
  description:
    "Engineering, Procurement and Contracting across Mechanical, Electrical, Refrigeration and Air-Conditioning, Facility Management and Telecoms. Delivered to international standards with a strong HSE culture.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_DOMAIN || "https://afroportico.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
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
    title: "Innovative Engineering, Reliable Delivery | Afroportico Integrated Services Limited",
    description:
      "Engineering, Procurement and Contracting across Mechanical, Electrical, Refrigeration and Air-Conditioning, Facility Management and Telecoms.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('js-ready');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#2BC194] selection:text-[#04374D]">
        <ScrollAnimationProvider>
          {children}
        </ScrollAnimationProvider>
      </body>
    </html>
  );
}
