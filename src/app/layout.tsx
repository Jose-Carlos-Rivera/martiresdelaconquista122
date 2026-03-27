import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Terreno en Venta | Mártires de la Conquista 122, Escandón CDMX",
  description:
    "Terreno de 501 m² con uso de suelo habitacional en Escandón, Miguel Hidalgo, CDMX. Hasta 5 niveles, 1,794 m² construibles. Oportunidad de inversión premium.",
  keywords: [
    "terreno en venta",
    "Escandón",
    "CDMX",
    "inversión inmobiliaria",
    "uso de suelo habitacional",
    "Miguel Hidalgo",
    "desarrollo inmobiliario",
  ],
  openGraph: {
    title: "Terreno en Venta | Mártires de la Conquista 122, Escandón",
    description:
      "501 m² | Uso de suelo H/5/30/A | Hasta 5 niveles | 1,794 m² construibles | $18,500,000 MXN",
    type: "website",
    locale: "es_MX",
    url: "https://martiresdelaconquista122.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
