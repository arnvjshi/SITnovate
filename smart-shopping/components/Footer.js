"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ShoppingCart, Zap, QrCodeIcon } from "lucide-react";

// Enhanced scrollbar styles matching the app's color scheme
const GlobalStyles = () => (
  <style jsx global>{`
    /* Custom Scrollbar Styles */
    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 6px;
    }

    body.dark ::-webkit-scrollbar-track {
      background: #1f2937;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      border-radius: 6px;
      border: 3px solid #f3f4f6;
    }

    body.dark ::-webkit-scrollbar-thumb {
      border: 3px solid #1f2937;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #4f46e5, #7c3aed);
    }

    /* For Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: #6366f1 #f3f4f6;
    }

    body.dark * {
      scrollbar-color: #6366f1 #1f2937;
    }
  `}</style>
);

// Feature highlight component
const FeatureHighlight = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex flex-col items-center text-center p-4"
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h4 className="text-sm font-semibold mb-1">{title}</h4>
    <p className="text-xs text-gray-400">{description}</p>
  </motion.div>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Features data
  const features = [
    {
      icon: ShoppingCart,
      title: "Fast Shopping",
      description: "Quick and efficient checkout process"
    },
    {
      icon: QrCodeIcon,
      title: "QR Scanning",
      description: "Scan products for instant info"
    },
    {
      icon: Zap,
      title: "Smart Recommendations",
      description: "AI-powered product suggestions"
    }
  ];

  return (
    <>
      <GlobalStyles />
      <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        {/* Gradient divider */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* Features highlight section */}
        <div className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <FeatureHighlight key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Smart Shop
              </motion.h3>
              <p className="text-sm max-w-xs text-gray-600 dark:text-gray-400">
                Experience the future of shopping with our intelligent scanning and search system.
                Shop smarter, faster, and with more convenience than ever before.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  whileHover={{ y: -2, scale: 1.2 }}
                  href="https://github.com/arnvjshi/SITnovate/" 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2, scale: 1.2 }}
                  href="#" 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2, scale: 1.2 }}
                  href="#" 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              </div>  
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Services", "Products", "Pricing", "Contact"].map((item) => (
                  <li key={item}>
                    <motion.a
                      whileHover={{ x: 2 }}
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all group-hover:w-full"></span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h4>
              <div className="space-y-4">
                <motion.a 
                  whileHover={{ x: 2 }}
                  href="mailto:arnvjshi@gmail.com" 
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Mail className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span>arnvjshi@gmail.com</span>
                </motion.a>
                <motion.a 
                  whileHover={{ x: 2 }}
                  href="tel:+91 9356351894" 
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Phone className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span>+91 9356351894</span>
                </motion.a>
                <motion.div 
                  whileHover={{ x: 2 }}
                  className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <span>Nagpur<br></br>MH, India</span>
                </motion.div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Stay Updated</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-r-md text-sm font-medium"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {currentYear} Smart Shop. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;