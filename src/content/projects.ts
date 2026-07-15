import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "Astha Engineering & Solutions",
    slug: "astha-engineering",
    summary:
      "Production e-commerce platform for an industrial automation parts supplier — designed, built, and deployed end-to-end as sole developer.",
    description:
      "Astha Engineering & Solutions is a live e-commerce platform for an industrial automation parts supplier in Dhaka. The catalog serves 500+ products with fully bilingual content (English & Bangla), brand and category management, wishlists, and repair-job tracking — backed by an 11-table PostgreSQL schema modeled with Prisma. A REST API of 40+ endpoints handles JWT authentication with refresh-token rotation and role-based access control (Admin/Customer), with product imagery managed through Cloudinary. An admin dashboard lets non-technical staff run daily operations — products, categories, and repair jobs with WhatsApp-integrated inquiries — without touching code.",
    problem:
      "The client sold 500+ industrial parts entirely offline: no searchable catalog for customers, no way to track repair jobs, and every product update depended on someone technical. Content also had to work in both English and Bangla for their customer base.",
    solution:
      "A complete platform delivered end-to-end: an 11-table PostgreSQL schema designed for bilingual content and catalog relations, a 40+ endpoint REST API secured with JWT refresh-token rotation and role-based access, and an admin dashboard that hands daily operations — products, categories, repair jobs, WhatsApp inquiries — to non-technical staff.",
    whyBuilt:
      "This was a real freelance engagement with a real deadline and real users — the project where I learned what production actually demands: decisions a client depends on, an admin UI staff can operate without me, and a system that keeps running after handover.",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Cloudinary",
    ],
    liveUrl: "https://asthaengineering.com",
    coverImage: "/images/astha-home.png",
    images: ["/images/astha-home.png"],
    featured: true,
    order: 1,
  },
  {
    title: "Halioo",
    slug: "halioo",
    summary:
      "RAG document chatbot that answers questions grounded in the user's own PDF/TXT files, with source citations.",
    description:
      "Halioo is a full-stack Retrieval-Augmented Generation chatbot. Users upload PDF or TXT documents and ask questions in natural language; answers are generated from the content of those documents and every answer cites its sources. Responses stream token by token over Server-Sent Events, each user's documents are isolated behind JWT authentication, and chat sessions persist across visits. The service runs live with the frontend on Vercel, the backend on Render, and the database on Neon.",
    problem:
      "General-purpose chatbots can't answer questions about private documents, and when pushed they hallucinate — for document-heavy work, an answer without a verifiable source is worthless.",
    solution:
      "A RAG pipeline: uploaded documents are chunked and embedded into PostgreSQL with pgvector, questions retrieve the most similar chunks via vector similarity search, and Google Gemini generates answers constrained to that retrieved context — with citations pointing back to the source passages. SSE streaming keeps responses immediate, and per-user data isolation keeps documents private.",
    whyBuilt:
      "I wanted to understand RAG beyond API-wrapper tutorials — embeddings, vector search, retrieval quality, and streaming — by building and operating the whole pipeline myself as a live production service.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Google Gemini API",
      "LangChain",
    ],
    githubUrl: "https://github.com/me-nayeem/HaliooChatBot",
    liveUrl: "https://halioo-chat-bot.vercel.app",
    coverImage: "/images/Main_halioo.png",
    images: ["/images/halioo-chat.png"],
    featured: true,
    order: 2,
  },
  {
    title: "QueueStorm",
    slug: "queuestorm",
    summary:
      "AI support copilot for financial-service tickets — deterministic decisions, LLM-phrased responses, and a safety filter.",
    description:
      "QueueStorm analyzes customer-support tickets for a financial-service context. Rule-based logic decides the verdict, case type, and department, while the LLM is used only to phrase the customer-facing response — so outcomes stay consistent even when LLM output varies. A safety filter scans every generated response and blocks or rewrites anything that requests credentials or makes unauthorized promises, flagging violations for human review. Multi-key Gemini API failover works around free-tier rate limits, all requests are Zod-validated, and the service ships as a 69.5MB Docker image on Docker Hub with a live Render deployment.",
    problem:
      "LLM output varies between calls, which is unacceptable when tickets decide refunds, account actions, or escalations — and unfiltered LLM text can ask users for credentials or promise things the business never authorized.",
    solution:
      "Split the responsibilities: deterministic rule-based logic owns every decision (verdict, case type, department routing), the LLM only writes the wording, and a safety filter audits that wording before it leaves the system — blocking, rewriting, and flagging risky output for human review.",
    whyBuilt:
      "I wanted to work out how to make LLMs dependable in a domain where consistency and safety matter more than fluency — determinism where it counts, AI only where it genuinely helps.",
    techStack: ["Node.js", "Express", "Google Gemini API", "Zod", "Docker"],
    githubUrl: "https://github.com/me-nayeem/Customer_Support_Chat_Bot",
    liveUrl: "https://customers-support-chat-bot.onrender.com/health",
    images: [],
    featured: true,
    order: 3,
  },
  {
    title: "Office Energy Monitor",
    slug: "office-energy-monitor",
    summary:
      "Real-time energy tracking for 15 devices across 3 rooms — a zero-polling SSE dashboard and a Discord bot on one backend.",
    description:
      "Office Energy Monitor tracks the energy usage of 15 devices across 3 rooms in real time. A live dashboard is driven entirely by Server-Sent Events — no polling — and a Discord bot (!status, !room, !usage) answers with LLM-phrased summaries backed by 3-key Groq API failover. Both interfaces share one backend, so they can never contradict each other. A centralized alerts engine posts deduplicated after-hours and prolonged-usage alerts to Discord, and energy accounting is persisted to PostgreSQL with explicit downtime-gap handling so totals survive restarts. The whole system runs under Docker Compose.",
    problem:
      "Device energy usage in an office is invisible until the bill arrives; polling dashboards waste resources and lag behind reality, naive alerting spams the same warning repeatedly, and in-memory accounting silently loses data every time the server restarts.",
    solution:
      "One backend as the single source of truth, pushing state to an SSE dashboard and a Discord bot simultaneously; a centralized alerts engine that deduplicates before posting; and restart-safe accounting persisted to PostgreSQL with explicit handling of downtime gaps, so recorded totals stay honest across crashes and deploys.",
    whyBuilt:
      "I wanted to design a real-time system properly — one source of truth serving two very different interfaces, and accounting that stays correct across restarts instead of just looking correct while the process is up.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "SSE",
      "discord.js",
      "Groq LLM API",
      "Docker",
    ],
    githubUrl: "https://github.com/me-nayeem/Office_Device_Electricity_State",
    liveUrl: "https://mad-boss.vercel.app",
    coverImage: "/images/office_energy.png",
    images: ["/images/office_energy.png"],
    featured: true,
    order: 4,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
