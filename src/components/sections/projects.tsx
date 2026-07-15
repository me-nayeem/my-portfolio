"use client";

import { useState } from "react";
import { LayoutGrid, MonitorSmartphone, Server } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../motion/reveal";
import { ProjectCard } from "../project-card";
import { SectionHeading } from "./section-heading";
import { PillTabs } from "../pill-tabs";
import { projects } from "../../content/projects";

const tabs = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "backend", label: "Backend", icon: Server },
  { id: "frontend", label: "Frontend", icon: MonitorSmartphone },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const reducedMotion = useReducedMotion();

  const featured = [...projects]
    .filter((project) => project.featured)
    .filter(
      (project) =>
        activeTab === "all" || project.categories.includes(activeTab),
    )
    .sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading title="Featured Projects" />
        </Reveal>

        <Reveal>
          <PillTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            label="Project categories"
          />
        </Reveal>

        <motion.div
          key={activeTab}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.8, 0.35, 1] }}
          className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2"
        >
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
