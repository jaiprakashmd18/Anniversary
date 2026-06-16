"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    width: Math.random() * 2 + 1,
    height: Math.random() * 2 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
}

export default function AuroraBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(80));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora orbs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,77,109,0.6) 0%, rgba(255,77,109,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 50, -20, 0],
          y: [0, 30, -10, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(255,117,143,0.5) 0%, rgba(255,117,143,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,77,109,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,109,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Stars — rendered client-side only to avoid hydration mismatch */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.width,
            height: star.height,
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
