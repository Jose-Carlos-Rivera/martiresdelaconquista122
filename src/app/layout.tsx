import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a1929",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Terreno en Venta | Mártires de la Conquista 122, Escandón CDMX",
  description:
    "Terreno de 501 m² con uso de suelo habitacional (H/5/30/A) en Escandón I Sección, Miguel Hidalgo, CDMX. Hasta 5 niveles, 1,794 m² construibles. Precio: $18,500,000 MXN. Oportunidad de inversión premium.",
  keywords: [
    "terreno en venta",
    "terreno Escandón",
    "terreno CDMX",
    "inversión inmobiliaria México",
    "uso de suelo habitacional",
    "Miguel Hidalgo terreno",
    "desarrollo inmobiliario CDMX",
    "terreno 501 m2",
    "Mártires de la Conquista",
    "terreno 5 niveles",
  ],
  authors: [{ name: "Marisol Ramos Inmobiliaria" }],
  robots: "index, follow",
  openGraph: {
    title: "Terreno en Venta | Mártires de la Conquista 122, Escandón CDMX",
    description:
      "501 m² | Uso de suelo H/5/30/A | Hasta 5 niveles | 1,794 m² construibles | $18,500,000 MXN",
    type: "website",
    locale: "es_MX",
    url: "https://martiresdelaconquista122.com",
    siteName: "Mártires de la Conquista 122",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terreno en Venta | Escandón CDMX — 501 m²",
    description:
      "Uso de suelo habitacional, 5 niveles, 1,794 m² construibles. $18,500,000 MXN",
  },
  alternates: {
    canonical: "https://martiresdelaconquista122.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
