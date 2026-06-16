"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function FireworkParticle({ x, y, color }: { x: number; y: number; color: string }) {
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: 3 + Math.random() * 4,
    };
  });

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: 0,
            scale: [1, 0.5, 0],
          }}
          transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function FloatingHeart({ delay }: { delay: number }) {
  const startX = Math.random() * 100;
  const size = 20 + Math.random() * 30;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        bottom: "-50px",
        fontSize: size,
      }}
      animate={{
        y: [0, -window.innerHeight - 100],
        x: [0, (Math.random() - 0.5) * 200],
        rotate: [0, Math.random() * 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        ease: "easeOut",
      }}
    >
      ❤️
    </motion.div>
  );
}

function Confetti() {
  const colors = ["#FF4D6D", "#FF758F", "#FFD6E0", "#C084FC", "#60A5FA", "#34D399", "#FBBF24"];
  const shapes = ["circle", "square", "triangle"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => {
        const color = colors[i % colors.length];
        const shape = shapes[i % shapes.length];
        const size = 6 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-20px",
              width: size,
              height: size,
              background: shape === "triangle" ? "transparent" : color,
              borderRadius: shape === "circle" ? "50%" : "2px",
              borderLeft: shape === "triangle" ? `${size / 2}px solid transparent` : "none",
              borderRight: shape === "triangle" ? `${size / 2}px solid transparent` : "none",
              borderBottom: shape === "triangle" ? `${size}px solid ${color}` : "none",
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              x: [(Math.random() - 0.5) * 200],
              rotate: [0, Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        );
      })}
    </div>
  );
}

export default function CelebrationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const fireworkCount = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    setShowConfetti(true);
    setShowHearts(true);

    const launchFirework = () => {
      const colors = ["#FF4D6D", "#FF758F", "#FFD6E0", "#C084FC", "#60A5FA", "#FBBF24"];
      const newFirework = {
        id: fireworkCount.current++,
        x: Math.random() * (ref.current?.offsetWidth || 800),
        y: Math.random() * (ref.current?.offsetHeight || 400) * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setFireworks((prev) => [...prev.slice(-20), newFirework]);
    };

    const interval = setInterval(launchFirework, 300);
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, [isInView]);

  const wishes = [
    { text: "Happy Anniversary!", emoji: "🎉" },
    { text: "3 Beautiful Years!", emoji: "💫" },
    { text: "Love Forever!", emoji: "❤️" },
    { text: "Jai ❤️ Meenu", emoji: "🌟" },
  ];

  return (
    <section
      ref={ref}
      id="celebration"
      className="relative py-24 md:py-32 overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 aurora-bg" />

      {/* Fireworks */}
      {isInView && fireworks.map((fw) => (
        <FireworkParticle key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
      ))}

      {/* Confetti */}
      {isInView && showConfetti && <Confetti />}

      {/* Floating hearts */}
      {isInView && showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingHeart key={i} delay={i * 0.3} />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center w-full">
        {/* Section tag */}
        <motion.div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-xs text-white/50 tracking-[0.2em] uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary">✦</span>
          Chapter Seven
          <span className="text-primary">✦</span>
        </motion.div>

        {/* Main celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <div className="text-6xl md:text-8xl mb-6">🎊</div>

          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            animate={isInView ? {
              textShadow: [
                "0 0 20px rgba(255,77,109,0.5)",
                "0 0 60px rgba(255,77,109,0.8)",
                "0 0 20px rgba(255,77,109,0.5)",
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-gradient">Happy</span>
            <br />
            <span className="text-white">Anniversary!</span>
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl font-display text-gradient mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Jai Prakash ❤️ Meenu
          </motion.p>

          <motion.p
            className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            Three incredible years of love, laughter, and making each other better.
            Here is to forever and always.
          </motion.p>
        </motion.div>

        {/* Animated wishes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-4 text-center"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: "backOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                {wish.emoji}
              </motion.div>
              <p className="text-white/80 text-sm font-medium">{wish.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Special message */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💍
          </motion.div>
          <p className="font-display text-xl md:text-2xl text-white/90 leading-relaxed italic mb-4">
            &ldquo;Every love story is beautiful, but ours is my favorite.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-primary text-sm tracking-widest uppercase font-medium">
              Forever & Always
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </motion.div>

        {/* Sparkle decorations */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/60"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontSize: "1.5rem",
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </section>
  );
}
