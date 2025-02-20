"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function QRScanner() {
  const webcamRef = useRef(null);
  const { toast } = useToast();
  const [scannedProduct, setScannedProduct] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  function scanQRCode() {
    if (!webcamRef.current || !webcamRef.current.video || webcamRef.current.video.readyState !== 4) {
      return;
    }

    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      try {
        const scannedData = JSON.parse(code.data);
        if (scannedData.id) {
          fetchProductDetails(scannedData.id);
        }
      } catch (error) {
        console.error("Invalid QR Code format", error);
      }
    }
  }

  async function fetchProductDetails(productId) {
    try {
      const res = await fetch(`/api/products`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      const product = data.find((item) => item.id === productId);
      if (product) {
        setScannedProduct(product);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  }

  useEffect(() => {
    if (isScannerOpen) {
      const interval = setInterval(scanQRCode, 500);
      return () => clearInterval(interval);
    }
  }, [isScannerOpen]);

  function addToCart() {
    if (scannedProduct) {
      window.dispatchEvent(new CustomEvent("add-to-cart", { detail: scannedProduct }));
      toast({ title: "Added to cart", description: `${scannedProduct.item_name} has been added.` });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Button onClick={() => setIsScannerOpen(true)}>Scan QR Code</Button>

      <AnimatePresence>
        {isScannerOpen && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <motion.div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative flex flex-col items-center">
              <Button className="absolute top-2 right-2" onClick={() => setIsScannerOpen(false)}>✖</Button>
              <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>
              <Webcam ref={webcamRef} audio={false} className="rounded-lg shadow-md border border-gray-300" videoConstraints={{ facingMode: "environment" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scannedProduct && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <motion.div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative flex flex-col items-center">
              <Button className="absolute top-2 right-2" onClick={() => setScannedProduct(null)}>✖</Button>
              <h1 className="text-xl font-bold mb-4">{scannedProduct.item_name}</h1>
              <p className="text-sm text-gray-600">Price: ${scannedProduct.price.$numberDouble}</p>
              <p className="text-sm text-gray-600">Expiry Date: {scannedProduct.expiry_date}</p>
              <p className="text-sm text-gray-600">Quantity Available: {scannedProduct.quantity.$numberInt}</p>
              <Button className="mt-4" onClick={addToCart}>Add to Cart</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
