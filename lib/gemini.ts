import { AnalysisResult, Question } from "@/types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const MODEL_CASCADE = [
  "openai/gpt-oss-20b:free",
  "openai/gpt-oss-120b:free",
  "google/gemma-3-4b-it",
];

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices?: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
    code?: number;
  };
}

function buildPrompt(
  resumeText: string,
  jobDescription: string
): string {
  return `You are an elite technical interviewer, hiring manager, and talent acquisition specialist.

Analyze the candidate's resume and the target job description.

Return ONLY valid JSON.

{
  "technical": [],
  "resume": [],
  "behavioral": [],
  "hr": []
}

Each question object must contain:

{
  "id": "",
  "question": "",
  "whyAsked": "",
  "suggestedApproach": "",
  "keyPoints": []
}

Requirements:

- technical: 3 questions
- resume: 3 questions
- behavioral: 3 questions
- hr: 3 questions

Personalize every question using the resume and job description.

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
    msg.includes("429") ||
    msg.includes("rate limit") ||
    msg.includes("Rate limit") ||
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

  console.log(`[PrepWise] Using model: ${model}`);

  const response = await fetch(
    `${OPENROUTER_BASE_URL}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://prep-wise-dev.vercel.app",
        "X-Title": "PrepWise",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 4000,
      }),
    }
  );

  const data: OpenRouterResponse = await response.json();

  if (!response.ok || data.error) {
    const errorMsg =
      data.error?.message ||
      `HTTP ${response.status}: ${response.statusText}`;

    const err = new Error(errorMsg);
    (err as any).status = response.status;

    throw err;
  }

  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return content;
}

function parseAndValidate(raw: string): AnalysisResult {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  const normalizeQuestions = (
    arr: any[],
    prefix: string
  ): Question[] => {
    if (!Array.isArray(arr)) return [];

    return arr.map((q: any, i: number) => ({
      id: q.id || `${prefix}_${i + 1}`,
      question: q.question || "",
      whyAsked: q.whyAsked || q.why_asked || "",
      suggestedApproach:
        q.suggestedApproach || q.suggested_approach || "",
      keyPoints: Array.isArray(q.keyPoints)
        ? q.keyPoints
        : Array.isArray(q.key_points)
        ? q.key_points
        : [],
    }));
  };

  return {
    technical: normalizeQuestions(
      parsed.technical || [],
      "tech"
    ),
    resume: normalizeQuestions(
      parsed.resume || [],
      "resume"
    ),
    behavioral: normalizeQuestions(
      parsed.behavioral || [],
      "behavioral"
    ),
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
        "You are an expert interview coach. Return valid JSON only. No markdown. No explanation.",
    },
    {
      role: "user",
      content: buildPrompt(
        resumeText,
        jobDescription
      ),
    },
  ];

  let lastError: any = null;

  for (const model of MODEL_CASCADE) {
    try {
      console.log(
        `[PrepWise] Trying model: ${model}`
      );

      const rawResponse = await callOpenRouter(
        model,
        messages
      );

      const result = parseAndValidate(rawResponse);

      console.log(
        `[PrepWise] Success with model: ${model}`
      );

      return result;
    } catch (error: any) {
      lastError = error;

      console.error(
        `[PrepWise] Model ${model} failed:`,
        error?.status,
        error?.message
      );

      if (isRateLimitError(error)) {
        continue;
      }

      if (error instanceof SyntaxError) {
        console.log(
          `[PrepWise] Invalid JSON from ${model}, trying next model...`
        );
        continue;
      }

      if (
        error?.status === 401 ||
        error?.message?.includes("401")
      ) {
        throw new Error(
          "Invalid OpenRouter API key."
        );
      }

      continue;
    }
  }

  console.error(
    "[PrepWise] All models failed:",
    lastError?.message
  );

  throw new Error(
    lastError?.message ||
      "Failed to generate interview questions."
  );
}