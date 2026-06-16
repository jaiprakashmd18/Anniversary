"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const navLinks = [
    { label: "Story", href: "#love-story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Universe", href: "#universe" },
    { label: "Letter", href: "#letter" },
    { label: "Stats", href: "#stats" },
    { label: "Dreams", href: "#dreams" },
  ];

  return (
    <footer className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
        {/* Heart */}
        <motion.div
          className="text-5xl md:text-6xl mb-6"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>

        {/* Main text */}
        <motion.h2
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gradient">Jai Prakash</span>
          <span className="text-white mx-3">❤️</span>
          <span className="text-gradient">Meenu</span>
        </motion.h2>

        <motion.p
          className="text-white/50 text-sm md:text-base tracking-[0.15em] uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A Love Story That Continues Forever
        </motion.p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <span className="text-primary/60 text-sm">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-white/40 text-sm tracking-widest uppercase hover:text-primary transition-colors duration-200"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Date */}
        <motion.p
          className="text-white/25 text-xs tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Since December 26, 2022 · Our love grows stronger every day
        </motion.p>

        {/* Bottom decorative line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </footer>
  );
}
