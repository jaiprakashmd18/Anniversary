"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/effects/PageLoader";
import CustomCursor from "@/components/effects/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import LoveStorySection from "@/components/sections/LoveStorySection";
import MemoryGallerySection from "@/components/sections/MemoryGallerySection";
import LoveLetterSection from "@/components/sections/LoveLetterSection";
import StatsSection from "@/components/sections/StatsSection";
import FutureDreamsSection from "@/components/sections/FutureDreamsSection";
import CelebrationSection from "@/components/sections/CelebrationSection";
import Footer from "@/components/layout/Footer";

// Lazy load Three.js section to avoid SSR issues
const LoveUniverseSection = dynamic(
  () => import("@/components/sections/LoveUniverseSection"),
  {
    ssr: false,
    loading: () => (
      <div className="py-32 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">✨</div>
          <p className="text-white/30 text-sm tracking-widest uppercase">Loading Universe...</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <LoveStorySection />
        <MemoryGallerySection />
        <LoveUniverseSection />
        <LoveLetterSection />
        <StatsSection />
        <FutureDreamsSection />
        <CelebrationSection />
      </main>
      <Footer />
    </>
  );
}
