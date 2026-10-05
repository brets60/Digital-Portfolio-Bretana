export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  bentoSpan: string; // Tailwind grid span classes
  accentColor: string; // e.g. "cyan", "violet", "amber"
  gradient: string;
}

export interface Milestone {
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  accent: string;
}

export interface TechSkill {
  name: string;
  category: "frontend" | "backend" | "creative" | "devops";
  experience: string;
  color: string;
  radius?: number;
}

export interface CommandHistory {
  command: string;
  output: React.ReactNode;
}
