import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "KR Mozo",
  description: "Just a collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen justify-center gap-8`}>{children}</body>
    </html>
  );
}
