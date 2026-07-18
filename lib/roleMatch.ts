export function calculateRoleMatch(
  resumeText: string,
  jobDescription: string
) {
  const skills = [
    "react",
    "next.js",
    "node.js",
    "typescript",
    "javascript",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "prisma",
    "express",
    "jest",
    "aws",
    "git",
  ];

  const resumeSkills = skills.filter((skill) =>
    resumeText.toLowerCase().includes(skill)
  );

  const jdSkills = skills.filter((skill) =>
    jobDescription.toLowerCase().includes(skill)
  );

  if (jdSkills.length === 0) return 0;

  const matched = jdSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  return Math.round(
    (matched.length / jdSkills.length) * 100
  );
}