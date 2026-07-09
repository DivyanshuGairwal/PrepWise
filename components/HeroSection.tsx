"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

export default function HeroSection({
  onStartClick,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-28">

      {/* subtle background */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_55%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* badge */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Interview Intelligence Platform
          </div>
        </motion.div>

        {/* headline */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mt-10"
        >
         <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white">
  Know Every Question
  <br />
  <span className="text-zinc-400">
    Before The Interview Starts
  </span>
</h1>

        <p className="max-w-2xl mx-auto mt-8 text-lg text-zinc-500 leading-relaxed">
  Upload your resume and a job description. PrepWise analyzes your
  experience, identifies likely interview focus areas, and generates
  realistic questions tailored to the exact role you're applying for.
</p>
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={onStartClick}
            className="
group
px-10 py-5
rounded-2xl
border border-white/10
bg-white/5
backdrop-blur-xl
text-white
font-semibold
hover:bg-white/10
hover:border-white/20
transition-all duration-300
shadow-[0_0_40px_rgba(99,102,241,0.15)]
"
          >
            Analyze My Resume

            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}