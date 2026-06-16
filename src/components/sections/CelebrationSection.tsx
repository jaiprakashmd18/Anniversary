"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";

interface FireworkParticleProps { x: number; y: number; color: string }

function FireworkParticle({ x, y, color }: FireworkParticleProps) {
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: 3 + Math.random() * 4,
      duration: 0.8 + Math.random() * 0.4,
    };
  }), []);

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
          transition={{ duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function FloatingHeart({ delay, startX, size }: { delay: number; startX: number; size: number }) {
  const [viewportHeight, setViewportHeight] = useState(800);
  const [animX] = useState(() => (Math.random() - 0.5) * 200);
  const [duration] = useState(() => 4 + Math.random() * 3);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        bottom: "-50px",
        fontSize: size,
      }}
      animate={{
        y: [0, -(viewportHeight + 100)],
        x: [0, animX],
        rotate: [0, 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      ❤️
    </motion.div>
  );
}

interface ConfettiPiece {
  id: number;
  left: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle";
  dx: number;
  rotate: number;
  duration: number;
  delay: number;
}

function Confetti() {
  const colors = ["#FF4D6D", "#FF758F", "#FFD6E0", "#C084FC", "#60A5FA", "#34D399", "#FBBF24"];
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const shapes: ConfettiPiece["shape"][] = ["circle", "square", "triangle"];
    setPieces(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 10,
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length],
        dx: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1),
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.shape === "triangle" ? "transparent" : p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            borderLeft: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : "none",
            borderRight: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : "none",
            borderBottom: p.shape === "triangle" ? `${p.size}px solid ${p.color}` : "none",
          }}
          animate={{
            y: [0, viewportHeight + 100],
            x: [p.dx],
            rotate: [0, p.rotate],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}

interface HeartConfig {
  id: number;
  startX: number;
  size: number;
  delay: number;
}

export default function CelebrationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState<HeartConfig[]>([]);
  const fireworkCount = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    setShowConfetti(true);
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        size: 20 + Math.random() * 30,
        delay: i * 0.3,
      }))
    );

    const launchFirework = () => {
      const colors = ["#FF4D6D", "#FF758F", "#FFD6E0", "#C084FC", "#60A5FA", "#FBBF24"];
      const container = ref.current;
      const newFirework = {
        id: fireworkCount.current++,
        x: Math.random() * (container?.offsetWidth ?? 800),
        y: Math.random() * (container?.offsetHeight ?? 400) * 0.7,
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

      {fireworks.map((fw) => (
        <FireworkParticle key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
      ))}

      {isInView && showConfetti && <Confetti />}

      {isInView && hearts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {hearts.map((h) => (
            <FloatingHeart key={h.id} delay={h.delay} startX={h.startX} size={h.size} />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center w-full">
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
              Forever &amp; Always
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </motion.div>

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
