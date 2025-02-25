import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/lib/CartContext";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <CartProvider style={{ flex: 1 }}>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
