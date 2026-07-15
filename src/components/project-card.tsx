import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "../content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border-border bg-surface hover:border-primary/40 relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} details`}
        className="absolute inset-0 z-1"
      />
      <div className="bg-surface-2 relative aspect-2/1 overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} — interface preview`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,rgba(52,211,153,0.08),rgba(34,211,238,0.04))]">
            <span className="font-heading text-primary/40 text-6xl font-extrabold">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="border-border bg-surface/90 text-foreground hover:text-primary hover:border-primary/50 absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
          >
            <GithubIcon className="size-4.5" />
          </a>
        ) : (
          <span className="border-primary/30 bg-surface/90 text-primary absolute top-3 right-3 rounded-full border px-3 py-1 font-mono text-[0.68rem] backdrop-blur-sm">
            Client Work
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-bold tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="text-muted-foreground mt-1.5 text-[0.85rem]">
          {project.summary}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="border-border bg-surface-2 text-muted-foreground rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-4 flex gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="text-primary-foreground rounded-full bg-(image:--gradient) px-4 py-1.5 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          >
            View Details
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-surface-2/60 hover:border-primary hover:text-primary flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
