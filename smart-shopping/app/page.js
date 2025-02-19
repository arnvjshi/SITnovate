import { SearchProducts } from "@/components/search-products"
import { ProductGrid } from "@/components/product-grid"
import { CartSheet } from "@/components/cart-sheet"
import { QRScanner } from "@/components/QRScanner"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <title>Smart Shop</title>
      <meta name="description" content="Smart Shop" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
        <Header />
      </header>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scan Product QR Code</h1>
      <QRScanner variant="homepage"/>
      </div>
      <main className="container py-6">
        <ProductGrid />
      </main>
      <footer><Footer /></footer>
      
    </div>
  )
};

