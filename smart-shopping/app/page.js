import { SearchProducts } from "@/components/search-products"
import { ProductGrid } from "@/components/product-grid"
import { CartSheet } from "@/components/cart-sheet"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <title>Smart Shop</title>
      <meta name="description" content="Smart Shop" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
        <div className="container flex h-16 items-center justify-between">
          <span className="text-xl font-bold">Smart Shop</span>
          <div className="flex items-center gap-4">
            <SearchProducts />
            <CartSheet />
          </div>
        </div>
      </header>
      <main className="container py-6">
        <ProductGrid />
      </main>
    </div>
  )
}

