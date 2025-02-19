"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { products, categories } from "@/lib/data"

export function ProductGrid() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  const filteredProducts = products
    .filter((product) => (selectedCategory === "All" ? true : product.category === selectedCategory))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return a.name.localeCompare(b.name) // default sort by name
    })

  const addToCart = async (product) => {
    setLoading(true)
    try {
      // Simulate adding to cart
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.dispatchEvent(new CustomEvent("add-to-cart", { detail: product }))
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
        <select
          className="w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative rounded-lg border p-4 hover:shadow-lg transition-shadow">
            <div className="aspect-square relative mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm text-muted-foreground">{product.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold">${product.price}</span>
                <Button size="sm" onClick={() => addToCart(product)} disabled={loading}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

