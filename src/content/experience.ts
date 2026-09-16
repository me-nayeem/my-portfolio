import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    role: "Software QA Engineer Intern",
    company: "AZAI Labs",
    location: "Remote (Dhaka, Bangladesh)",
    companyUrl: "https://www.linkedin.com/company/azai-labs/posts/",
    engagement: "Internship",
    startDate: "Jul 2026",
    endDate: "Present",
    techStack: [
      "Manual QA",
      "Functional Testing",
      "Regression Testing",
      "Test Case Design",
      "Bug Reporting",
      "Issue Verification",
      "Jira",
      "FUR4",
      "Rockerz",
    ],
    highlights: [
      "Performed manual QA across 6+ production and staging portals, testing critical user flows and reporting issues.",
      "Tested and identified issues including OTP and CAPTCHA bypasses, broken referral tracking, and currency/DDP calculation errors.",
      "Created clear, developer-friendly Jira reports and consolidated related bugs to help identify root causes.",
      "Worked across the FUR4 and Rockerz platforms, helping improve product quality through continuous testing and issue verification.",
    ],
  },

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
      "Sole developer designed, built, and deployed a production e-commerce platform end-to-end for a real client; live at asthaengineering.com.",
      "Engineered an 11-table PostgreSQL schema with Prisma ORM, supporting a 500+ product catalog, brand/category management, wishlists, and repair-job tracking.",
      "Built a REST API (40+ endpoints) with JWT authentication, refresh-token rotation, and role-based access control (Admin/Customer), plus Cloudinary image management.",
      "Delivered an admin dashboard enabling non-technical staff to run daily operations products, categories, and repair jobs with WhatsApp-integrated inquiries without code changes.",
    ],
  },
];
