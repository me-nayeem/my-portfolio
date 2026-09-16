import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "../../../components/icons";
import { FeedbackForm } from "../../../components/feedback-form";
import { ScreenshotGallery } from "../../../components/screenshot-gallery";
import { getProjectBySlug, projects } from "../../../content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-heading relative inline-block pb-2 text-xl font-extrabold tracking-[-0.02em] after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-10 after:rounded-full after:bg-(image:--gradient)">
        {title}
      </h2>
      <div className="text-muted-foreground mt-4 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const gallery = project.images.filter(
    (image) => image !== project.coverImage,
  );
  const desktopScreenshots = gallery.filter(
    (image) => !image.includes("_mobile_"),
  );
  const mobileScreenshots = gallery.filter((image) =>
    image.includes("_mobile_"),
  );

  return (
    <article className="mx-auto max-w-4xl px-5 pt-28 pb-20 sm:px-8">
      <Link
        href="/#projects"
        className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            {project.title}
          </h1>
          {!project.githubUrl && (
            <span className="border-primary/30 text-primary rounded-full border px-3 py-1 font-mono text-[0.68rem]">
              Client Work
            </span>
          )}
        </div>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground inline-flex items-center gap-2 rounded-full bg-(image:--gradient) px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(52,211,153,0.28)]"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-surface-2/60 hover:border-primary hover:text-primary inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </header>

      {project.videoUrl ? (
        <div className="border-border mt-10 aspect-video overflow-hidden rounded-2xl border">
          <iframe
            src={project.videoUrl}
            title={`${project.title} — demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      ) : (
        project.coverImage && (
          <div className="border-border bg-surface-2 relative mt-10 aspect-video overflow-hidden rounded-2xl border">
            <Image
              src={project.coverImage}
              alt={`${project.title} — interface preview`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        )
      )}

      <CaseSection title="About the project">
        <p>{project.description}</p>
      </CaseSection>

      <CaseSection title="The problem">
        <p>{project.problem}</p>
      </CaseSection>

      <CaseSection title="The solution">
        <p>{project.solution}</p>
      </CaseSection>

      <CaseSection title="Why I built it">
        <p>{project.whyBuilt}</p>
      </CaseSection>

      <CaseSection title="Tech stack">
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="border-border bg-surface text-foreground rounded-full border px-3.5 py-1 font-mono text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
      </CaseSection>

      {gallery.length > 0 && (
        <CaseSection title="Screenshots">
          <ScreenshotGallery images={gallery} projectTitle={project.title} />
          <div className="hidden">
            <div className="grid gap-4 sm:grid-cols-2">
            {desktopScreenshots.map((image) => (
              <div
                key={image}
                className="border-border bg-surface-2 relative aspect-video overflow-hidden rounded-xl border"
              >
                <Image
                  src={image}
                  alt={`${project.title} — screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, 430px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

            {mobileScreenshots.length > 0 && (
            <div className="mt-6">
              <h3 className="text-foreground text-sm font-semibold">
                Mobile screens
              </h3>
              <div className="mt-3 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mobileScreenshots.map((image) => (
                  <div
                    key={image}
                    className="border-border bg-surface-2 relative aspect-9/16 overflow-hidden rounded-xl border"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} â€” mobile screenshot`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 285px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        </CaseSection>
      )}

      <CaseSection title="Feedback">
        <p className="text-sm">
          Tried this project or read the case study? I&apos;d love to hear your
          thoughts.
        </p>
        <FeedbackForm projectTitle={project.title} />
      </CaseSection>
    </article>
  );
}
