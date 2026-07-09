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

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const activeStep = Math.min(
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                Generating Your Interview Questions
              </h3>

              <p className="text-sm text-zinc-500">
                Preparing Personalized Questions
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
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    completed
                      ? "border-green-500/20 bg-green-500/5"
                      : active
                      ? "border-indigo-500/30 bg-indigo-500/5"
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
                    <Icon
                      className={`w-5 h-5 ${
                        completed
                          ? "text-green-400"
                          : active
                          ? "text-indigo-400"
                          : "text-zinc-500"
                      }`}
                    />
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
              <span>{progress}%</span>
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

          <p className="text-center text-xs text-zinc-600 mt-6">
            Analyzing resume, matching role requirements and generating
            personalized interview questions.
          </p>

        </div>
      </motion.div>
    </div>
  );
}