"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  Brain,
  FileBarChart,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Upload Resume",
    description:
      "Upload your PDF resume and let PrepWise extract skills, projects, and experience.",
  },
  {
    icon: Briefcase,
    title: "Paste Job Description",
    description:
      "Provide the target role so PrepWise understands expectations and requirements.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Resume data and job requirements are matched to identify likely interview focus areas.",
  },
  {
    icon: FileBarChart,
    title: "Interview Report",
    description:
      "Receive technical, behavioral, HR, and resume-based interview questions instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background Glow */}
    

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-[0.3em]">
            Workflow
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            How PrepWise Works
          </h2>

          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Upload your resume, paste the target role, and receive a personalized
            interview preparation report in seconds.
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
            Resume → AI Analysis → Interview Report
          </motion.div>
        </motion.div>

        {/* Cards Wrapper */}

        <div className="relative">

          {/* Desktop Connector Line */}

          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">

            {steps.map((step, index) => {
              const Icon = step.icon;

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
                    y: -8,
                    scale: 1.03,
                  }}
                  className="
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
                  "
                >
                  {/* Hover Glow */}

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

                  {/* Giant Number */}

                  <div className="absolute top-3 right-4 text-6xl font-black text-white/[0.03]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Animated Icon */}

                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-indigo-500/10
                      border
                      border-indigo-500/10
                      flex
                      items-center
                      justify-center
                      mb-5
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}