"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#0F172A] flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Heart animation */}
          <motion.div
            className="relative mb-8"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M50 85 C50 85 10 60 10 35 C10 20 20 10 35 15 C42 17 48 25 50 30 C52 25 58 17 65 15 C80 10 90 20 90 35 C90 60 50 85 50 85Z"
                fill="url(#heartGrad)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF4D6D" />
                  <stop offset="100%" stopColor="#FF758F" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,77,109,0.3) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-3xl font-bold text-gradient mb-2">
              Jai Prakash ❤️ Meenu
            </h1>
            <p className="text-white/50 text-sm tracking-widest uppercase">
              A Love Story
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #FF4D6D, #FF758F)",
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-white/30 text-xs mt-2">
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
