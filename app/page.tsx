"use client";

import React, { useState, useRef } from "react";
import { Sparkles, AlertCircle, FileQuestion, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ResumeUpload from "@/components/ResumeUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ResultsView from "@/components/ResultsView";
import LoadingOverlay from "@/components/LoadingOverlay";
import { AnalysisResult, AnalysisResponse } from "@/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  // Validation errors
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [jdError, setJdError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isQuotaError, setIsQuotaError] = useState(false);

  const workspaceRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeError(null);
    setJdError(null);
    setGlobalError(null);
    setIsQuotaError(false);

    let hasError = false;

    if (!file) {
      setResumeError("Please upload your resume PDF.");
      hasError = true;
    }

    if (!jobDescription || jobDescription.trim() === "") {
      setJdError("Please paste a target job description.");
      hasError = true;
    }

    if (hasError) {
      workspaceRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result: AnalysisResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to analyze document.");
      }

      if (result.data) {
        setResults(result.data);
      } else {
        throw new Error("No data returned from analytical model.");
      }
    } catch (err: any) {
      console.error(err);
      const errMsg: string = err.message || "An unexpected error occurred. Please verify your file and try again.";
      const quotaRelated = errMsg.includes("quota") || errMsg.includes("Too Many Requests");
      setIsQuotaError(quotaRelated);
      setGlobalError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription("");
    setResults(null);
    setGlobalError(null);
    setResumeError(null);
    setJdError(null);
    setIsQuotaError(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500/35 selection:text-white">
      {/* Header bar */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
              <FileQuestion className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              PrepWise
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
              MVP Release
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && <LoadingOverlay />}

        {!results ? (
          <div className="space-y-16">
            {/* Hero Section */}
            <HeroSection onStartClick={handleStartClick} />

            {/* Input Workspace Block */}
            <div
              ref={workspaceRef}
              id="prep-workspace"
              className="scroll-mt-20 max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                  Build Your Practice Kit
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Upload your documents below to configure the AI generator.
                </p>
              </div>

              {/* Form container */}
              <form onSubmit={handleGenerate} className="space-y-8">
                {globalError && !isQuotaError && (
                  <div className="flex items-start gap-3 p-4 bg-red-950/20 border border-red-500/30 rounded-2xl text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Generation Failed</h4>
                      <p className="text-xs text-red-400/80 mt-0.5 leading-relaxed">
                        {globalError}
                      </p>
                    </div>
                  </div>
                )}

                {isQuotaError && (
                  <div className="flex items-start gap-3 p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl text-amber-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-300">AI API Quota Exhausted</h4>
                      <p className="text-xs text-amber-400/80 mt-1 leading-relaxed">
                        Your AI API free-tier daily quota has been fully used up. You have two options:
                      </p>
                      <ul className="text-xs text-amber-400/70 mt-2 list-disc list-inside space-y-1">
                        <li>Wait until your quota resets (usually midnight Pacific Time) and try again.</li>
                        <li>
                          Enable billing on your{" "}
                          <a
                            href="https://aistudio.google.com/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-amber-300 hover:text-amber-200"
                          >
                            Google AI Studio account
                          </a>{" "}
                          to get higher rate limits.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Left Column: File Upload */}
                  <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
                    <ResumeUpload
                      selectedFile={file}
                      onFileSelect={setFile}
                      error={resumeError}
                      setError={setResumeError}
                    />
                  </div>

                  {/* Right Column: Job Description Textarea */}
                  <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
                    <JobDescriptionInput
                      value={jobDescription}
                      onChange={setJobDescription}
                      error={jdError}
                    />
                  </div>
                </div>

                {/* Generate Action Button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition duration-300 transform hover:scale-[1.01] shadow-xl shadow-indigo-600/15 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Generate Interview Prep Kit</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Results View Dashboard */
          <ResultsView data={results} onReset={handleReset} />
        )}
      </main>

      {/* Footer bar */}
      <footer className="border-t border-zinc-900 bg-zinc-950/30 py-6 text-center text-xs text-zinc-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PrepWise AI. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-500 transition">Interactive Mock Prep</span>
            <span>•</span>
            <span className="hover:text-zinc-500 transition">AI-Powered Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
