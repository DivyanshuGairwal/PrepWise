"use client";

import React, { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-950 text-white">

        {/* Header */}

        <header className="border-b border-white/5 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>

              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                PrepWise
              </span>
            </div>

          </div>
        </header>

        <main className="relative overflow-hidden">

          {/* Mouse Spotlight */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            animate={{
              background: `radial-gradient(
                600px circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(99,102,241,0.10),
                transparent 70%
              )`,
            }}
            transition={{
              duration: 0.12,
            }}
          />

          {/* Main Ambient Glow */}

          <div className="pointer-events-none absolute inset-0 z-0">

            <div
              className="
                absolute
                left-1/2
                top-[0%]
                -translate-x-1/2
                w-[3200px]
                h-[3200px]
                rounded-full
                bg-indigo-500/4
                blur-[500px]
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-[40%]
                -translate-x-1/2
                w-[2200px]
                h-[2200px]
                rounded-full
                bg-indigo-500/2
                blur-[400px]
              "
            />

            {/* Premium Dark Vignette */}

            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]
              "
            />

            {/* Top Shadow */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-[400px]
                bg-gradient-to-b
                from-black/30
                to-transparent
              "
            />

          </div>

          <div className="relative z-10">
            <HeroSection />
            <HowItWorks />
          </div>

        </main>
      </div>
    </PageTransition>
  );
}