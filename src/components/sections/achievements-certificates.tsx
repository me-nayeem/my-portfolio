"use client";

import { useState } from "react";
import { Award, Code2, ExternalLink, Rocket, Trophy } from "lucide-react";
import { SiCodeforces, SiGithub, SiLeetcode } from "react-icons/si";
import type { ComponentType, CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../motion/reveal";
import { SectionHeading } from "./section-heading";
import { PillTabs } from "../pill-tabs";
import { achievements } from "../../content/achievements";
import { hackathons } from "../../content/hackathons";
import { certificates } from "../../content/certificates";

const tabs = [
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "hackathons", label: "Hackathons", icon: Rocket },
  { id: "certificates", label: "Certifications", icon: Award },
] as const;

type TabId = (typeof tabs)[number]["id"];

const achievementIcons = [Trophy, Code2];

const linkBrands: Record<
  string,
  {
    icon: ComponentType<{ className?: string; style?: CSSProperties }>;
    color: string;
  }
> = {
  LeetCode: { icon: SiLeetcode, color: "#FFA116" },
  Codeforces: { icon: SiCodeforces, color: "#1F8ACB" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
};

export function AchievementsCertificatesSection() {
  const [activeTab, setActiveTab] = useState<TabId>("achievements");
  const reducedMotion = useReducedMotion();

  return (
    <section id="achievements" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading title="Highlights" />
        </Reveal>

        <Reveal>
          <PillTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            label="Achievements and certifications"
            idPrefix="highlights"
          />
        </Reveal>

        <motion.div
          key={activeTab}
          role="tabpanel"
          id={`highlights-panel-${activeTab}`}
          aria-labelledby={`highlights-tab-${activeTab}`}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.8, 0.35, 1] }}
          className="mx-auto max-w-4xl"
        >
          {activeTab !== "certificates" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {(activeTab === "achievements" ? achievements : hackathons).map(
                (achievement, index) => {
                  const Icon =
                    activeTab === "hackathons"
                      ? Rocket
                      : (achievementIcons[index % achievementIcons.length] ??
                        Trophy);
                  return (
                    <article
                      key={achievement.title}
                      className="border-border bg-surface h-full rounded-2xl border p-6"
                    >
                      <span className="border-primary/25 bg-surface-2 flex size-11 items-center justify-center rounded-xl border">
                        <Icon
                          className="text-primary size-5"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="font-heading mt-4 font-bold tracking-[-0.02em]">
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        {achievement.description}
                      </p>
                      {achievement.links && (
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {achievement.links.map((link) => {
                            const brand = linkBrands[link.label];
                            const BrandIcon = brand?.icon ?? ExternalLink;
                            return (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-border bg-surface-2 hover:border-primary/40 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors"
                              >
                                <BrandIcon
                                  className="size-4"
                                  style={
                                    brand ? { color: brand.color } : undefined
                                  }
                                  aria-hidden="true"
                                />
                                {link.label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  );
                },
              )}
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {certificates.map((certificate) => (
                <article
                  key={certificate.title}
                  className="border-border bg-surface h-full rounded-2xl border p-6"
                >
                  <span className="border-primary/25 bg-surface-2 flex size-11 items-center justify-center rounded-xl border">
                    <Award className="text-primary size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading mt-4 font-bold tracking-[-0.02em]">
                    {certificate.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {certificate.issuer} · {certificate.date}
                  </p>
                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm hover:underline"
                    >
                      View credential
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="border-border text-muted-foreground rounded-2xl border border-dashed p-10 text-center font-mono text-sm">
              Certifications coming soon.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
