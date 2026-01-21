import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartProvider from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Serendia Gems - The Heart of Ceylon",
  description: "Ethically mined, expertly cut. Discover the world's finest Sapphires directly from the source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans bg-[#0b0f19] text-white antialiased overflow-x-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
