"use client";

import { useRef } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  ArrowLeftRight,
  FileText,
  ArrowRight,
  Clock,
  ShieldCheck,
  Lock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared tokens — identical to the rest of PrepWise                   */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;
const GLOW =
  "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px -12px rgba(139,92,246,0.25)";
const MONO = "'JetBrains Mono', monospace";

/* ------------------------------------------------------------------ */
/*  Word-by-word reveal — same technique as the current hero            */
/* ------------------------------------------------------------------ */

function RevealLine({ text, delayStart = 0 }: { text: string; delayStart?: number }) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: delayStart + i * 0.04, ease: EASE }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic CTA wrapper                                                */
/* ------------------------------------------------------------------ */

function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.2 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust section — sits under the CTA, its own visual block            */
/*  Policy claims only (time / storage / sharing) — no invented usage   */
/*  numbers. Edit the copy to match what's actually true of your        */
/*  backend before shipping this.                                       */
/* ------------------------------------------------------------------ */

const TRUST_ITEMS = [
  { icon: Clock, text: "Ready in about a minute" },
  { icon: ShieldCheck, text: "Your resume isn't stored after your session" },
  { icon: Lock, text: "Never shared with anyone else" },
];

function TrustRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.25, ease: EASE }}
      className="mt-7 flex flex-col gap-2.5 border-t border-white/[0.06] pt-6 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5"
    >
      {TRUST_ITEMS.map(({ icon: Icon, text }) => (
        <span key={text} className="flex items-center gap-2 text-[12.5px] text-[#8A8D94]">
          <Icon size={13} className="shrink-0 text-[#5C5C63]" />
          {text}
        </span>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Proof card — a real generated report, not a fake metric             */
/*                                                                      */
/*  No invented scores or counts. It shows the actual shape of what     */
/*  PrepWise produces — focus areas and real sample questions, in the   */
/*  same categories and format the rest of the product uses — labeled  */
/*  honestly as an example rather than implying a computed result.      */
/* ------------------------------------------------------------------ */

const FOCUS_AREAS = ["React internals", "System design fundamentals", "Behavioral"];

const SAMPLE_QUESTIONS = [
  { tag: "SYSTEM DESIGN", text: "How would you scale this to 10M users?" },
  { tag: "BEHAVIORAL", text: "Tell me about a conflict with a teammate." },
];

function ProofCard() {
  const springX = 0;
  const springY = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      className="relative mx-auto w-full max-w-sm md:mx-0"
    >
      {/* decorative stack behind — depth only, no content of its own */}
      <div className="absolute inset-0 rotate-[-5deg] rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
      <div className="absolute inset-0 rotate-[3deg] rounded-2xl border border-white/[0.06] bg-white/[0.02]" />

      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
      >
        <div style={{ boxShadow: GLOW }} className="absolute inset-0 rounded-2xl" />

        {/* header — this is the report, not the inputs */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
            <FileText size={16} className="text-[#A78BFA]" />
          </div>
          <div>
            <p className="text-[14.5px] font-semibold text-[#F5F5F7]">Interview Brief</p>
            <p className="text-[12px] text-[#5C5C63]">Example — Senior Frontend Engineer</p>
          </div>
        </div>

        <div className="relative my-5 h-px w-full bg-white/[0.06]" />

        {/* focus areas — categorical, not a score */}
        <div className="relative">
          <span
            className="text-[10px] font-medium tracking-wider text-[#9A9AA2]"
            style={{ fontFamily: MONO }}
          >
            FOCUS AREAS
          </span>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {FOCUS_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11.5px] text-[#D3D4D8]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="relative my-5 h-px w-full bg-white/[0.06]" />

        {/* sample questions — the real deliverable, same format the product actually uses */}
        <div className="relative">
          <span
            className="text-[10px] font-medium tracking-wider text-[#9A9AA2]"
            style={{ fontFamily: MONO }}
          >
            SAMPLE QUESTIONS
          </span>
          <div className="mt-2.5 space-y-2.5">
            {SAMPLE_QUESTIONS.map((q) => (
              <div
                key={q.text}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-3"
              >
                <span
                  className="text-[10px] font-medium tracking-wider text-[#C4B5FD]"
                  style={{ fontFamily: MONO }}
                >
                  {q.tag}
                </span>
                <p className="mt-1 text-[13px] leading-snug text-[#E4E4E7]">{q.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative mt-5 text-[11.5px] leading-relaxed text-[#5C5C63]">
          Your full brief includes more questions across every category —
          built from your resume and the role you provide.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — drop-in replacement.                                         */
/*  Same props as the existing Hero() inside PrepWiseLanding, so it     */
/*  swaps in directly. Assumes the parent page already renders          */
/*  AmbientGlow / MouseSpotlight / Vignette — this component is content */
/*  only, so you don't end up with duplicate background layers.         */
/* ------------------------------------------------------------------ */

interface HeroProps {
  onAnalyze: () => void;
}

export default function Hero({ onAnalyze }: HeroProps) {
  return (
    <section className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-28 pt-20 md:grid-cols-2 md:items-center md:gap-10 md:pt-28">
      {/* left — the pitch */}
      <div className="text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-xl"
        >
          <ArrowLeftRight size={12} className="text-[#A78BFA]" />
          <span
            className="text-[11px] font-medium tracking-[0.14em] text-[#9A9AA2]"
            style={{ fontFamily: MONO }}
          >
            RESUME-MATCHED INTERVIEW PREP
          </span>
        </motion.div>

        <h1 className="max-w-xl text-[38px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#F5F5F7] sm:text-[46px] md:text-[52px]">
          <RevealLine text="Practice the questions" delayStart={0.15} />
          <RevealLine text="your next interviewer" delayStart={0.4} />
          <RevealLine text="will actually ask." delayStart={0.65} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
          className="mt-6 max-w-md text-[15.5px] leading-relaxed text-[#9A9AA2]"
        >
          Upload your resume and the job description. PrepWise compares them
          and gives you the exact questions to expect and the gaps worth
          closing — in under a minute.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
          className="mt-8"
        >
          <Magnetic strength={0.25}>
            <button
              onClick={onAnalyze}
              className="group flex items-center gap-2 rounded-xl bg-[#F5F5F7] px-6 py-3.5 text-[14px] font-semibold text-[#0A0A0A] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_16px_40px_-10px_rgba(139,92,246,0.55)]"
            >
              Upload Resume &amp; Job Description
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </Magnetic>
        </motion.div>

        <TrustRow />
      </div>

      {/* right — the proof: a real generated report, honestly labeled */}
      <ProofCard />
    </section>
  );
}
