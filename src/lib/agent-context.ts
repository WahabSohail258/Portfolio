import { experiences, type Experience } from "@/data/experience";
import { projects, type Project } from "@/data/projects";
import { skillTree } from "@/data/skills";

/**
 * Serializes the portfolio data into a compact factual brief for the LLM
 * system prompt. This is the grounding context — the model is instructed to
 * answer ONLY from these facts, so the site data stays the single source of
 * truth (edit experience.ts / projects.ts and the agent updates itself).
 */

const CONTACT = {
  name: "Wahab Sohail",
  email: "sohailwahab27@gmail.com",
  github: "https://github.com/WahabSohail258",
  linkedin: "https://linkedin.com/in/wahab-sohail",
  location: "Islamabad, Pakistan (working from Rawalpindi; PKT, UTC+5)",
};

function experienceToText(e: Experience): string {
  return [
    `- ${e.role} @ ${e.company} (${e.startDate} – ${e.endDate}, ${e.location}) [${e.type}]`,
    `  Highlight: ${e.highlight}`,
    ...e.description.map((d) => `  • ${d}`),
    `  Tech: ${e.tech.join(", ")}`,
  ].join("\n");
}

function projectToText(p: Project): string {
  return [
    `- ${p.title} [${p.category}${p.featured ? ", featured" : ""}]`,
    `  ${p.description}`,
    `  Tech: ${p.tags.join(", ")}`,
    p.live ? `  Live: ${p.live}` : "",
    `  Code: ${p.github}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function skillsToText(): string {
  return skillTree
    .map((f) => `- ${f.name.replace(/-/g, " ")}: ${f.files.map((file) => file.name).join(", ")}`)
    .join("\n");
}

export function portfolioBrief(): string {
  return [
    `## Contact`,
    `Name: ${CONTACT.name}`,
    `Email: ${CONTACT.email}`,
    `GitHub: ${CONTACT.github}`,
    `LinkedIn: ${CONTACT.linkedin}`,
    `Location: ${CONTACT.location}`,
    `Status: Available for work and freelance projects.`,

    `## Experience`,
    ...experiences.map(experienceToText),

    `## Projects`,
    ...projects.map(projectToText),

    `## Skills`,
    skillsToText(),
  ].join("\n\n");
}

export const CONTACT_INFO = CONTACT;
