import { NextRequest, NextResponse } from "next/server";
import { parsePdf } from "@/lib/pdf";
import { generateInterviewQuestions } from "@/lib/gemini";
import { AnalysisResponse } from "@/types";
import { calculateRoleMatch } from "@/lib/roleMatch";

export async function POST(request: NextRequest): Promise<NextResponse<AnalysisResponse>> {
  try {
    // Check for API key existence first
   if (!process.env.OPENROUTER_API_KEY) {
  return NextResponse.json(
    {
      success: false,
      error: "OpenRouter API key is not configured on the server. Please add OPENROUTER_API_KEY to your .env.local file."
    },
    { status: 500 }
  );
}

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    // 1. Validation for missing fields
    if (!file) {
      return NextResponse.json(
        { success: false, error: "Resume PDF file is required." },
        { status: 400 }
      );
    }

    if (!jobDescription || jobDescription.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Job description is required." },
        { status: 400 }
      );
    }

    // 2. Validation for file format
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a PDF file only." },
        { status: 400 }
      );
    }

    // 3. Extract text from PDF
    let resumeText = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      resumeText = await parsePdf(buffer);
    } catch (pdfError: any) {
      return NextResponse.json(
        {
          success: false,
          error: pdfError.message || "Failed to parse the uploaded PDF file."
        },
        { status: 400 }
      );
    }

    if (!resumeText || resumeText.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract text from the PDF. Ensure the file contains selectable text and is not an image-only scanned document."
        },
        { status: 400 }
      );
    }

    // 4. Generate interview questions using OpenRouter
    const analysisResult = await generateInterviewQuestions(
  resumeText,
  jobDescription
);

analysisResult.roleMatch = calculateRoleMatch(
  resumeText,
  jobDescription
);

return NextResponse.json({
  success: true,
  data: analysisResult
});

  } catch (error: any) {
    console.error("Analysis API error:", error);

    const isQuotaError =
      error?.message?.includes("quota") ||
      error?.message?.includes("Too Many Requests") ||
      error?.message?.includes("daily quota");

    return NextResponse.json(
      {
        success: false,
        error: isQuotaError
          ? error.message  // The quota error already has a clean user-friendly message from gemini.ts
          : error.message || "An unexpected error occurred during analysis."
      },
      { status: isQuotaError ? 429 : 500 }
    );
  }
}
