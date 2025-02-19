"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchProducts() {
  const handleSearch = (e) => {
    // Dispatch a custom event for product filtering
    window.dispatchEvent(
      new CustomEvent("search-products", {
        detail: e.target.value,
      }),
    )
  }

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search products..." className="pl-8" onChange={handleSearch} />
    </div>
  )
}

