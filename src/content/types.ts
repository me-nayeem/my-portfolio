export type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  whyBuilt: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  images: string[];
  videoUrl?: string;
  featured: boolean;
  order: number;
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  engagement: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  highlights: string[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Education = {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  cgpa: string;
};

export type Achievement = {
  title: string;
  description: string;
  link?: string;
};

export type Profile = {
  name: string;
  fullName: string;
  badge: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  cvPath: string;
  techMarquee: string[];
};
