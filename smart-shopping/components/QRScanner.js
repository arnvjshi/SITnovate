"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Camera, X, RefreshCw, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function QRScanner({ onScan, variant = "navbar" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = React.useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize camera
  const initializeCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported in your browser");
      }

      const constraints = {
        video: {
          facingMode: isMobile ? "environment" : "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 1.7777777778 },
        },
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera initialization error:", err);
      let errorMessage = "Failed to access camera. ";
      
      if (err.name === "NotAllowedError") {
        errorMessage += "Please grant camera permission and try again.";
      } else if (err.name === "NotFoundError") {
        errorMessage += "No camera found on your device.";
      } else if (err.name === "NotReadableError") {
        errorMessage += "Camera is already in use by another application.";
      } else {
        errorMessage += "Please check your camera settings and try again.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isMobile]);

  // Handle dialog open/close
  const handleOpenChange = useCallback((open) => {
    setIsOpen(open);
    if (open) {
      initializeCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setError(null);
    }
  }, [stream, initializeCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={() => handleOpenChange(true)}
        className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : (
          <Camera className="h-5 w-5" />
        )}
        Scan QR Code
      </button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>

          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {error ? (
              <Alert variant="destructive" className="m-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
                <button
                  onClick={initializeCamera}
                  className="mt-2 flex items-center gap-2 px-3 py-1 text-sm bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" /> Try Again
                </button>
              </Alert>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <div className="border-2 border-green-500 w-48 h-48 md:w-64 md:h-64 rounded-lg">
                      <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-green-500 rounded-tl" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-green-500 rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-green-500 rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-green-500 rounded-br" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-scan" />
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => handleOpenChange(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors"
              aria-label="Close scanner"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-sm text-gray-500 mt-2">
            Position the QR code within the frame to scan
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default QRScanner;