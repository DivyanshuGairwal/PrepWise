"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "SYSTEM DESIGN",
    text: "How would you scale this to 10M users?",
    className: "top-16 left-10 -rotate-6",
  },
  {
    title: "BEHAVIORAL",
    text: "Tell me about a conflict with a teammate.",
    className: "top-24 right-10 rotate-6",
  },
  {
    title: "TECHNICAL",
    text: "Walk me through the trade-offs in this design.",
    className: "bottom-32 left-20 rotate-3",
  },
  {
    title: "FOLLOW-UP",
    text: "Why did you leave this role after 8 months?",
    className: "bottom-24 right-20 -rotate-3",
  },
];

export default function HeroSection() {
  const router = useRouter();

  const [leaving, setLeaving] = useState(false);


  const handleNavigate = () => {
    setLeaving(true);

    setTimeout(() => {
      router.push("/workspace");
    }, 350);
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-8 min-h-[75vh]">
      {/* Mouse Spotlight */}

      {/* Ambient Glow */}



      {/* Floating Cards */}

      <div className="hidden xl:block">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`absolute ${card.className} z-10`}
            initial={{
              opacity: 0,
              scale: 0.8,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              y: [0, -12, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: index * 0.15,
              },
              scale: {
                duration: 0.8,
                delay: index * 0.15,
              },
              y: {
                duration: 6 + index,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="
                w-64
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-4
              "
            >
              <p className="text-xs tracking-widest text-indigo-400 font-medium">
                {card.title}
              </p>

              <p className="mt-2 text-sm text-zinc-300">
                {card.text}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6"
        animate={{
          opacity: leaving ? 0 : 1,
          y: leaving ? -30 : 0,
          scale: leaving ? 0.98 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Interview Intelligence Platform
          </div>
        </motion.div>

        {/* Heading */}

        <div className="text-center mt-10">
          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
            }}
            className="
              text-5xl
              md:text-7xl
              font-black
              tracking-tight
              leading-[0.95]
            "
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Know Every Question
            </motion.span>

            <br />

            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
              }}
              className="
                bg-gradient-to-r
                from-white
                via-zinc-300
                to-indigo-400
                bg-clip-text
                text-transparent
              "
            >
              Before The Interview Starts
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
            }}
            className="
              max-w-2xl
              mx-auto
              mt-8
              text-lg
              text-zinc-500
              leading-relaxed
            "
          >
            Upload your resume and a job description. PrepWise analyzes
            your experience, identifies likely interview focus areas,
            and generates realistic questions tailored to the exact role
            you're applying for.
          </motion.p>
        </div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
          }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow:
                "0px 0px 80px rgba(99,102,241,0.35)",
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleNavigate}
            className="
              group
              px-10
              py-5
              rounded-2xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              text-white
              font-semibold
              hover:bg-white/10
              hover:border-white/20
              transition-all
              duration-300
              shadow-[0_0_60px_rgba(99,102,241,0.25)]
              flex
              items-center
              gap-3
            "
          >
            Analyze My Resume

            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}