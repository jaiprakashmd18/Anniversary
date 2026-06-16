"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  type: "circle" | "heart" | "star";
}

const HEART_PATH = "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z";

function HeartIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      style={{ overflow: "visible" }}
    >
      <path d={HEART_PATH} />
    </svg>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const generateParticles = (count: number): Particle[] => {
  const colors = [
    "rgba(255, 77, 109, 0.8)",
    "rgba(255, 117, 143, 0.6)",
    "rgba(255, 214, 224, 0.7)",
    "rgba(255, 255, 255, 0.4)",
  ];
  const types: ("circle" | "heart" | "star")[] = ["circle", "heart", "star"];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    type: types[Math.floor(Math.random() * types.length)],
  }));
};

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({ count = 30, className = "" }: FloatingParticlesProps) {
  const particles = generateParticles(count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: particle.color,
          }}
          animate={{
            y: [0, -80, -160, -240],
            x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.type === "circle" && (
            <div
              className="rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: particle.color,
                boxShadow: `0 0 ${particle.size}px ${particle.color}`,
              }}
            />
          )}
          {particle.type === "heart" && <HeartIcon size={particle.size} />}
          {particle.type === "star" && <StarIcon size={particle.size} />}
        </motion.div>
      ))}
    </div>
  );
}
