"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { profile } from "../../content/profile";
import { cn } from "../../lib/utils";
import { scrollToHash } from "../../lib/scroll";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = navLinks
      .map((link) => link.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-250",
        scrolled || menuOpen
          ? "border-border bg-surface/85 border-b backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-250 sm:px-8",
          scrolled ? "h-15" : "h-17",
        )}
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="border-primary/30 bg-surface-2 flex size-11 items-center justify-center rounded-xl border bg-[linear-gradient(180deg,rgba(52,211,153,0.14),rgba(34,211,238,0.06))] shadow-[0_0_26px_rgba(52,211,153,0.3)]">
            <Image
              src="/images/logo.svg"
              alt=""
              width={26}
              height={26}
              priority
            />
          </span>
          <span className="font-heading hidden text-lg font-bold tracking-tight whitespace-nowrap sm:block">
            Nayeem Islam
          </span>
          <span className="sr-only">Nayeem Islam — home</span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  activeSection === link.href.split("#")[1]
                    ? "text-foreground after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-(image:--gradient)"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={(event) => scrollToHash(event, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#contact"
            className="text-primary-foreground rounded-full bg-(image:--gradient) px-5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(52,211,153,0.28)]"
            onClick={(event) => scrollToHash(event, "/#contact")}
          >
            Hire Me
          </Link>
          <a
            href={profile.cvPath}
            download
            className="border-border bg-surface-2/60 hover:border-primary hover:text-primary flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="text-foreground lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-border bg-surface/95 border-t px-5 pt-2 pb-6 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "border-border/60 block border-b py-3 text-sm font-medium transition-colors",
                    activeSection === link.href.split("#")[1]
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  onClick={(event) => {
                    scrollToHash(event, link.href);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3">
            <Link
              href="/#contact"
              className="text-primary-foreground flex-1 rounded-full bg-(image:--gradient) px-5 py-2.5 text-center text-sm font-semibold"
              onClick={(event) => {
                scrollToHash(event, "/#contact");
                setMenuOpen(false);
              }}
            >
              Hire Me
            </Link>
            <a
              href={profile.cvPath}
              download
              className="border-border bg-surface-2/60 flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              <Download className="size-4" aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
