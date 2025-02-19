"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Camera, X, RefreshCw, AlertCircle } from "lucide-react";
import { SearchProducts } from "@/components/search-products"
import { ProductGrid } from "@/components/product-grid"
import { CartSheet } from "@/components/cart-sheet"
import { QRScanner } from "@/components/QRScanner"

export function Header() {
    return (
<div className="container flex h-16 items-center justify-between">
          <span className="text-xl font-bold">Smart Shop</span>
          <div className="flex items-center gap-4">
            <SearchProducts />
            <CartSheet />
            <QRScanner variant="navbar" />
          </div>
        </div>
    )
};