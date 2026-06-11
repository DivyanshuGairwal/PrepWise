import React, { useState, useMemo } from "react";
import { Copy, RefreshCw, Download, FileText, Check, Search, Terminal, Star, Sparkles, UserCheck } from "lucide-react";
import { AnalysisResult, QuestionType } from "@/types";
import QuestionCard from "./QuestionCard";

interface ResultsViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

export default function ResultsView({ data, onReset }: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<QuestionType>("technical");
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      label: "Resume Deep-Dive",
      count: data.resume.length,
    },
    behavioral: {
      primary: "bg-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      icon: Star,
      label: "Behavioral Situations",
      count: data.behavioral.length,
    },
    hr: {
      primary: "bg-amber-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/40",
      text: "text-amber-400",
      icon: UserCheck,
      label: "HR & Cultural Fit",
      count: data.hr.length,
    },
  };

  const activeTheme = tabThemes[activeTab];

  // Search filter
  const filteredQuestions = useMemo(() => {
    const list = data[activeTab] || [];
    if (!searchQuery.trim()) return list;
    
    const query = searchQuery.toLowerCase();
    return list.filter(
      (q) =>
        q.question.toLowerCase().includes(query) ||
        q.whyAsked.toLowerCase().includes(query) ||
        q.suggestedApproach.toLowerCase().includes(query) ||
        q.keyPoints.some((pt) => pt.toLowerCase().includes(query))
    );
  }, [data, activeTab, searchQuery]);

  const handleCopyAll = async () => {
    try {
      const categories: { label: string; list: typeof data.technical }[] = [
        { label: "Technical Questions", list: data.technical },
        { label: "Resume-Based Questions", list: data.resume },
        { label: "Behavioral Questions", list: data.behavioral },
        { label: "HR/Cultural Questions", list: data.hr },
      ];

      const formattedText = categories
        .map(
          (cat) =>
            `=== ${cat.label} ===\n\n` +
            cat.list
              .map(
                (q, i) =>
                  `${i + 1}. Question: ${q.question}\n` +
                  `   Why Asked: ${q.whyAsked}\n` +
                  `   Approach: ${q.suggestedApproach}\n` +
                  `   Keywords: ${q.keyPoints.join(", ")}\n`
              )
              .join("\n")
        )
        .join("\n\n");

      await navigator.clipboard.writeText(formattedText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error("Failed to copy all", err);
    }
  };

  const handleDownloadMarkdown = () => {
    const categories: { label: string; list: typeof data.technical }[] = [
      { label: "Technical Questions", list: data.technical },
      { label: "Resume-Based Questions", list: data.resume },
      { label: "Behavioral Questions", list: data.behavioral },
      { label: "HR/Cultural Questions", list: data.hr },
    ];

    let mdContent = `# PrepWise Custom Interview Preparation Kit\n\n`;
    mdContent += `Generated tailored practice questions based on your resume and job description.\n\n`;

    categories.forEach((cat) => {
      mdContent += `## ${cat.label}\n\n`;
      cat.list.forEach((q, i) => {
        mdContent += `### Q${i + 1}: ${q.question}\n`;
        mdContent += `**Why Interviewers Ask:** ${q.whyAsked}\n\n`;
        mdContent += `**Suggested Strategy:** ${q.suggestedApproach}\n\n`;
        mdContent += `**Key Points to Emphasize:**\n`;
        q.keyPoints.forEach((pt) => {
          mdContent += `- ${pt}\n`;
        });
        mdContent += `\n---\n\n`;
      });
    });

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "PrepWise_Interview_Kit.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      {/* Background decoration blur */}
      <div className="radial-glow top-10 right-10 w-[300px] h-[300px] bg-indigo-600" />
      <div className="radial-glow bottom-20 left-10 w-[350px] h-[350px] bg-purple-600" />

      {/* Header Overview Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-100">Your Custom Interview Kit</h2>
            <p className="text-zinc-400 text-sm mt-1">
              40 expert-crafted, highly personalized questions across 4 domains.
            </p>
          </div>
        </div>

        {/* Global Action items */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleCopyAll}
            className="flex-1 md:flex-none py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-zinc-700 transition cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied All</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Kit</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex-1 md:flex-none py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-zinc-700 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download MD</span>
          </button>

          <button
            onClick={onReset}
            className="flex-1 md:flex-none py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Start Over</span>
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation panel */}
        <div className="w-full lg:w-72 grid grid-cols-2 lg:flex lg:flex-col gap-2 shrink-0">
          {(Object.keys(tabThemes) as QuestionType[]).map((tabKey) => {
            const tab = tabThemes[tabKey];
            const IconComponent = tab.icon;
            const isActive = activeTab === tabKey;

            return (
              <button
                key={tabKey}
                onClick={() => {
                  setActiveTab(tabKey);
                  setSearchQuery("");
                }}
                className={`p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 text-left border cursor-pointer ${
                  isActive
                    ? `${tab.border} ${tab.bg} shadow-md shadow-zinc-950`
                    : "border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-800"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isActive ? tab.primary + " text-white" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-200 leading-tight">
                    {tab.label}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">
                    {tab.count} custom questions
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Internal search bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTheme.label} questions, keywords, or topics...`}
              className="w-full pl-11 pr-4 py-3 bg-zinc-900/30 border border-zinc-800 focus:border-zinc-700 rounded-xl text-sm placeholder-zinc-500 focus:outline-none transition duration-200 leading-none"
            />
          </div>

          {/* List of cards */}
          <div className="flex flex-col gap-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, idx) => (
                <QuestionCard
                  key={q.id || idx}
                  question={q}
                  index={idx}
                  colorTheme={activeTheme}
                />
              ))
            ) : (
              <div className="glass-panel text-center py-16 px-6 rounded-3xl">
                <Search className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-zinc-300">No questions match your query</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Try typing keywords related to skills, projects, or interview topics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
