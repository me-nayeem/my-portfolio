import type { Metadata } from "next";
import {
  Manrope,
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { WhatsappButton } from "../components/whatsapp-button";
import { Toaster } from "../components/ui/sonner";
import { profile } from "../content/profile";
import { siteDescription, siteUrl } from "../lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nayeem Islam — Full-Stack Developer",
    template: "%s · Nayeem Islam",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nayeem Islam — Portfolio",
    title: "Nayeem Islam — Full-Stack Developer",
    description: siteDescription,
    images: [
      {
        url: "/images/Head_shot_professional.png",
        width: 1254,
        height: 1254,
        alt: "Nayeem Islam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayeem Islam — Full-Stack Developer",
    description: siteDescription,
    images: ["/images/Head_shot_professional.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nayeem Islam",
  url: siteUrl,
  jobTitle: "Full-Stack Developer",
  email: `mailto:${profile.email}`,
  sameAs: [profile.githubUrl, profile.linkedinUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${mono.variable} ${serif.variable} motion-safe:scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappButton />
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
