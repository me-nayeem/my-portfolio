import { GithubIcon, LinkedinIcon } from "../icons";
import { profile } from "../../content/profile";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Nayeem Islam. All rights reserved.
          </p>
          <p className="text-muted-foreground/90 mt-1 font-mono text-xs">
            Built with Next.js & TypeScript
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
