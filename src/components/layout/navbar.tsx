"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { profile } from "../../content/profile";
import { cn } from "../../lib/utils";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <span className="font-heading hidden text-lg font-bold tracking-tight sm:block">
            Nayeem Islam
          </span>
          <span className="sr-only">Nayeem Islam — home</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/#contact"
            className="text-primary-foreground rounded-full bg-(image:--gradient) px-5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(52,211,153,0.28)]"
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
          className="text-foreground md:hidden"
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
          className="border-border bg-surface/95 border-t px-5 pt-2 pb-6 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="border-border/60 text-muted-foreground hover:text-foreground block border-b py-3 text-sm font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
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
