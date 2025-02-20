"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ShoppingCart, Search, QrCode, QrCodeIcon, Sparkles, Tag, Zap } from "lucide-react";
import { SearchProducts } from "@/components/search-products";
import { ProductGrid } from "@/components/product-grid";
import { CartSheet } from "@/components/cart-sheet";
import { QRScanner } from "@/components/QRScanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Dynamic Loading Screen with branded colors
const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white z-50"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ 
        scale: [0.8, 1.2, 0.8],
        rotate: 360,
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      <ShoppingCart className="w-24 h-24 text-white" />
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
    <motion.p
      className="mt-8 text-3xl font-bold tracking-tight text-white"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <span className="text-yellow-400">Smart</span> Shop
    </motion.p>
  </motion.div>
);

// Eye-catching feature card with vibrant e-commerce colors
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    whileHover={{ 
      y: -10, 
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
      scale: 1.02
    }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 border-b-4 ${color}`}
  >
    <div className={`${color.replace('border', 'bg').replace('-400', '-100')} dark:bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto`}>
      <Icon className={`w-10 h-10 ${color.replace('border', 'text')}`} />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">{description}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`mt-6 py-2 px-4 rounded-full text-sm ${color.replace('border', 'bg')} text-white flex items-center justify-center mx-auto`}
    >
      Learn More
      <Zap className="w-4 h-4 ml-2" />
    </motion.button>
  </motion.div>
);

// Dynamic sale badge component
const SaleBadge = () => (
  <motion.div
    initial={{ rotate: -10, scale: 0.9 }}
    animate={{ 
      rotate: [0, -5, 0],
      scale: [0.9, 1, 0.9]
    }}
    transition={{ 
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    className="absolute -top-6 -right-6 bg-gradient-to-br from-red-500 to-pink-600 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg z-10"
  >
    <span className="text-xs">UP TO</span>
    <span className="text-xl font-bold">50%</span>
    <span className="text-xs">OFF</span>
  </motion.div>
);

// Enhanced animated button
const AnimatedButton = ({ children, className, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
    whileTap={{ scale: 0.95 }}
    className={`py-3 px-6 rounded-full font-medium flex items-center justify-center ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

// Animated icon button with tooltip
const IconButton = ({ icon: Icon, onClick, label, color = "text-gray-700 dark:text-gray-200" }) => (
  <motion.button
    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
    whileTap={{ scale: 0.9 }}
    className={`p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group ${color}`}
    onClick={onClick}
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileHover={{ opacity: 1, y: 0 }}
      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20"
    >
      {label}
    </motion.span>
  </motion.button>
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!theme) {
      setTheme('system');
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    const promoTimer = setTimeout(() => setShowPromo(true), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(promoTimer);
    };
  }, [theme, setTheme]);

  const toggleTheme = () => {
    const isDark = resolvedTheme === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) return null;

  const features = [
    {
      icon: QrCodeIcon,
      title: "Instant Scanning",
      description: "Scan product QR codes to instantly add items to your cart and skip the long checkout lines.",
      color: "border-indigo-400"
    },
    {
      icon: Sparkles,
      title: "Smart AI Search",
      description: "Our AI-powered search understands exactly what you're looking for, even with natural language.",
      color: "border-purple-400"
    },
    {
      icon: ShoppingCart,
      title: "Flash Checkout",
      description: "Complete your purchase in seconds with our streamlined one-tap checkout process.",
      color: "border-pink-400"
    }
  ];

  const isDarkMode = 'dark';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Enhanced Header with accent colors */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
          <link rel="icon" href="/favicon.png" />
            <Header />
            
            <div className="flex items-center gap-3">
              <IconButton 
                icon={Search} 
                onClick={() => setIsSearchOpen(true)} 
                label="Search Products" 
                color="text-indigo-600 dark:text-indigo-400"
              />
          <IconButton 
            icon={isDarkMode ? Sun : Moon} 
            onClick={toggleTheme} 
            label={isDarkMode ? "Light mode" : "Dark mode"} 
            color="text-pink-600 dark:text-pink-400"
          />

            </div>
          </div>
        </div>
      </motion.header>

      {/* Dynamic Hero Section with animation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 pt-20 pb-16">
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-300 dark:bg-yellow-600 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -1, 0, 1, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-300 dark:bg-pink-700 rounded-full opacity-20 blur-3xl"
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block py-1 px-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6"
              >
                <span className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Revolutionizing Shopping
                </span>
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
              >
                Welcome to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Smart Shop
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl leading-relaxed"
              >
                Experience the future of shopping with our intelligent scanning and search system.
                Shop smarter, faster, and with more convenience than ever before.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <AnimatedButton
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  onClick={() => window.scrollTo({
                    top: document.querySelector('main').offsetTop,
                    behavior: 'smooth'
                  })}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop Now
                </AnimatedButton>
                
                <AnimatedButton
                  className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-gray-700"
                  onClick={() => setIsScannerOpen(true)}
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Try Scanner
                </AnimatedButton>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="md:w-1/2 relative"
            >
              <motion.div
                whileHover={{ y: -10, rotateZ: 2 }}
                className="relative w-full max-w-md mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
                  <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-indigo-400 to-purple-500 p-6">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="Smart shopping experience" 
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
                    <p className="text-gray-600 dark:text-gray-300">Modern shopping made simple with cutting-edge technology.</p>
                  </div>
                </div>
                <SaleBadge />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with dynamic cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              EXCLUSIVE FEATURES
            </span>
            <h2 className="text-4xl font-bold mb-4">Shopping Reimagined</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how our innovative features make shopping faster, smarter and more enjoyable.
            </p>
          </motion.div>

          {/* Enhanced Features Grid with staggered animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Product Section */}
      <main className="container mx-auto px-6 py-16 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-4 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium mb-4">
            TRENDING NOW
          </span>
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of top-rated products chosen just for you.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ProductGrid />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <AnimatedButton
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-200 dark:shadow-none mx-auto"
          >
            <Tag className="w-5 h-5 mr-2" />
            View All Products
          </AnimatedButton>
        </motion.div>
      </main>
      
      {/* Promotional Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-xl shadow-2xl max-w-sm relative"
            >
              <button 
                onClick={() => setShowPromo(false)}
                className="absolute top-2 right-2 text-white/80 hover:text-white"
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-lg mr-4">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">New Customer Special!</h3>
                  <p className="text-white/90 text-sm mb-3">
                    Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME20</span> for 20% off your first order!
                  </p>
                  <button className="bg-white text-indigo-600 py-1.5 px-4 rounded-lg text-sm font-medium">
                    Claim Offer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-auto border-t border-gray-200 dark:border-gray-800 py-12 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <Footer />
        </div>
      </motion.footer>

      {/* Enhanced Modal Designs */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl m-4"
            >
              <SearchProducts onClose={() => setIsSearchOpen(false)} />
            </motion.div>
          </motion.div>
        )}

        {isScannerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl m-4 border-2 border-indigo-500"
            >
              <QRScanner onClose={() => setIsScannerOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}