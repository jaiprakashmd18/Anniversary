import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jai Prakash ❤️ Meenu | Anniversary",
  description: "A celebration of 3 beautiful years of love between Jai Prakash and Meenu. Since December 26, 2022.",
  keywords: ["anniversary", "love", "celebration", "Jai Prakash", "Meenu"],
  openGraph: {
    title: "Jai Prakash ❤️ Meenu | Anniversary",
    description: "A celebration of 3 beautiful years of love",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background text-white antialiased">
        {children}
      </body>
    </html>
  );
}
