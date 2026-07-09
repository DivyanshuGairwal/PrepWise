import React from "react";
import {
  Briefcase,
  AlertTriangle,
  Wand2,
  Target,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  error: string | null;
}

const SAMPLE_JOB_DESC = `Role: Senior Full Stack Engineer (React / Node.js)
Location: Remote (US/Canada)

About the Role:
We are looking for a Senior Full Stack Engineer to join our core product team. You will lead the development of high-performance user interfaces and build scalable API architectures.

Requirements:
- React
- Next.js
- TypeScript
- Node.js
- PostgreSQL
- Redis
- Jest
`;

export default function JobDescriptionInput({
  value,
  onChange,
  error,
}: JobDescriptionInputProps) {
  const handleLoadSample = () => {
    onChange(SAMPLE_JOB_DESC);
  };

  const wordCount = value.trim()
    ? value.trim().split(/\s+/).length
    : 0;

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}

      <div className="flex items-start justify-between mb-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-indigo-400" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-zinc-100">
              Role Intelligence Input
            </h3>

            <p className="text-xs text-zinc-500">
              Job Description • Hiring Signals
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1.5 transition"
        >
          <Wand2 className="w-3.5 h-3.5" />
          Load Sample
        </button>
      </div>

      {/* TEXTAREA */}

      <div className="relative flex-1">

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the target role, requirements, responsibilities, tech stack, seniority level and expectations..."
          className={`w-full min-h-[260px] bg-zinc-900/40 border rounded-3xl p-5 text-sm text-zinc-200 placeholder-zinc-500 resize-none leading-relaxed transition ${
            error
              ? "border-red-500/40"
              : "border-zinc-800 focus:border-indigo-500"
          }`}
        />

        {value.length === 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pointer-events-none">

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-500 text-xs">
              React
            </span>

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-500 text-xs">
              Node.js
            </span>

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-500 text-xs">
              TypeScript
            </span>

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-500 text-xs">
              Leadership
            </span>

          </div>
        )}
      </div>

      {/* FOOTER */}

      <div className="mt-4 flex items-center justify-between">

        <div className="flex gap-2 flex-wrap">

          <div className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Requirements
          </div>

          <div className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            Responsibilities
          </div>

          <div className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Skills
          </div>

        </div>

        <div className="text-xs text-zinc-500">
          {wordCount} words
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 mt-3 p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-red-400 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}