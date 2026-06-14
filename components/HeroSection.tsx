import React from "react";
import { Sparkles, Terminal, FileText, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

export default function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background radial lights */}
      <div className="radial-glow top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-600" />
      <div className="radial-glow bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* SaaS Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6 animate-pulse-slow">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Powered by OPENAI</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Prepare Smarter for Every Interview <br />
          <span className="text-gradient">Personalized AI Precision</span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed">
          Upload your resume and a job description to get personalized technical, behavioral, and HR interview questions tailored to your experience.
          </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onStartClick}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-600/35 flex items-center gap-3 cursor-pointer"
          >
            <span>Start Preparing Free</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {/* Key Features / Explanations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-4 text-left">
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-500/15 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">Resume Deep Dive</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Extracts text from your PDF resume, parsing your projects, experiences, and technical skills automatically.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div className="w-12 h-12 bg-purple-500/15 rounded-xl flex items-center justify-center mb-4">
              <Terminal className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">Role Customization</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Analyzes job requirements, company stack, and role level to align interview content with the interviewer's exact expectations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">3 Answering Strategies</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Generates Technical, Resume, Behavioral, and HR questions complete with why they are asked and key points to emphasize.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
