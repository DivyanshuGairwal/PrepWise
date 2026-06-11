import React from "react";
import { Briefcase, AlertTriangle, Wand2 } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  error: string | null;
}

const SAMPLE_JOB_DESC = `Role: Senior Full Stack Engineer (React / Node.js)
Location: Remote (US/Canada)

About the Role:
We are looking for a Senior Full Stack Engineer to join our core product team. You will lead the development of high-performance user interfaces and build scalable API architectures. You'll collaborate closely with product managers and designers to deliver premium experiences.

Key Responsibilities:
- Build, optimize, and maintain responsive web applications using React, Next.js (App Router), and TypeScript.
- Design and implement robust backend REST and GraphQL API routes using Node.js.
- Ensure optimal application performance through lazy loading, virtualization, and caching strategy.
- Conduct code reviews, establish technical standards, and mentor junior/mid-level engineers.

Requirements:
- 5+ years of software development experience.
- Deep expertise in TypeScript, React, Next.js, and CSS/Tailwind.
- Extensive experience with Node.js, Express, databases (PostgreSQL/MongoDB), and Redis caching.
- Solid understanding of Web Vitals, server-side rendering (SSR), and CI/CD pipelines.
- Experience writing unit and integration tests (Jest/React Testing Library).`;

export default function JobDescriptionInput({
  value,
  onChange,
  error,
}: JobDescriptionInputProps) {
  
  const handleLoadSample = () => {
    onChange(SAMPLE_JOB_DESC);
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <span>Target Job Description</span>
          {wordCount > 0 && (
            <span className="text-xs font-normal text-zinc-500">
              ({wordCount} words)
            </span>
          )}
        </label>
        
        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Load Sample JD</span>
        </button>
      </div>

      <div className="relative flex-1 flex flex-col">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the target job description here... (include title, requirements, stack, and responsibilities)"
          className={`w-full flex-1 min-h-[200px] bg-zinc-900/40 hover:bg-zinc-900/60 border rounded-2xl p-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none transition duration-300 font-sans resize-none leading-relaxed ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
              : "border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
          }`}
        />
        {value.length === 0 && (
          <div className="absolute right-4 bottom-4 pointer-events-none flex items-center gap-1.5 text-zinc-600 text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Empty</span>
          </div>
        )}
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
