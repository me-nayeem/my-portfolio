"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { profile } from "../../content/profile";
import { scrollToHash } from "../../lib/scroll";

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.8, 0.35, 1] },
  },
};

const riseNoFade: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.8, 0.35, 1] },
  },
};

const photoIn: Variants = {
  hidden: { scale: 0.96 },
  visible: {
    scale: 1,
    transition: { duration: 0.6, delay: 0.12, ease: [0.22, 0.8, 0.35, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function Hero() {
  const reducedMotion = useReducedMotion();
  const initial = reducedMotion ? "visible" : "hidden";

  return (
    <section className="relative flex flex-col overflow-x-clip pt-28 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[15%] -right-[5%] size-[700px] bg-[radial-gradient(circle,rgba(52,211,153,0.07)_0%,transparent_65%)]"
      />
      <div aria-hidden="true" className="starfield" />

      <motion.div
        variants={stagger}
        initial={initial}
        animate="visible"
        className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
      >
        <div className="text-center lg:text-left">
          <motion.div
            variants={rise}
            className="border-primary/30 bg-surface-2/80 text-foreground/90 mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-[0.8rem]"
          >
            <span className="bg-primary size-2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            {profile.badge}
          </motion.div>

          <motion.h1
            variants={riseNoFade}
            className="font-heading mb-5 text-[clamp(1.6rem,3.3vw,2.5rem)] leading-[1.12] font-extrabold tracking-[-0.03em]"
          >
            Building{" "}
            <span className="bg-(image:--gradient) bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(52,211,153,0.35)]">
              production
            </span>
            <br />
            web apps with{" "}
            <span className="font-serif font-normal tracking-normal italic">
              precision.
            </span>
          </motion.h1>

          <motion.p
            variants={riseNoFade}
            className="text-muted-foreground mx-auto mb-7 max-w-lg text-[1.02rem] lg:mx-0"
          >
            I am{" "}
            <strong className="text-foreground font-semibold">
              Nayeem Islam
            </strong>{" "}
            a full-stack developer who ships complete web products. Sole
            developer of{" "}
            <a
              href="https://asthaengineering.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-primary/35 border-b"
            >
              asthaengineering.com
            </a>
            , a live e-commerce platform serving a 500+ product catalog with
            hands-on QA experience testing production systems at AZAI Labs. CSE
            undergraduate at SUST (CGPA 3.56/4.00)
          </motion.p>

          <motion.div
            variants={rise}
            className="mb-7 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <Link
              href="/#projects"
              className="group text-primary-foreground inline-flex items-center gap-2 rounded-full bg-(image:--gradient) px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(52,211,153,0.28)]"
              onClick={(event) => scrollToHash(event, "/#projects")}
            >
              View Projects
            </Link>
            <a
              href={profile.cvPath}
              download
              className="border-border bg-surface-2/60 hover:border-primary hover:text-primary inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="flex items-center justify-center gap-4 lg:justify-start"
          >
            <span className="text-muted-foreground font-mono text-xs">
              Follow me:
            </span>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={photoIn}
          initial={initial}
          animate="visible"
          className="relative -order-1 flex items-center justify-center gap-4 justify-self-center lg:order-0 lg:block"
        >
          <div className="border-primary/25 bg-surface-2 relative size-32 overflow-hidden rounded-full border-2 shadow-[0_0_35px_rgba(52,211,153,0.25)] sm:size-36 lg:aspect-4/5 lg:size-auto lg:w-[clamp(270px,26vw,350px)] lg:rounded-[22px] lg:border lg:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <Image
              src="/images/Head_shot_professional.png"
              alt="Nayeem Islam"
              fill
              priority
              sizes="(max-width: 1024px) 144px, 350px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(52,211,153,0.06),rgba(34,211,238,0.03))]"
            />
          </div>
          <div className="lg:hidden">
            <div className="border-border bg-surface/90 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap">
              <span className="pulse-dot bg-primary size-2 rounded-full" />
              Available for work
            </div>
            <p className="text-muted-foreground mt-2 font-mono text-[0.68rem]">
              <span className="font-heading text-primary text-sm font-extrabold">
                5+
              </span>{" "}
              live projects
            </p>
          </div>
          <motion.div
            variants={rise}
            className="border-border bg-surface/90 absolute top-4 -left-6 hidden flex-col rounded-xl border px-3.5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm lg:flex"
          >
            <span className="font-heading text-primary text-lg leading-none font-extrabold">
              5+
            </span>
            <span className="text-muted-foreground font-mono text-[0.68rem]">
              live projects
            </span>
          </motion.div>
          <motion.div
            variants={rise}
            className="border-border bg-surface/90 absolute -right-5 bottom-4 hidden items-center gap-2 rounded-xl border px-3.5 py-2 text-[0.82rem] font-medium whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm lg:flex"
          >
            <span className="pulse-dot bg-primary size-2 rounded-full" />
            Available for work
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={rise}
        initial={initial}
        animate="visible"
        transition={{ delay: 0.5 }}
        className="relative mt-10 pb-16 lg:mt-14"
      >
        <p className="text-muted-foreground/90 mb-5 text-center font-mono text-xs tracking-widest">
          TECHNOLOGIES I WORK WITH
        </p>
        <div className="marquee-mask mx-auto max-w-6xl">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex items-center"
              >
                {profile.techMarquee.map((tech) => (
                  <span
                    key={tech}
                    className="font-heading text-muted-foreground/80 after:text-primary/60 flex items-center whitespace-nowrap after:mx-6 after:content-['·'] lg:after:mx-7"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="text-muted-foreground/90 absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center font-mono text-[0.68rem] tracking-[0.25em] sm:flex">
        SCROLL
        <span aria-hidden="true" className="bob">
          ▾
        </span>
      </div>
    </section>
  );
}
