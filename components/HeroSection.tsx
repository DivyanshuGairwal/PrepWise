import React from "react";
import {
  Sparkles,
  Terminal,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

export default function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/15 blur-[140px] rounded-full" />
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Built for Software Engineers
        </div>

        {/* Headline */}
        <h1 className="max-w-5xl mx-auto text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-white">
          Land Your Next Interview
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-300 bg-clip-text text-transparent">
            With AI-Powered Preparation
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-zinc-400 leading-relaxed">
          Upload your resume and job description to instantly generate
          personalized technical, behavioral, project-based, and HR interview
          questions with structured answer guidance.
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <button
            onClick={onStartClick}
            className="group px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 shadow-[0_0_40px_rgba(99,102,241,0.35)] flex items-center gap-3"
          >
            Start Preparing Free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-zinc-500">
          <div>
            <span className="text-white font-bold">12+</span> Personalized
            Questions
          </div>
          <div>
            <span className="text-white font-bold">4</span> Interview
            Categories
          </div>
          <div>
            <span className="text-white font-bold">PDF</span> Resume Analysis
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <div className="p-7 rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-left hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center mb-5">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Resume Analysis
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Extracts projects, skills, achievements, and experience directly
              from your resume.
            </p>
          </div>

          <div className="p-7 rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-left hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-5">
              <Terminal className="w-6 h-6 text-purple-400" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Job-Specific Questions
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Tailors interview questions according to the exact job role and
              company requirements.
            </p>
          </div>

          <div className="p-7 rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-left hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center mb-5">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Answer Guidance
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Learn why questions are asked and how to structure strong,
              interview-ready answers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}