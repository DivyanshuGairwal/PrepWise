import AnimatedCounter from "./AnimatedCounter";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  RefreshCw,
  Download,
  FileText,
  Check,
  Search,
  Terminal,
  Star,
  Sparkles,
  UserCheck,
  Brain,
  Target,
  Layers,
} from "lucide-react";

import { AnalysisResult, QuestionType } from "@/types";
import QuestionCard from "./QuestionCard";

interface ResultsViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

export default function ResultsView({
  data,
  onReset,
}: ResultsViewProps) {
  const [activeTab, setActiveTab] =
    useState<QuestionType>("technical");

  const [copiedAll, setCopiedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allQuestions = [
    ...data.technical,
    ...data.resume,
    ...data.behavioral,
    ...data.hr,
  ];

  const detectedSkills = Array.from(
    new Set(
      allQuestions.flatMap((q) => q.keyPoints)
    )
  ).slice(0, 20);

  const tabThemes = {
    technical: {
      primary: "bg-indigo-600",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/40",
      text: "text-indigo-400",
      icon: Terminal,
      label: "Technical Prep",
      count: data.technical.length,
    },

    resume: {
      primary: "bg-purple-600",
      bg: "bg-purple-500/10",
      border: "border-purple-500/40",
      text: "text-purple-400",
      icon: FileText,
      label: "Resume Deep Dive",
      count: data.resume.length,
    },

    behavioral: {
      primary: "bg-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      icon: Star,
      label: "Behavioral",
      count: data.behavioral.length,
    },

    hr: {
      primary: "bg-amber-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/40",
      text: "text-amber-400",
      icon: UserCheck,
      label: "HR & Culture",
      count: data.hr.length,
    },
  };

  const activeTheme = tabThemes[activeTab];

  const filteredQuestions = useMemo(() => {
    const list = data[activeTab];

    if (!searchQuery.trim()) return list;

    return list.filter((q) =>
      q.question
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [data, activeTab, searchQuery]);

  const handleCopyAll = async () => {
    const text = allQuestions
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join("\n\n");

    await navigator.clipboard.writeText(text);

    setCopiedAll(true);

    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  const handleDownloadMarkdown = () => {
    let content = "# PrepWise Interview Kit\n\n";

    allQuestions.forEach((q, i) => {
      content += `## ${i + 1}. ${q.question}\n\n`;
      content += `Why Asked: ${q.whyAsked}\n\n`;
      content += `Suggested Approach: ${q.suggestedApproach}\n\n`;
      content += "---\n\n";
    });

    const blob = new Blob([content], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "PrepWise-Interview-Kit.md";

    a.click();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="glass-panel rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
              <Sparkles className="w-4 h-4" />
              Interview Prep Report
            </div>

            <h2 className="text-3xl font-black text-white">
                    Interview Prep Report

            </h2>

            <p className="text-zinc-400 mt-2">
              Your resume and job description were analyzed to create personalized interview questions and preparation insights.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">

            <button
              onClick={handleCopyAll}
              className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm flex items-center gap-2"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Kit
                </>
              )}
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            <button
              onClick={onReset}
              className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}

      {/* INTERVIEW OVERVIEW */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="grid md:grid-cols-3 gap-4"
>
  <div className="glass-panel rounded-3xl p-6 border border-zinc-800 hover:border-indigo-500/30 transition-all">
    <Brain className="w-6 h-6 text-indigo-400 mb-4" />

    <div className="text-4xl font-black text-white">
      <>
  <AnimatedCounter value={88} />%
</>
    </div>

    <div className="text-zinc-400 text-sm mt-1">
      Interview Readiness
    </div>

    <div className="text-xs text-zinc-600 mt-3">
      Based on skills, projects and role alignment
    </div>
  </div>

  <div className="glass-panel rounded-3xl p-6 border border-zinc-800 hover:border-purple-500/30 transition-all">
    <Target className="w-6 h-6 text-purple-400 mb-4" />

    <div className="text-4xl font-black text-white">
      <AnimatedCounter value={detectedSkills.length} />
    </div>

    <div className="text-zinc-400 text-sm mt-1">
      Core Skills
    </div>

    <div className="text-xs text-zinc-600 mt-3">
      Technologies and concepts detected
    </div>
  </div>

  <div className="glass-panel rounded-3xl p-6 border border-zinc-800 hover:border-cyan-500/30 transition-all">
    <Layers className="w-6 h-6 text-cyan-400 mb-4" />

    <div className="text-4xl font-black text-white">
      <AnimatedCounter value={allQuestions.length} />
    </div>

    <div className="text-zinc-400 text-sm mt-1">
      Question Bank
    </div>

    <div className="text-xs text-zinc-600 mt-3">
      Personalized interview questions generated
    </div>
  </div>
</motion.div>

      {/* SKILLS */}

      <div className="glass-panel rounded-3xl p-6">
       <h3 className="text-lg font-bold mb-4">
  Interview Focus Areas
</h3>

<p className="text-sm text-zinc-500 mb-4">
  Topics most likely to be discussed based on your resume and target role.
</p>

        <div className="flex flex-wrap gap-2">
          {detectedSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-sm text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN */}

      <div className="flex flex-col lg:flex-row gap-6">

        {/* SIDEBAR */}

        <div className="w-full lg:w-72 flex flex-col gap-2">

          {(Object.keys(tabThemes) as QuestionType[]).map(
            (tabKey) => {
              const tab = tabThemes[tabKey];
              const Icon = tab.icon;

              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    activeTab === tabKey
                      ? `${tab.border} ${tab.bg} shadow-lg shadow-indigo-500/10`
                      : "border-zinc-800 bg-white/[0.02] backdrop-blur-xl"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeTab === tabKey
                          ? tab.primary
                          : "bg-zinc-800"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <div>
                      <div className="font-semibold text-sm">
                        {tab.label}
                      </div>

                      <div className="text-xs text-zinc-500">
                        {tab.count} Questions
                      </div>
                    </div>

                  </div>
                </button>
              );
            }
          )}

        </div>

        {/* QUESTIONS */}

        <div className="flex-1 space-y-4">

          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

            <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-zinc-800 bg-white/[0.02] backdrop-blur-xl focus:border-indigo-500 transition-all"
            />
          </div>

          {filteredQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              colorTheme={activeTheme}
            />
          ))}

        </div>

      </div>
    </div>
  );
}