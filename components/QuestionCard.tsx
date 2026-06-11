import React, { useState } from "react";
import { Copy, ChevronDown, ChevronUp, Check, Lightbulb, MessageSquareCode, Sparkles } from "lucide-react";
import { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  index: number;
  colorTheme: {
    primary: string;
    bg: string;
    border: string;
    text: string;
  };
}

export default function QuestionCard({ question, index, colorTheme }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid toggling expansion when clicking copy
    try {
      await navigator.clipboard.writeText(question.question);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy question text", err);
    }
  };

  return (
    <div
      className={`border rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/60 overflow-hidden transition-all duration-300 ${
        isOpen ? `${colorTheme.border} shadow-lg shadow-zinc-950` : "border-zinc-800"
      }`}
    >
      {/* Header section (Click to toggle) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold shrink-0 ${colorTheme.bg} ${colorTheme.text}`}
          >
            {index + 1}
          </span>
          <p className="text-zinc-100 font-medium text-sm sm:text-base leading-relaxed">
            {question.question}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
            title="Copy question to clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          
          <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expandable Answering Guide */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-zinc-800 bg-zinc-950/20 text-sm animate-fade-in">
          {/* Why they ask */}
          <div className="mt-4 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-300 text-xs uppercase tracking-wider mb-1">
                Why Interviewers Ask This
              </h5>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {question.whyAsked}
              </p>
            </div>
          </div>

          {/* Answering Approach */}
          <div className="mt-5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-300 text-xs uppercase tracking-wider mb-1">
                Suggested Answering Strategy
              </h5>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {question.suggestedApproach}
              </p>
            </div>
          </div>

          {/* Key Bullet Points / Keywords to Mention */}
          {question.keyPoints && question.keyPoints.length > 0 && (
            <div className="mt-5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-zinc-300 text-xs uppercase tracking-wider mb-2">
                  Keywords & Points to Emphasize
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {question.keyPoints.map((pt, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800/80 border border-zinc-700/50 text-zinc-300"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Answer Sandbox / Practice Area */}
          <div className="mt-6 pt-5 border-t border-zinc-800/60">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareCode className="w-4 h-4 text-zinc-400" />
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Practice Draft Sandbox
              </label>
              {draft.length > 0 && (
                <span className="text-[10px] text-zinc-600">({draft.length} chars)</span>
              )}
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Outline your response here to practice..."
              className="w-full min-h-[90px] max-h-[200px] p-3 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-300 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-zinc-700 transition duration-200 resize-y"
            />
          </div>
        </div>
      )}
    </div>
  );
}
