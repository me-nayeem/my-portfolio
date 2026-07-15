"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { profile } from "../../content/profile";

type ActionResult = { ok: boolean; error?: string };

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  comment: z.string().trim().min(1, "Feedback is required").max(1000),
  projectTitle: z.string().trim().min(1).max(120),
});

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const attempts = new Map<string, number[]>();

async function isRateLimited(): Promise<boolean> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT) {
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

async function sendEmail(
  subject: string,
  text: string,
  replyTo?: string,
): Promise<ActionResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Email service is not configured." };
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: profile.email,
    replyTo,
    subject,
    text,
  });
  if (error) {
    return { ok: false, error: "Could not send right now. Try again later." };
  }
  return { ok: true };
}

export async function sendContactMessage(
  formData: FormData,
): Promise<ActionResult> {
  if (formData.get("company")) {
    return { ok: true };
  }
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  if (await isRateLimited()) {
    return { ok: false, error: "Too many messages. Please try again later." };
  }
  const { name, email, message } = parsed.data;
  return sendEmail(
    `Portfolio - CONTACT — ${name}`,
    `From: ${name} (${email})\n\n${message}`,
    email,
  );
}

export async function sendProjectFeedback(
  formData: FormData,
): Promise<ActionResult> {
  if (formData.get("company")) {
    return { ok: true };
  }
  const parsed = feedbackSchema.safeParse({
    name: formData.get("name"),
    comment: formData.get("comment"),
    projectTitle: formData.get("projectTitle"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  if (await isRateLimited()) {
    return { ok: false, error: "Too many messages. Please try again later." };
  }
  const { name, comment, projectTitle } = parsed.data;
  return sendEmail(
    `Portfolio - FEEDBACK — ${projectTitle} — ${name}`,
    `Project: ${projectTitle}\nFrom: ${name}\n\n${comment}`,
  );
}
