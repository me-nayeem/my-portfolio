import { Reveal } from "../motion/reveal";
import { ProjectCard } from "../project-card";
import { SectionHeading } from "./section-heading";
import { projects } from "../../content/projects";

export function ProjectsSection() {
  const featured = [...projects]
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            title="Featured Projects"
            subtitle="Production work and open-source builds — each with a full case study."
          />
        </Reveal>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
