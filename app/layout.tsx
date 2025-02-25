import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/lib/CartContext";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
