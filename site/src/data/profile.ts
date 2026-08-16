/**
 * Contact details, education and skills — the supporting facts that back up
 * `data/work.ts` and `data/projects.ts` without being the headline.
 *
 * There is deliberately no phone number here. It was on the old resume page in
 * plaintext, which is a scraper magnet for no benefit — nobody cold-calls off a
 * portfolio. It stays in the downloadable PDF, which is a deliberate action by
 * someone who already wants to get in touch.
 */

export const contact = {
  email: "khk32887134@gmail.com",
  linkedin: "https://www.linkedin.com/in/keith-kwong/",
  github: "https://github.com/khkwong",
  resumePdf: "/Resume.pdf",
  headshot: "/img/headshot.png",
};

export type Education = {
  school: string;
  url: string;
  degree: string;
  honors: string;
  dates: string;
  location: string;
  coursework: string[];
};

/*
 * University only. High school GPA alongside two years of professional work
 * reads as not having enough else to say, and the resume PDF can carry it if a
 * particular application ever wants it.
 */
export const education: Education[] = [
  {
    school: "University of California San Diego",
    url: "https://ucsd.edu",
    degree: "B.S. Data Science",
    honors: "3.86 GPA — Provost Honors",
    dates: "2020 — 2024",
    location: "La Jolla, CA",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Recommender Systems",
      "Systems for Scalable Analytics",
      "IoT and Sensors",
      "Signal Processing",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

/*
 * Grouped, not a flat list. Thirty-eight items in one column gives every entry
 * equal weight, so a language sits level with a database GUI and nothing reads
 * as a strength. Grouping restores the hierarchy the list threw away.
 *
 * Things deliberately left off: applications that amount to "I have opened
 * this" (DBeaver, Anaconda, Jupyter), and UE4SS — that one's real, but it
 * belongs to the modding work on the projects page, not to a professional
 * skills block.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "R", "Julia", "Lua", "MATLAB"],
  },
  {
    label: "Frontend",
    items: ["React", "React Query", "AG Grid", "Material UI", "Vite", "HTML & CSS"],
  },
  {
    label: "Backend & Data",
    items: [
      "Django",
      "FastAPI",
      "NodeJS",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Snowflake",
      "Alembic",
      "Pandas",
      "scikit-learn",
      "TensorFlow",
    ],
  },
  {
    label: "Infrastructure & Tools",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub Actions",
      "Claude Code",
      "Codex",
      "Jira",
      "Figma",
      "Tableau",
    ],
  },
];
