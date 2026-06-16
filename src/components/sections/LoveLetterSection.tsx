"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const LETTER_TEXT = `Dear Meenu,

From our first date on 26 December 2022 to every beautiful moment we have shared, every day with you has made my life brighter and more meaningful.

You are my happiness, my peace, my favorite person, and my forever.

Thank you for every smile, every memory, and every moment of love.

Happy Anniversary, My Love.

Forever Yours,
Jai Prakash ❤️`;

export default function LoveLetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 aurora-bg" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,77,109,0.3) 0%, transparent 70%)`,
        }}
      />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-xs text-white/50 tracking-[0.2em] uppercase">
            <span className="text-primary">✦</span>
            Chapter Four
            <span className="text-primary">✦</span>
          </div>
          <h2 className="section-title text-gradient mb-4">A Love Letter</h2>
          <p className="text-white/50">Words that come straight from the heart</p>
        </motion.div>

        {/* Envelope */}
        <div className="flex justify-center">
          <motion.div
            className="relative w-full max-w-xl"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Envelope container */}
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="envelope"
                  className="relative cursor-pointer group"
                  onClick={() => setIsOpen(true)}
                  exit={{ scale: 0.8, opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Envelope body */}
                  <div
                    className="glass-card rounded-2xl p-8 text-center relative overflow-hidden"
                    style={{ minHeight: "280px" }}
                  >
                    {/* Envelope decorations */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            45deg,
                            rgba(255,77,109,1) 0px,
                            rgba(255,77,109,1) 2px,
                            transparent 2px,
                            transparent 20px
                          )
                        `,
                      }}
                    />

                    {/* Seal */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: "radial-gradient(circle, rgba(255,77,109,0.3) 0%, rgba(255,77,109,0.1) 100%)",
                          border: "2px solid rgba(255,77,109,0.4)",
                          boxShadow: "0 0 30px rgba(255,77,109,0.3)",
                        }}
                      >
                        <span className="text-4xl">💌</span>
                      </div>
                    </motion.div>

                    {/* Top fold lines */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div
                      className="absolute top-0 left-0 w-0 h-0"
                      style={{
                        borderTop: "80px solid rgba(255,77,109,0.1)",
                        borderRight: "160px solid transparent",
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 w-0 h-0"
                      style={{
                        borderTop: "80px solid rgba(255,77,109,0.1)",
                        borderLeft: "160px solid transparent",
                      }}
                    />

                    {/* Bottom hint */}
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <p className="text-white/40 text-xs tracking-widest uppercase group-hover:text-primary/60 transition-colors">
                          Tap to Open ✦
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "0 0 60px rgba(255,77,109,0.3)" }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Letter paper */}
                  <div
                    className="relative rounded-2xl p-8 md:p-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,77,109,0.08) 0%, rgba(255,117,143,0.04) 100%)",
                      border: "1px solid rgba(255,77,109,0.2)",
                      boxShadow: "0 20px 60px rgba(255,77,109,0.15), 0 0 0 1px rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Paper texture */}
                    <div className="absolute inset-0 rounded-2xl opacity-30"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(255,77,109,0.08) 28px)`,
                      }}
                    />

                    {/* Decorative top */}
                    <div className="relative z-10 text-center mb-6">
                      <motion.div
                        className="text-4xl mb-3"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💌
                      </motion.div>
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    </div>

                    {/* Letter content */}
                    <div className="relative z-10 space-y-4">
                      {LETTER_TEXT.split("\n\n").map((paragraph, i) => (
                        <motion.p
                          key={i}
                          className={`font-display leading-relaxed ${
                            i === 0 ? "text-lg font-bold text-white" :
                            paragraph.includes("Forever") ? "text-primary font-medium text-right" :
                            paragraph.includes("Happy Anniversary") ? "text-xl font-bold text-gradient text-center py-2" :
                            "text-white/80"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>

                    {/* Decorative bottom */}
                    <div className="relative z-10 mt-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-4" />
                      <div className="text-center">
                        <motion.div
                          className="text-3xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ❤️
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    className="mt-4 w-full glass rounded-xl py-3 text-white/50 text-sm hover:text-white/80 transition-colors"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close Letter
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
