# PrepWise - AI-Powered Interview Preparation Platform

PrepWise is a production-quality MVP designed to help candidates prepare for their upcoming interviews by generating highly personalized, expert-crafted questions. By analyzing your resume PDF and a target job description, PrepWise uses Google Gemini API to generate 40 customized interview questions complete with answering guides, rationales, and keywords to emphasize.

---

## Features

- **SaaS-Style Landing Page**: Beautiful radial gradient lights, glassmorphic UI cards, and smooth user flow.
- **Client-Side PDF File Parsing**: Text is securely parsed from PDF files on the server using `pdf-parse` and sent to Gemini.
- **Target Role Alignment**: Paste a job description to tailor the context of the generated questions.
- **40 Structured Questions**:
  - **Technical Prep (10)**: Focuses on domain knowledge, system architecture, and tech stack requirements.
  - **Resume Deep-Dive (10)**: Probes into achievements, projects, and history documented on the resume.
  - **Behavioral Scenarios (10)**: Asks STAR-method target scenarios (e.g. conflict, leadership, deadline delivery).
  - **HR & Cultural Fit (10)**: Assesses motivation, expectations, and alignment with company culture.
- **Answering Guides**: Every question expands to reveal *Why they ask*, *Suggested Strategy*, and *Keywords/Points to Mention*.
- **Response Drafting Sandbox**: Type your outline directly on each card to practice.
- **Export Utility**: Download your personalized kit as a structured Markdown file or copy the full kit to clipboard in one click.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **AI Integration**: Google Gen AI SDK (`gemini-1.5-flash`)
- **PDF Extraction**: `pdf-parse`
- **Icon Set**: `lucide-react`

---

## Directory Structure

```text
PrepWise/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts       # Upload parser & Gemini API pipeline
│   ├── globals.css            # Styling tokens & animations
│   ├── layout.tsx             # Root layout & page metadata
│   └── page.tsx               # Workspace & application states
├── components/
│   ├── HeroSection.tsx        # SaaS header & CTA
│   ├── JobDescriptionInput.tsx# Text area & word count
│   ├── LoadingOverlay.tsx     # Custom loader & prep tips rotator
│   ├── QuestionCard.tsx       # Expandable question guide
│   ├── ResultsView.tsx        # Categories manager & downloader
│   └── ResumeUpload.tsx       # PDF drag & drop component
├── lib/
│   ├── gemini.ts              # Gemini API client schema & prompts
│   └── pdf.ts                 # Server-side pdf-parse module
├── types/
│   ├── index.ts               # Core TS contracts
│   └── pdf-parse.d.ts         # Module declaration for direct imports
└── README.md                  # This documentation
```

---

## Getting Started

### 1. Prerequisites

Make sure you have Node.js (v18.17.0 or higher) and npm installed.

### 2. Installation

Clone the repository and install dependencies:

```bash
cd PrepWise
npm install
```

### 3. Environment Configuration

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Open `.env.local` and paste your Google Gemini API Key:

```text
GEMINI_API_KEY=AIzaSy...
```

> **How to get a key:** You can get a free API key at [Google AI Studio](https://aistudio.google.com/).

### 4. Running Locally

Boot up the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test the platform.

### 5. Production Build

Verify the build process completes without warnings or compile-time TypeScript errors:

```bash
npm run build
npm run start
```

---

## Deployment Guide (Vercel)

PrepWise is optimized for serverless deployments on **Vercel** with full compatibility for PDF parsing and server functions.

1. **Push to Git**: Push the code to a GitHub, GitLab, or Bitbucket repository.
2. **Import into Vercel**: Connect your Vercel account and select the repository.
3. **Environment Variables**: Add your `GEMINI_API_KEY` under the Environment Variables section in the Vercel project settings.
4. **Deploy**: Click **Deploy**. Vercel will build the Next.js App Router project and provision API endpoints automatically.

---

## Error Handling Scenarios

PrepWise gracefully manages edge cases:
- **Missing File / Inputs**: User receives styled validation bubbles if clicking generate without values.
- **Non-PDF Files**: Prevented by file-system filters and server-side mimetype checking.
- **Empty PDF Contents**: Flags an alert if the PDF text is completely blank (e.g. image scans).
- **Gemini Offline / Configuration Issues**: Clear notifications are displayed if API calls fail or if keys are missing.
