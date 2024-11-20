// app/landing/page.tsx
"use client";

import { useState, useEffect } from "react";
// import Header from "./Header";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import ServiceSection from "./ServiceSection";
// import Footer from "./Footer";


export default function Landing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-white">
      {/* <Header /> */}
      <main>
        <HeroSection />
        <FeatureSection />
        <ServiceSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
