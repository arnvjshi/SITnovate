"use client"

import { useEffect, useState } from "react"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CartSheet() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const handleAddToCart = (event) => {
      const product = event.detail
      setCart((current) => {
        const existing = current.find((item) => item.id === product.id)
        if (existing) {
          return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        }
        return [...current, { ...product, quantity: 1 }]
      })
    }

    window.addEventListener("add-to-cart", handleAddToCart)
    return () => window.removeEventListener("add-to-cart", handleAddToCart)
  }, [])

  const updateQuantity = (productId, delta) => {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta
            return newQuantity < 1 ? null : { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(Boolean),
    )
  }

  const removeItem = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Open cart</span>
          {itemCount > 0 && (
            <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {itemCount}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

