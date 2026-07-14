"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  Brain,
  FileBarChart,
} from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: FileText,
    title: "Upload Resume",
    description:
      "Upload your PDF resume to extract skills, projects, education, and experience.",
  },
  {
    icon: Briefcase,
    title: "Paste Job Description",
    description:
      "Paste the job description so PrepWise can understand the target role and expectations.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "PrepWise compares your resume against the role requirements and identifies interview focus areas.",
  },
  {
    icon: FileBarChart,
    title: "Interview Report",
    description:
      "Get role match insights, interview questions, and preparation recommendations instantly.",
  },
];

export default function HowItWorks() {
  const router = useRouter();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-[0.3em]">
            Simple Process
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Get Interview Ready In Minutes
          </h2>

          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Upload your resume and job description to receive interview questions,
            role match insights, and a personalized preparation report.
          </p>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mt-6 text-sm text-zinc-600"
          >
            Resume → Job Description → AI Analysis → Interview Report
          </motion.div>
        </motion.div>

        {/* Cards */}

        <div className="relative">

          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">

            {steps.map((step, index) => {
              const Icon = step.icon;

              const isFirstCard = index === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  whileHover={{
  y: -12,
  scale: 1.04,
}}
animate={
  isFirstCard
    ? {
        boxShadow: [
          "0 0 0px rgba(99,102,241,0)",
          "0 0 60px rgba(99,102,241,0.35)",
          "0 0 0px rgba(99,102,241,0)",
        ],
      }
    : {}
}
                  onClick={
                    isFirstCard
                      ? () => router.push("/workspace")
                      : undefined
                  }
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-6
                    transition-all
                    duration-300
                    hover:border-indigo-500/40
                   ${
  isFirstCard
    ? "cursor-pointer border-indigo-500/30 bg-indigo-500/[0.04] hover:border-indigo-400 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"
    : ""
}
                  `}
                >
                  {/* Hover Glow */}

                  {isFirstCard && (
  <motion.div
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.3, 0.15],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
    }}
    className="
      absolute
      -top-20
      -left-20
      w-56
      h-56
      rounded-full
      bg-indigo-500
      blur-[100px]
      pointer-events-none
    "
  />
)}

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                      bg-gradient-to-br
                      from-indigo-500/5
                      via-transparent
                      to-indigo-500/10
                    "
                  />

                  {/* Number */}

                  <div className="absolute top-3 right-4 text-6xl font-black text-white/[0.03]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}

                  <motion.div
                    animate={{
                      y: [0, -5, 0],
rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
  mt-6
  inline-flex
  items-center
  gap-2
  px-4
  py-2
  rounded-full
  border
  border-indigo-500/20
  bg-indigo-500/15
  text-indigo-300
  text-sm
  font-semibold
"
                  >
                    <Icon className="w-7 h-7 text-indigo-400" />
                  </motion.div>

                  <p className="text-zinc-500 text-sm mb-2">
                    Step {index + 1}
                  </p>

                  <h3 className="text-white font-bold text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {isFirstCard && (
  <motion.div
    animate={{
      x: [0, 6, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
    }}
    className="
      mt-6
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      bg-indigo-500/10
      text-indigo-400
      text-sm
      font-medium
    "
  >
    Launch Workspace →
  </motion.div>
)}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}