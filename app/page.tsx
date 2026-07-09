"use client";

import React from "react";
import { Brain } from "lucide-react";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">

      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
              <Brain className="w-5 h-5 text-white" />
            </div>

            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              PrepWise
            </span>
          </div>

          <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
            MVP Release
          </span>
        </div>
      </header>

      <main>
        <HeroSection />
      </main>

    </div>
  );
}