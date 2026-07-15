import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    role: "Full Stack Web Developer",
    company: "Astha Engineering & Solutions",
    companyUrl: "https://asthaengineering.com",
    location: "Dhaka, Bangladesh",
    engagement: "Freelance",
    startDate: "Apr 2026",
    endDate: "May 2026",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    highlights: [
      "Sole developer — designed, built, and deployed a production e-commerce platform end-to-end for a real client; live at asthaengineering.com.",
      "Engineered an 11-table PostgreSQL schema with Prisma ORM, supporting a 500+ product catalog across bilingual content (English & Bangla), brand/category management, wishlists, and repair-job tracking.",
      "Built a REST API (40+ endpoints) with JWT authentication, refresh-token rotation, and role-based access control (Admin/Customer), plus Cloudinary image management.",
      "Delivered an admin dashboard enabling non-technical staff to run daily operations — products, categories, and repair jobs with WhatsApp-integrated inquiries — without code changes.",
    ],
  },
];
