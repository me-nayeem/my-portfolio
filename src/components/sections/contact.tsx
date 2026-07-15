"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "../../app/actions/send-email";
import { Reveal } from "../motion/reveal";
import { SectionHeading } from "./section-heading";
import { GithubIcon, LinkedinIcon } from "../icons";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { profile } from "../../content/profile";

const contactRows = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
  },
  { icon: MapPin, label: "Location", value: profile.location },
];

export function ContactSection() {
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    const result = await sendContactMessage(new FormData(form));
    setSending(false);
    if (result.ok) {
      toast.success("Message sent — I'll get back to you soon!");
      form.reset();
    } else {
      toast.error(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading title="Get In Touch" />
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="border-border bg-surface flex h-full flex-col rounded-2xl border p-6 sm:p-8">
              <h3 className="font-heading text-lg font-bold tracking-[-0.02em]">
                Let&apos;s build something
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Open to internship, part-time, and junior full-stack roles —
                remote or on-site. Tell me about your project or role, and
                I&apos;ll get back to you quickly.
              </p>

              <ul className="mt-6 space-y-4">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-center gap-3.5">
                    <span className="border-primary/25 bg-surface-2 flex size-10 shrink-0 items-center justify-center rounded-xl border">
                      <row.icon
                        className="text-primary size-4.5"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="text-muted-foreground font-mono text-[0.68rem] uppercase">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="hover:text-primary text-sm font-medium transition-colors"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{row.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-4 pt-6">
                <span className="text-muted-foreground font-mono text-xs">
                  Follow me:
                </span>
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
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="border-border bg-surface rounded-2xl border p-6 sm:p-8"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={2000}
                  rows={6}
                  placeholder="Tell me about your project or role…"
                  className="min-h-32"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="text-primary-foreground mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(image:--gradient) px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(52,211,153,0.28)] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
