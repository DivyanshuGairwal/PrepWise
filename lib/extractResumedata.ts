export interface Resumedata {
  skills: string[];
  projects: string[];
  experience: string[];
  education: string[];
}

export function extractResumedata(
  resumeText: string
): Resumedata {

  const lines = resumeText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const sections: Resumedata = {
    skills: [],
    projects: [],
    experience: [],
    education: [],
  };

  let currentSection: keyof Resumedata | null = null;

  const headings = {
    skills: [
      "skills",
      "technical skills",
      "technologies",
      "tech stack",
    ],

    projects: [
      "projects",
      "personal projects",
      "project",
    ],

    experience: [
      "experience",
      "work experience",
      "internship",
      "employment",
    ],

    education: [
      "education",
      "academic",
      "qualification",
    ],
  };

  for (const line of lines) {

    const lower = line.toLowerCase();

    if (
      headings.skills.some(h => lower.includes(h))
    ) {
      currentSection = "skills";
      continue;
    }

    if (
      headings.projects.some(h => lower.includes(h))
    ) {
      currentSection = "projects";
      continue;
    }

    if (
      headings.experience.some(h => lower.includes(h))
    ) {
      currentSection = "experience";
      continue;
    }

    if (
      headings.education.some(h => lower.includes(h))
    ) {
      currentSection = "education";
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  return sections;
}