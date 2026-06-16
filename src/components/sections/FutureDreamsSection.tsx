"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const dreams = [
  {
    id: 1,
    title: "More Adventures",
    description: "Exploring the world together, discovering new places, creating memories in every corner of the earth.",
    emoji: "✈️",
    color: "#60A5FA",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    stats: "Infinite destinations",
    year: "2027+",
  },
  {
    id: 2,
    title: "Dream Home",
    description: "Building a home filled with love, laughter, and all the little things that make life beautiful.",
    emoji: "🏡",
    color: "#FF758F",
    icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    stats: "Our forever home",
    year: "Our sanctuary",
  },
  {
    id: 3,
    title: "Endless Memories",
    description: "Every day writing new chapters of our story, capturing moments that will make us smile forever.",
    emoji: "📸",
    color: "#C084FC",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    stats: "∞ Moments",
    year: "Every single day",
  },
  {
    id: 4,
    title: "Forever Together",
    description: "Growing old together, hand in hand, heart to heart — through every season of life.",
    emoji: "💞",
    color: "#FF4D6D",
    icon: "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z",
    stats: "∞ Together",
    year: "Forever & Always",
  },
];

function DreamCard({ dream, index }: { dream: typeof dreams[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "backOut" }}
    >
      {/* Connecting line */}
      {index < dreams.length - 1 && (
        <motion.div
          className="hidden md:block absolute top-1/2 left-full w-full h-px z-0"
          style={{
            background: `linear-gradient(to right, ${dream.color}60, ${dreams[index + 1].color}60)`,
            transform: "translateY(-50%)",
            width: "calc(100% - 200px)",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
        />
      )}

      <motion.div
        className="relative z-10 glass-card rounded-3xl p-6 md:p-8 h-full overflow-hidden"
        style={{ borderColor: `${dream.color}30` }}
        whileHover={{
          y: -8,
          boxShadow: `0 30px 60px ${dream.color}25`,
          borderColor: `${dream.color}60`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${dream.color}15 0%, transparent 70%)`,
          }}
        />

        {/* Decorative circle */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10"
          style={{ background: dream.color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: index }}
        />

        <div className="relative z-10">
          {/* Year badge */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase mb-4"
            style={{
              background: `${dream.color}20`,
              border: `1px solid ${dream.color}40`,
              color: dream.color,
            }}
          >
            <span>{dream.emoji}</span>
            <span>{dream.year}</span>
          </div>

          {/* Emoji */}
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.8 }}
          >
            {dream.emoji}
          </motion.div>

          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
            {dream.title}
          </h3>

          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {dream.description}
          </p>

          {/* Stats */}
          <div
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: dream.color }}
          >
            {dream.stats}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
          style={{ background: `linear-gradient(to right, ${dream.color}60, ${dream.color}20)` }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function FutureDreamsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="dreams" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A]" />

      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.2) 0%, transparent 60%)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-xs text-white/50 tracking-[0.2em] uppercase">
            <span className="text-primary">✦</span>
            Chapter Six
            <span className="text-primary">✦</span>
          </div>
          <h2 className="section-title text-gradient mb-4">Future Dreams</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            The best chapters of our story are yet to be written. Here is what we dream for.
          </p>
        </motion.div>

        {/* Dream cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dreams.map((dream, index) => (
            <DreamCard key={dream.id} dream={dream} index={index} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="glass rounded-2xl px-8 py-6 inline-block max-w-xl">
            <p className="font-display text-lg text-white/70 italic mb-2">
              &ldquo;The future is bright because we face it together.&rdquo;
            </p>
            <div className="text-primary/60 text-sm">
              ❤️ Jai Prakash & Meenu
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
