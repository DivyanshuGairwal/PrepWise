"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  
  {
    label: "Parsing Resume",
    icon: FileText,
  },
  {
    label: "Extracting Skills",
    icon: Brain,
  },
  {
    label: "Matching Job Profile",
    icon: Target,
  },
  {
    label: "Generating Questions",
    icon: Sparkles,
  },
  {
    label: "Building Intelligence Report",
    icon: CheckCircle2,
  },
  
];

const WAITING_MESSAGES = [
  "Analyzing project architecture...",
  "Matching role requirements...",
  "Generating follow-up questions...",
  "Building intelligence report...",
  "Optimizing interview insights...",
];

interface LoadingOverlayProps {
  analysisComplete: boolean;
}

export default function LoadingOverlay({
  analysisComplete,
}: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
const [messageIndex, setMessageIndex] = useState(0);
const [dots, setDots] = useState("");

useEffect(() => {
  if (analysisComplete) {
    setProgress(100);
    return;
  }

  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 95) return 95;
      return prev + 1;
    });
  }, 180);

  return () => clearInterval(interval);
}, [analysisComplete]);

useEffect(() => {
  if (analysisComplete) return;

  const interval = setInterval(() => {
    setMessageIndex(
      (prev) =>
        (prev + 1) % WAITING_MESSAGES.length
    );
  }, 2000);

  return () => clearInterval(interval);
}, [analysisComplete]);

useEffect(() => {
  const interval = setInterval(() => {
    setDots((prev) => {
      if (prev.length >= 3) return "";
      return prev + ".";
    });
  }, 500);

  return () => clearInterval(interval);
}, []);

  const activeStep = analysisComplete
  ? 4
  : progress >= 95
  ? 3
  : Math.min(
      Math.floor(progress / 20),
      STEPS.length - 1
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="w-full max-w-xl mx-6"
      >
        <div className="glass-panel rounded-3xl p-8 border border-zinc-800">

          <div className="flex items-center gap-3 mb-8">
            <div
  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
    analysisComplete
      ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
      : "bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600"
  }`}
>
              {analysisComplete ? (
  <CheckCircle2 className="w-6 h-6 text-white" />
) : (
  <Brain className="w-6 h-6 text-white" />
)}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
  {analysisComplete
    ? "Interview Kit Ready"
    : "Generating Your Interview Questions"}
</h3>

              <p className="text-sm text-zinc-500">
  {analysisComplete
    ? "Report generated successfully"
    : "Preparing Personalized Questions"}
</p>
            </div>
          </div>

          <div className="space-y-4">

            {STEPS.map((step, index) => {
              const Icon = step.icon;

              const completed =
                index < activeStep;

              const active =
                index === activeStep;

              return (
                <motion.div
  key={step.label}
  animate={
    active
      ? {
          scale: [1, 1.04, 1],
          boxShadow: [
  "0 0 0px rgba(99,102,241,0)",
  "0 0 40px rgba(99,102,241,0.35)",
  "0 0 0px rgba(99,102,241,0)",
]
        }
      : {}
  }
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    completed
                      ? "border-green-500/20 bg-green-500/5"
                      : active
? "border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                  
                      : "border-zinc-800 bg-zinc-900/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      completed
                        ? "bg-green-500/15"
                        : active
                        ? "bg-indigo-500/15"
                        : "bg-zinc-800"
                    }`}
                  >
                    <motion.div
  animate={
    active
      ? {
          rotate: [0, 10, -10, 0],
        }
      : {}
  }
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  <Icon
    className={`w-5 h-5 ${
      completed
        ? "text-green-400"
        : active
        ? "text-indigo-400"
        : "text-zinc-500"
    }`}
  />
</motion.div>
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">
                      {step.label}
                    </div>
                  </div>

                  {completed && (
  <CheckCircle2 className="w-5 h-5 text-green-400" />
)}
</motion.div>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Progress</span>
              <span>
  {analysisComplete
    ? "Interview Kit Ready"
    : `${progress}%`}
</span>
            </div>

            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500"
                animate={{
                  width: `${progress}%`,
                }}
              />
           </div>
</div>

<motion.div
  animate={{
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.4, 1],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
  }}
  className="flex justify-center mt-4"
>
  <div className="w-2 h-2 rounded-full bg-indigo-400" />
</motion.div>

<p className="text-center text-sm text-zinc-400 mt-6 h-5">
  {analysisComplete
    ? "Interview intelligence report generated successfully."
    : progress >= 95
    ? `${WAITING_MESSAGES[messageIndex]}${dots}`
    : "Preparing personalized interview questions..."}
</p>

        </div>
      </motion.div>
    </div>
  );
}