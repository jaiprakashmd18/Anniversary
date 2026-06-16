"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    date: "December 26, 2022",
    title: "First Date",
    description: "The magical day it all began. The moment our eyes met and the universe conspired to bring two souls together forever.",
    emoji: "💫",
    color: "#FF4D6D",
    year: "2022",
  },
  {
    date: "Throughout 2023",
    title: "2023 Memories",
    description: "A year of discovery, laughter, and building something beautiful together. Every moment became a cherished memory.",
    emoji: "🌸",
    color: "#FF758F",
    year: "2023",
  },
  {
    date: "Throughout 2024",
    title: "2024 Adventures",
    description: "Adventures that took our breath away, moments that made our hearts sing, and experiences that bonded us deeper.",
    emoji: "🌟",
    color: "#C084FC",
    year: "2024",
  },
  {
    date: "Throughout 2025",
    title: "2025 Beautiful Moments",
    description: "A tapestry of beautiful moments woven together — each thread a memory, each pattern a story of our love.",
    emoji: "🦋",
    color: "#60A5FA",
    year: "2025",
  },
  {
    date: "2026",
    title: "Anniversary Celebration",
    description: "Three incredible years of love, growth, and happiness. Here we are — stronger, deeper, and more in love than ever.",
    emoji: "🎊",
    color: "#FF4D6D",
    year: "2026",
  },
];

function MilestoneCard({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"} hidden md:block`}>
        <motion.div
          className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 cursor-default"
          style={{ borderColor: `${milestone.color}30` }}
          whileHover={{ boxShadow: `0 20px 40px ${milestone.color}20` }}
        >
          <div className={`text-xs tracking-[0.2em] uppercase mb-2 font-medium`} style={{ color: milestone.color }}>
            {milestone.date}
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">{milestone.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{milestone.description}</p>
        </motion.div>
      </div>

      {/* Center connector */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 relative"
          style={{
            background: `radial-gradient(circle, ${milestone.color}30 0%, ${milestone.color}10 100%)`,
            border: `2px solid ${milestone.color}60`,
            boxShadow: `0 0 20px ${milestone.color}30`,
          }}
          whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${milestone.color}60` }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        >
          <span>{milestone.emoji}</span>
        </motion.div>
        <div
          className="w-px flex-1 mt-2"
          style={{ background: `linear-gradient(to bottom, ${milestone.color}60, transparent)`, minHeight: "60px" }}
        />
      </div>

      {/* Mobile card (shown on mobile, right side always) */}
      <div className="flex-1 md:hidden">
        <motion.div
          className="glass-card rounded-2xl p-4 group"
          style={{ borderColor: `${milestone.color}30` }}
        >
          <div className="text-xs tracking-[0.2em] uppercase mb-1 font-medium" style={{ color: milestone.color }}>
            {milestone.date}
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-1">{milestone.title}</h3>
          <p className="text-white/60 text-xs leading-relaxed">{milestone.description}</p>
        </motion.div>
      </div>

      {/* Right side placeholder for desktop (keeps alignment) */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function LoveStorySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="love-story" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,77,109,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139,92,246,0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-xs text-white/50 tracking-[0.2em] uppercase">
            <span className="text-primary">✦</span>
            Chapter One
            <span className="text-primary">✦</span>
          </div>
          <h2 className="section-title text-gradient mb-4">Our Love Story</h2>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Every great love story has a beginning. Ours started on a winter day that changed everything.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,77,109,0.4), transparent)" }} />
          </div>

          {/* Left line - mobile */}
          <div className="md:hidden absolute left-7 top-0 bottom-0 w-px">
            <div className="h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,77,109,0.4), transparent)" }} />
          </div>

          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
