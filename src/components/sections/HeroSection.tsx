"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { calculateTimeTogether } from "@/lib/utils";
import FloatingParticles from "@/components/effects/FloatingParticles";
import AuroraBackground from "@/components/effects/AuroraBackground";

const START_DATE = new Date("2022-12-26");

function AnimatedHeart() {
  return (
    <motion.div
      className="relative"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,77,109,${0.3 / i}) 0%, transparent 70%)`,
            filter: `blur(${i * 8}px)`,
            scale: 1 + i * 0.4,
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1 + i * 0.3, 1 + i * 0.5, 1 + i * 0.3] }}
          transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Main heart SVG */}
      <svg
        viewBox="0 0 200 180"
        className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heartMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D6D" />
            <stop offset="50%" stopColor="#FF758F" />
            <stop offset="100%" stopColor="#FFD6E0" />
          </linearGradient>
          <filter id="heartGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M100 160 C100 160 20 110 20 60 C20 35 40 15 65 25 C78 30 92 45 100 55 C108 45 122 30 135 25 C160 15 180 35 180 60 C180 110 100 160 100 160Z"
          fill="url(#heartMainGrad)"
          filter="url(#heartGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "backOut" }}
        />
        {/* Inner highlight */}
        <motion.path
          d="M75 45 C68 38 58 35 52 42 C48 47 50 55 58 62"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      </svg>
    </motion.div>
  );
}

function Timer() {
  const [time, setTime] = useState(calculateTimeTogether(START_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeTogether(START_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Years", value: time.years },
    { label: "Months", value: time.months },
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          className="glass-card rounded-2xl px-3 py-3 md:px-4 md:py-4 text-center min-w-[70px] md:min-w-[80px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.1 }}
        >
          <motion.div
            className="text-2xl md:text-3xl font-bold text-gradient font-display"
            key={unit.value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(unit.value).padStart(2, "0")}
          </motion.div>
          <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest mt-1">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleExplore = () => {
    document.getElementById("love-story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden aurora-bg"
    >
      <AuroraBackground />
      <FloatingParticles count={25} />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Tag line */}
        <motion.div
          className="glass rounded-full px-4 py-2 mb-6 text-xs text-white/60 tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ✦ A Love Story ✦
        </motion.div>

        {/* Names */}
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
        >
          <span className="text-gradient text-glow">Jai Prakash</span>
          <motion.span
            className="inline-block mx-3 md:mx-4"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
          <span className="text-gradient text-glow">Meenu</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/60 text-sm md:text-base tracking-[0.2em] uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Since 26 December 2022
        </motion.p>

        {/* 3D Heart */}
        <motion.div
          className="my-8 md:my-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "backOut" }}
        >
          <AnimatedHeart />
        </motion.div>

        {/* Timer label */}
        <motion.p
          className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Time Together
        </motion.p>

        {/* Live timer */}
        <Timer />

        {/* CTA Button */}
        <motion.button
          className="mt-10 relative group"
          onClick={handleExplore}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 rounded-full blur-lg bg-primary/40 group-hover:bg-primary/60 transition-all duration-300" />
          <div className="relative glass-card rounded-full px-8 py-4 text-white font-medium tracking-widest uppercase text-sm border border-primary/30 group-hover:border-primary/60 transition-all duration-300">
            <span className="mr-2">✦</span>
            Explore Our Journey
            <span className="ml-2">✦</span>
          </div>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center text-white/30 text-xs tracking-widest uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p>Scroll</p>
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
