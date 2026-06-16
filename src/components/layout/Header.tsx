"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Story", href: "#love-story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Universe", href: "#universe" },
  { label: "Letter", href: "#letter" },
  { label: "Stats", href: "#stats" },
  { label: "Dreams", href: "#dreams" },
  { label: "Celebrate", href: "#celebration" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div
          className={`px-4 md:px-8 py-4 transition-all duration-300 ${
            scrolled ? "bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="font-display font-bold text-lg"
              onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient">JP</span>
              <motion.span
                className="inline-block mx-1 text-sm"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              <span className="text-gradient">M</span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-xs tracking-widest uppercase hover:text-white transition-colors duration-200 relative group"
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </motion.a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-5 h-0.5 bg-white/70 rounded-full"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-white/70 rounded-full"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-white/70 rounded-full"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 flex flex-col gap-4"
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 text-sm tracking-widest uppercase hover:text-primary transition-colors py-2 border-b border-white/5 last:border-0"
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
