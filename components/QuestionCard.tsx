import React, { useState } from "react";
import {
  Copy,
  ChevronDown,
  ChevronUp,
  Check,
  Lightbulb,
  MessageSquareCode,
  Sparkles,
} from "lucide-react";
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

export default function QuestionCard({
  question,
  index,
  colorTheme,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(question.question);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy question", err);
    }
  };

  return (
    <div
      className={`border rounded-3xl bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-zinc-700 ${
        isOpen
          ? `${colorTheme.border} shadow-xl shadow-black/20`
          : "border-zinc-800"
      }`}
    >
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
      >
        <div className="flex items-start gap-4 flex-1">
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-black shrink-0 ${colorTheme.bg} ${colorTheme.text} border ${colorTheme.border}`}
          >
            {index + 1}
          </span>

          <div className="flex-1">
            <p className="text-zinc-100 font-semibold text-base sm:text-lg leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400">
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950/30 px-6 pb-6">
          {/* Why Asked */}
          <div className="mt-6 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-indigo-400" />
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                Why Interviewers Ask This
              </h4>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {question.whyAsked}
              </p>
            </div>
          </div>

          {/* Suggested Approach */}
          <div className="mt-6 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Suggested Answer Strategy
              </h4>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {question.suggestedApproach}
              </p>
            </div>
          </div>

          {/* Keywords */}
          {question.keyPoints?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
                Keywords To Mention
              </h4>

              <div className="flex flex-wrap gap-2">
                {question.keyPoints.map((point, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Practice Sandbox */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquareCode className="w-4 h-4 text-zinc-400" />

              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Practice Answer
              </span>

              {draft.length > 0 && (
                <span className="text-[10px] text-zinc-600">
                  ({draft.length} chars)
                </span>
              )}
            </div>

            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your interview answer here..."
              className="w-full min-h-[120px] rounded-2xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 placeholder-zinc-600 p-4 text-sm resize-y focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>
      )}
    </div>
  );
}