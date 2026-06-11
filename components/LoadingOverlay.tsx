import React, { useState, useEffect } from "react";
import { Loader2, Sparkles, Cpu, Eye, ShieldCheck, Target } from "lucide-react";

const TIPS = [
  { text: "Reading and extracting text structure from your PDF resume...", icon: Cpu },
  { text: "Mapping candidate skills and experiences against job keywords...", icon: Target },
  { text: "Generating 10 custom Technical questions for systems & domains...", icon: Sparkles },
  { text: "Designing 10 Resume-based questions targeting specific projects...", icon: Eye },
  { text: "Structuring 10 Behavioral questions based on required soft skills...", icon: ShieldCheck },
  { text: "Drafting 10 HR alignment questions for expectations & goals...", icon: Target },
];

export default function LoadingOverlay() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = TIPS[tipIndex].icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md">
      <div className="radial-glow w-[350px] h-[350px] bg-indigo-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25" />

      <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full text-center relative border border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
        {/* Glowing Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10" />
          <Loader2 className="w-20 h-20 text-indigo-500 animate-spin absolute inset-0" />
        </div>

        {/* Loading Header */}
        <h3 className="text-xl font-bold text-zinc-100 mb-2">Generating Interview Kit</h3>
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-6">
          Analyzing resume + Job description
        </p>

        {/* Dynamic Tip / Step Progress Indicator */}
        <div className="min-h-[80px] p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl flex flex-col justify-center items-center transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-indigo-500/15 flex items-center justify-center mb-2.5">
            <ActiveIcon className="w-4 h-4 text-indigo-400 animate-bounce" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-[280px]">
            {TIPS[tipIndex].text}
          </p>
        </div>

        {/* Wait disclaimer */}
        <p className="text-[10px] text-zinc-600 mt-6 leading-relaxed">
          This may take up to 20-30 seconds depending on network load. <br />
          Gemini is constructing 40 comprehensive questions.
        </p>
      </div>
    </div>
  );
}
