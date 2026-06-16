import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D6D",
        secondary: "#FF758F",
        accent: "#FFD6E0",
        background: "#0F172A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "aurora": "aurora 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "heart-beat": "heartbeat 1.5s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "particle-float": "particleFloat 8s ease-in-out infinite",
        "confetti-fall": "confettiFall 3s ease-in forwards",
        "twinkle": "twinkle 2s ease-in-out infinite alternate",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.15)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        particleFloat: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-10vh) rotate(720deg)", opacity: "0" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-100px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        twinkle: {
          "0%": { opacity: "0.3", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1.2)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(255, 77, 109, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(255, 77, 109, 0.8), 0 0 60px rgba(255, 77, 109, 0.4)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255, 77, 109, 0.1) 0%, rgba(255, 117, 143, 0.05) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
