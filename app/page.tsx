"use client";

import React from "react";
import { Brain } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-950">

        {/* Header */}

        <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
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

        {/* Hero */}

        <main>
          <HeroSection />
        </main>

      </div>
    </PageTransition>
  );
}