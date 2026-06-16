"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { getRelationshipStats } from "@/lib/utils";

const START_DATE = new Date("2022-12-26");

function StatCard({ stat, index }: { stat: { label: string; value: number; suffix: string; emoji: string; color: string; description: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="counter-card group relative overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "backOut" }}
      whileHover={{ y: -8 }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)` }}
      />

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      <div className="relative z-10">
        <motion.div
          className="text-4xl mb-3"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        >
          {stat.emoji}
        </motion.div>

        <div className="text-3xl md:text-4xl font-bold font-display mb-1" style={{ color: stat.color }}>
          {isInView && (
            <CountUp
              end={stat.value}
              duration={2.5}
              delay={0.2 + index * 0.1}
              separator=","
              suffix={stat.suffix}
            />
          )}
        </div>

        <div className="text-white/70 font-medium mb-1">{stat.label}</div>
        <div className="text-white/40 text-xs">{stat.description}</div>
      </div>

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-10"
        style={{
          background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
    </motion.div>
  );
}

function LoveMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="glass-card rounded-2xl p-6 md:p-8 mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white/70 font-medium">Love Level</div>
          <div className="text-white/40 text-xs">And growing every second</div>
        </div>
        <div className="text-3xl font-bold text-gradient font-display">
          {isInView && (
            <CountUp end={100} duration={2.5} suffix="%" delay={0.8} />
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #FF4D6D, #FF758F, #FFD6E0, #FF758F, #FF4D6D)",
            backgroundSize: "200% 100%",
          }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>

      {/* Infinite marker */}
      <div className="flex justify-end mt-2">
        <span className="text-primary/60 text-xs tracking-widest uppercase">∞ Infinite</span>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const stats = getRelationshipStats(START_DATE);

  const statCards = [
    {
      label: "Days Together",
      value: stats.days,
      suffix: "",
      emoji: "📅",
      color: "#FF4D6D",
      description: "Each day more precious than the last",
    },
    {
      label: "Hours Together",
      value: Math.min(stats.hours, 99999),
      suffix: "+",
      emoji: "⏰",
      color: "#FF758F",
      description: "Hours filled with love and laughter",
    },
    {
      label: "Memories Created",
      value: stats.memories,
      suffix: "+",
      emoji: "💫",
      color: "#C084FC",
      description: "Every moment a treasure",
    },
    {
      label: "Adventures Shared",
      value: stats.adventures,
      suffix: "+",
      emoji: "🌟",
      color: "#60A5FA",
      description: "Exploring life together",
    },
    {
      label: "Smiles Generated",
      value: Math.min(Math.floor(stats.smiles / 1000), 9999),
      suffix: "k+",
      emoji: "😊",
      color: "#34D399",
      description: "You make me smile every day",
    },
    {
      label: "Love Growing",
      value: 100,
      suffix: "%",
      emoji: "❤️",
      color: "#FF4D6D",
      description: "And it keeps growing",
    },
  ];

  return (
    <section id="stats" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1a0a2e] to-[#0F172A]" />

      {/* Background orbs */}
      {["#FF4D6D", "#8B5CF6", "#60A5FA"].map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            left: `${i * 33}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-xs text-white/50 tracking-[0.2em] uppercase">
            <span className="text-primary">✦</span>
            Chapter Five
            <span className="text-primary">✦</span>
          </div>
          <h2 className="section-title text-gradient mb-4">Our Love in Numbers</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Some things can be counted — though love itself is beyond all measure.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {statCards.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Love meter */}
        <LoveMeter />
      </div>
    </section>
  );
}
