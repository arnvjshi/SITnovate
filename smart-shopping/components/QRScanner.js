"use client";

import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { motion, AnimatePresence } from 'framer-motion';

export function QRScanner() {
  const webcamRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  function scanQRCode() {
    if (!webcamRef.current || !webcamRef.current.video || webcamRef.current.video.readyState !== 4) {
      return;
    }

    const video = webcamRef.current.video;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });

    if (code) {
      setScannedData(code.data);
    }
  }

  useEffect(() => {
    if (isScannerOpen) {
      const interval = setInterval(scanQRCode, 500);
      return () => clearInterval(interval);
    }
  }, [isScannerOpen]);

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  useEffect(() => {
    if (scannedData && isValidUrl(scannedData)) {
      window.location.href = scannedData;
    }
  }, [scannedData]);

  function toggleScanner() {
    setIsScannerOpen(!isScannerOpen);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <motion.button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        onClick={toggleScanner}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Scan QR Code
      </motion.button>

      <AnimatePresence>
        {isScannerOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative flex flex-col items-center m-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.button 
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                onClick={toggleScanner}
                whileHover={{ scale: 1.2 }}
              >
                ✖
              </motion.button>
              <h1 className="text-xl font-bold mb-4 text-gray-800">QR Code Scanner</h1>
              <div className="relative w-full flex justify-center">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="rounded-lg shadow-md border border-gray-300 z-50"
                />
              </div>
              <motion.div 
                className="mt-4 p-2 w-full bg-gray-200 rounded-lg text-center text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold">Scanned Data:</h2>
                <p className="text-sm break-all">{scannedData || 'Scanning...'}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
