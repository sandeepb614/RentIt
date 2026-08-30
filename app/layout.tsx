import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { businessInfo } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: `${businessInfo.name} | Party & Event Rentals`,
  description:
    "Browse our catalog of props, Indian furniture, and party rentals — build a list of what you need and request a quote.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
