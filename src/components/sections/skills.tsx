"use client";

import { useState, type ComponentType } from "react";
import {
  Code2,
  Database,
  KeyRound,
  LayoutGrid,
  MonitorSmartphone,
  Server,
  Webhook,
  Wrench,
} from "lucide-react";
import {
  SiC,
  SiCloudinary,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../motion/reveal";
import { SectionHeading } from "./section-heading";
import { PillTabs } from "../pill-tabs";
import { skillGroups } from "../../content/skills";

const tabs = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "languages", label: "Languages", icon: Code2 },
  { id: "backend", label: "Backend", icon: Server },
  { id: "frontend", label: "Frontend", icon: MonitorSmartphone },
  { id: "db", label: "DB", icon: Database },
  { id: "tools", label: "Dev & Tools", icon: Wrench },
] as const;

type TabId = (typeof tabs)[number]["id"];

const groupByTab: Record<Exclude<TabId, "all">, string> = {
  languages: "Languages",
  backend: "Backend",
  frontend: "Frontend",
  db: "Databases",
  tools: "Tools & DevOps",
};

const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  C: SiC,
  Java: DiJava,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  HTML: SiHtml5,
  CSS: SiCss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST API Design": Webhook,
  "JWT Authentication": KeyRound,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "Prisma ORM": SiPrisma,
  pgvector: Database,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Postman: SiPostman,
  Vercel: SiVercel,
  Render: SiRender,
  Neon: Database,
  Cloudinary: SiCloudinary,
};

function skillsFor(tab: TabId): string[] {
  if (tab === "all") {
    return skillGroups.flatMap((group) => group.skills);
  }
  return (
    skillGroups.find((group) => group.title === groupByTab[tab])?.skills ?? []
  );
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading title="Skills" />
        </Reveal>

        <Reveal>
          <PillTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            label="Skill categories"
          />
        </Reveal>

        <motion.ul
          key={activeTab}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.8, 0.35, 1] }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {skillsFor(activeTab).map((skill) => {
            const Icon = skillIcons[skill] ?? Code2;
            return (
              <li
                key={skill}
                className="group border-border bg-surface hover:border-primary/40 flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors"
              >
                <Icon
                  className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-colors"
                  aria-hidden="true"
                />
                {skill}
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
