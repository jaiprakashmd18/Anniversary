"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const memories = [
  {
    id: 1,
    title: "First Date Magic",
    date: "Dec 26, 2022",
    emoji: "💫",
    color: "#FF4D6D",
    gradient: "from-pink-900/80 to-rose-900/80",
    height: "h-64",
    description: "The day everything began",
  },
  {
    id: 2,
    title: "Winter Walks",
    date: "Jan 2023",
    emoji: "❄️",
    color: "#60A5FA",
    gradient: "from-blue-900/80 to-indigo-900/80",
    height: "h-48",
    description: "Walking through the cold together",
  },
  {
    id: 3,
    title: "Spring Blooms",
    date: "Mar 2023",
    emoji: "🌸",
    color: "#FF758F",
    gradient: "from-rose-900/80 to-pink-800/80",
    height: "h-56",
    description: "New beginnings, like spring flowers",
  },
  {
    id: 4,
    title: "Summer Adventures",
    date: "Jun 2023",
    emoji: "☀️",
    color: "#FBBF24",
    gradient: "from-yellow-900/80 to-orange-900/80",
    height: "h-72",
    description: "Sunshine and laughter",
  },
  {
    id: 5,
    title: "Midnight Talks",
    date: "Aug 2023",
    emoji: "🌙",
    color: "#8B5CF6",
    gradient: "from-violet-900/80 to-purple-900/80",
    height: "h-52",
    description: "Conversations that lasted all night",
  },
  {
    id: 6,
    title: "Festival Colors",
    date: "Oct 2023",
    emoji: "🎊",
    color: "#F97316",
    gradient: "from-orange-900/80 to-red-900/80",
    height: "h-44",
    description: "Celebrations full of joy",
  },
  {
    id: 7,
    title: "Year Two Begins",
    date: "Jan 2024",
    emoji: "🎆",
    color: "#C084FC",
    gradient: "from-purple-900/80 to-pink-900/80",
    height: "h-60",
    description: "A new year, deeper love",
  },
  {
    id: 8,
    title: "Travel Dreams",
    date: "Apr 2024",
    emoji: "✈️",
    color: "#34D399",
    gradient: "from-emerald-900/80 to-teal-900/80",
    height: "h-48",
    description: "Exploring the world together",
  },
  {
    id: 9,
    title: "Cozy Evenings",
    date: "Nov 2024",
    emoji: "🕯️",
    color: "#FF4D6D",
    gradient: "from-pink-900/80 to-red-900/80",
    height: "h-64",
    description: "Home is wherever you are",
  },
];

function GalleryCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className={`masonry-item relative overflow-hidden rounded-2xl cursor-pointer group ${memory.height}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background pattern */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${memory.gradient}`}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${memory.color}30 0%, transparent 60%),
              linear-gradient(135deg, #1E293B 0%, #0F172A 100%)`,
          }}
        />

        {/* Decorative elements — fixed positions to avoid hydration mismatch */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { w: 60, h: 60, l: 10, t: 15 },
            { w: 40, h: 40, l: 60, t: 5 },
            { w: 70, h: 70, l: 30, t: 60 },
            { w: 30, h: 30, l: 80, t: 50 },
            { w: 50, h: 50, l: 5, t: 75 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: pos.w,
                height: pos.h,
                background: memory.color,
                left: `${pos.l}%`,
                top: `${pos.t}%`,
                filter: "blur(15px)",
              }}
              animate={isHovered ? {
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ border: `1px solid ${memory.color}60` }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <motion.div
            className="text-4xl md:text-5xl mb-2"
            animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {memory.emoji}
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0.8 }}
            animate={isHovered ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: memory.color }}>
              {memory.date}
            </div>
            <h3 className="font-display text-lg font-bold text-white">{memory.title}</h3>
            <motion.p
              className="text-white/60 text-xs mt-1"
              initial={{ opacity: 0, height: 0 }}
              animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {memory.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Expand icon */}
        <motion.div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: `${memory.color}20`, border: `1px solid ${memory.color}40` }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 glass-card rounded-3xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-7xl mb-4">{memory.emoji}</div>
              <div className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: memory.color }}>
                {memory.date}
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-3">{memory.title}</h3>
              <p className="text-white/60 leading-relaxed">{memory.description}</p>
              <button
                className="mt-6 px-6 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors"
                style={{ background: `${memory.color}20`, border: `1px solid ${memory.color}40` }}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MemoryGallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1a0a2e] to-[#0F172A]" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FF4D6D 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-xs text-white/50 tracking-[0.2em] uppercase">
            <span className="text-primary">✦</span>
            Chapter Two
            <span className="text-primary">✦</span>
          </div>
          <h2 className="section-title text-gradient mb-4">Memory Gallery</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            A collection of moments that define our beautiful journey together.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {memories.map((memory, index) => (
            <GalleryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>

        {/* Bottom decorative text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/30 text-sm italic font-display">
            &ldquo;Every picture tells a story of love...&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
