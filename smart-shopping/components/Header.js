"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, QrCode, Sparkles } from "lucide-react";
import { SearchProducts } from "@/components/search-products";
import { CartSheet } from "@/components/cart-sheet";

export function Header() {
  return (
    <div className="container flex h-16 items-center justify-between">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
            Smart Shop
          </span>
        </a>
      </motion.div>
      
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <SearchProducts />
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-300"
          aria-label="Scan QR Code"
        >
          <QrCode className="w-5 h-5" />
        </motion.button>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CartSheet />
        </motion.div>
      </div>
    </div>
  );
}