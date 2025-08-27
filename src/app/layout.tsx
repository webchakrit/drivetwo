import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "DriveTwo - รีวิวรถยนต์",
  description: "รีวิวรถยนต์ไฟฟ้าและรถยนต์ทั่วไป",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${kanit.variable} font-sans antialiased`}
        style={{
          '--color-primary': '#df2531',
          '--color-secondary': '#000000',
          '--color-background': '#ffffff',
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
