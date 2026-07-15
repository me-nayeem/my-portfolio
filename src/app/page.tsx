import { Hero } from "../components/sections/hero";
import { ProjectsSection } from "../components/sections/projects";
import { ExperienceEducationSection } from "../components/sections/experience-education";
import { SkillsSection } from "../components/sections/skills";
import { AchievementsCertificatesSection } from "../components/sections/achievements-certificates";
import { ContactSection } from "../components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ExperienceEducationSection />
      <SkillsSection />
      <AchievementsCertificatesSection />
      <ContactSection />
    </>
  );
}
