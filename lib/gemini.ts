import { AnalysisResult, Question } from "@/types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// Primary model + free fallbacks in order of preference
const MODEL_CASCADE = [
   "openai/gpt-oss-20b:free",
  "openai/gpt-oss-120b:free",
  "google/gemma-3-4b-it:free",
];

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
    code?: number;
  };
}

function buildPrompt(resumeText: string, jobDescription: string): string {
  return `You are an elite technical interviewer, hiring manager, and talent acquisition specialist.

Analyze the candidate's resume and the target job description. Generate a comprehensive, highly personalized interview preparation kit.

Return ONLY a valid JSON object — no markdown, no explanation, no code fences. The JSON must match this exact structure:
{
  "technical": [ <3question objects> ],
  "resume": [ <3 question objects> ],
  "behavioral": [ <3 question objects> ],
  "hr": [ <3 question objects> ]
}

Each question object must have EXACTLY these fields:
{
  "id": "<unique string like tech_1, resume_3, etc.>",
  "question": "<the interview question text>",
  "whyAsked": "<why interviewers ask this specific question>",
  "suggestedApproach": "<how the candidate should structure their answer>",
  "keyPoints": ["<point 1>", "<point 2>", "<point 3>"]
}

Requirements:
- technical: 3 questions focused on tech stack, system design, and domain knowledge required by the job description
- resume: 3 questions digging into specific projects, achievements, and experiences listed in the resume
- behavioral: 3 STAR-method questions (leadership, conflict, deadlines, collaboration) tailored to the role level
- hr: 3 questions on motivations, salary expectations, culture fit, and career goals

Every question MUST be personalized — reference specific technologies, projects, or companies from the resume and job description. Avoid generic questions.

Resume:
"""
${resumeText.substring(0, 8000)}
"""

Job Description:
"""
${jobDescription.substring(0, 4000)}
"""`;
}

function isRateLimitError(error: any): boolean {
  const msg = error?.message || "";
  return (
    msg.includes("rate limit") ||
    msg.includes("Rate limit") ||
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("Too Many Requests") ||
    msg.includes("overloaded")
  );
}

async function callOpenRouter(
  model: string,
  messages: OpenRouterMessage[]
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      "OpenRouter API key is not configured. Please add OPENROUTER_API_KEY to your .env.local file."
    );
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://prepwise.app",
      "X-Title": "PrepWise - Interview Prep",
    },
    body: JSON.stringify({
      model,
      messages,
      body: JSON.stringify({
  model,
  messages,
  temperature: 0.7,
  max_tokens: 4000,
})

    }),
  });

  const data: OpenRouterResponse = await response.json();

  // Handle API-level errors
  if (!response.ok || data.error) {
    const errorMsg = data.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    const err = new Error(errorMsg);
    (err as any).status = response.status;
    throw err;
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return content;
}

function parseAndValidate(raw: string): AnalysisResult {
  // Strip any accidental markdown code fences just in case
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  const normalizeQuestions = (arr: any[], prefix: string): Question[] => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 10).map((q: any, i: number) => ({
      id: q.id || `${prefix}_${i + 1}`,
      question: q.question || "",
      whyAsked: q.whyAsked || q.why_asked || "",
      suggestedApproach: q.suggestedApproach || q.suggested_approach || "",
      keyPoints: Array.isArray(q.keyPoints)
        ? q.keyPoints
        : Array.isArray(q.key_points)
        ? q.key_points
        : [],
    }));
  };

  return {
    technical: normalizeQuestions(parsed.technical || [], "tech"),
    resume: normalizeQuestions(parsed.resume || [], "resume"),
    behavioral: normalizeQuestions(parsed.behavioral || [], "behavioral"),
    hr: normalizeQuestions(parsed.hr || [], "hr"),
  };
}

export async function generateInterviewQuestions(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      "OpenRouter API key is not configured. Please add OPENROUTER_API_KEY to your .env.local file."
    );
  }

  const messages: OpenRouterMessage[] = [
    {
      role: "system",
      content:
        "You are an expert interview coach. You always respond with valid JSON only — no markdown, no explanation, just the raw JSON object.",
    },
    {
      role: "user",
      content: buildPrompt(resumeText, jobDescription),
    },
  ];

  let lastError: any = null;

  for (const model of MODEL_CASCADE) {
    try {
      console.log(`[PrepWise] Trying OpenRouter model: ${model}`);
      const rawResponse = await callOpenRouter(model, messages);
     console.log(rawResponse);
      const result = parseAndValidate(rawResponse);
      console.log(`[PrepWise] Success with model: ${model}`);
      return result;
    } catch (error: any) {
      lastError = error;
      console.error(
        `[PrepWise] Model ${model} failed:`,
        error?.status,
        error?.message?.substring(0, 150)
      );

      if (isRateLimitError(error)) {
        console.log(`[PrepWise] Rate limit hit on ${model}, trying next...`);
        continue;
      }

      // JSON parse error — try next model as output may be malformed
      if (error instanceof SyntaxError) {
        console.log(`[PrepWise] JSON parse failed on ${model}, trying next...`);
        continue;
      }

      // Auth error — fail immediately, no point trying other models
      if (error?.status === 401 || error?.message?.includes("401")) {
        throw new Error(
          "Invalid OpenRouter API key. Please check your OPENROUTER_API_KEY in .env.local."
        );
      }

      // For other errors, try next model
      continue;
    }
  }

  // All models failed
  console.error("[PrepWise] All models in cascade failed. Last error:", lastError?.message);

  if (isRateLimitError(lastError)) {
    throw new Error(
      "All available free models are currently rate-limited. Please wait a minute and try again, or visit https://openrouter.ai to check model availability."
    );
  }

  throw new Error(
    lastError?.message ||
      "Failed to generate interview questions. Please try again."
  );
}
