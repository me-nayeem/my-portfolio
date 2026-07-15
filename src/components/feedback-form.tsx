"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { sendProjectFeedback } from "../app/actions/send-email";

export function FeedbackForm({ projectTitle }: { projectTitle: string }) {
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    const result = await sendProjectFeedback(new FormData(form));
    setSending(false);
    if (result.ok) {
      toast.success("Thanks for your feedback!");
      form.reset();
    } else {
      toast.error(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
      <input type="hidden" name="projectTitle" value={projectTitle} />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input
        type="text"
        name="name"
        required
        maxLength={100}
        placeholder="Your name"
        aria-label="Your name"
        className="border-border bg-surface-2 focus-visible:ring-primary/50 w-full rounded-lg border px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
      />
      <textarea
        name="comment"
        required
        maxLength={1000}
        rows={4}
        placeholder="Share your thoughts on this project…"
        aria-label="Your feedback"
        className="border-border bg-surface-2 focus-visible:ring-primary/50 w-full rounded-lg border px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
      />
      <button
        type="submit"
        disabled={sending}
        className="text-primary-foreground inline-flex w-fit items-center gap-2 rounded-full bg-(image:--gradient) px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
      >
        {sending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {sending ? "Sending…" : "Submit Feedback"}
      </button>
    </form>
  );
}
