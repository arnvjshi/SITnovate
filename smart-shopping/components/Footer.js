"use client";
import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

// First, let's create a component for the custom scrollbar styles
const GlobalStyles = () => (
  <style jsx global>{`
    /* Custom Scrollbar Styles */
    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #1e1e24;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #3b82f6, #2563eb);
      border-radius: 6px;
      border: 3px solid #1e1e24;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #60a5fa, #3b82f6);
    }

    /* For Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: #3b82f6 #1e1e24;
    }
  `}</style>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <GlobalStyles />
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Smart Shop
              </h3>
              <p className="text-sm max-w-xs">
                Smart and efficient Store with a wide range of products to meet all your needs. Our mission is to provide quality and convenience at competitive prices.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>n  
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Services", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-blue-500 transition-colors inline-block relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-4">
                <a href="mailto:arnvjshi@gmail.com" className="flex items-center space-x-2 text-sm hover:text-blue-500 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>arnvjshi@gmail.com</span>
                </a>
                <a href="tel:+91 9356351894" className="flex items-center space-x-2 text-sm hover:text-blue-500 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+91 9356351894</span>
                </a>
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Nagpur<br></br>MH, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <p className="text-sm text-gray-400">
                © {currentYear} Company Name. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
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

        {/* Gradient Border Top */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700"></div>
      </footer>
    </>
  );
};

export default Footer;