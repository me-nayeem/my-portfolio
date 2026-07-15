"use client";

import { useState } from "react";
import { BriefcaseBusiness, ExternalLink, GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../motion/reveal";
import { SectionHeading } from "./section-heading";
import { PillTabs } from "../pill-tabs";
import { experiences } from "../../content/experience";
import { educationList } from "../../content/education";

const tabs = [
  { id: "experience", label: "Work Experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ExperienceEducationSection() {
  const [activeTab, setActiveTab] = useState<TabId>("experience");
  const reducedMotion = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading title="Experience & Education" />
        </Reveal>

        <Reveal>
          <PillTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            label="Experience and education"
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
          className="mx-auto flex max-w-4xl flex-col gap-5"
        >
          {activeTab === "experience"
            ? experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.startDate}`}
                  className="border-border bg-surface rounded-2xl border p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-lg font-bold tracking-[-0.02em]">
                        {experience.role}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {experience.companyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary inline-flex items-center gap-1 hover:underline"
                          >
                            {experience.company}
                            <ExternalLink
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          experience.company
                        )}{" "}
                        · {experience.location}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-muted-foreground font-mono text-xs">
                        {experience.startDate} – {experience.endDate}
                      </p>
                      <span className="border-primary/30 text-primary mt-2 inline-block rounded-full border px-3 py-0.5 font-mono text-[0.68rem]">
                        {experience.engagement}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {experience.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="border-border bg-surface-2 text-muted-foreground rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 space-y-2.5">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-muted-foreground flex gap-3 text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            : educationList.map((education) => (
                <article
                  key={education.institution}
                  className="border-border bg-surface flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
                >
                  <span className="border-primary/25 bg-surface-2 flex size-14 shrink-0 items-center justify-center rounded-xl border">
                    <GraduationCap
                      className="text-primary size-7"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold tracking-[-0.02em]">
                      {education.institution}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {education.degree} · {education.location}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-muted-foreground font-mono text-xs">
                      {education.startDate} – {education.endDate}
                    </p>
                    <span className="border-primary/30 text-primary mt-2 inline-block rounded-full border px-3 py-0.5 font-mono text-[0.68rem]">
                      {education.grade}
                    </span>
                  </div>
                </article>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
