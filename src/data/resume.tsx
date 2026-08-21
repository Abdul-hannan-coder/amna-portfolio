import React from "react";
import { Icons } from "@/components/icons";
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  FolderGit, 
  History, 
  Mail,
  NotebookIcon 
} from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

import portfolioData from "../../data/portfolio.json";
import projectsData from "../../data/projects.json";

// Map string keys to SVG icon components for skills
const skillIcons: Record<string, React.ComponentType<any>> = {
  react: ReactLight,
  nextjs: NextjsIconDark,
  typescript: Typescript,
  nodejs: Nodejs,
  python: Python,
  golang: Golang,
  postgresql: Postgresql,
  docker: Docker,
  kubernetes: Kubernetes,
  java: Java,
  csharp: Csharp,
};

// Map lowercase label to Lucide icons for navigation
const navigationIcons: Record<string, React.ComponentType<any>> = {
  home: Home,
  about: User,
  services: Briefcase,
  skills: Code,
  projects: FolderGit,
  experience: History,
  contact: Mail,
};

const getSkillIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("react")) return ReactLight;
  if (lower.includes("next")) return NextjsIconDark;
  if (lower.includes("typescript")) return Typescript;
  if (lower.includes("node")) return Nodejs;
  if (lower.includes("python")) return Python;
  if (lower.includes("go") && !lower.includes("google")) return Golang;
  if (lower.includes("postgres")) return Postgresql;
  if (lower.includes("docker")) return Docker;
  if (lower.includes("kubernetes")) return Kubernetes;
  if (lower.includes("java") && !lower.includes("javascript")) return Java;
  if (lower.includes("c++") || lower.includes("c#") || lower.includes("csharp")) return Csharp;
  return null;
};

const getSocialIcon = (id: string, icon: string) => {
  const key = id.toLowerCase();
  if (key === "email" || key === "mail") return Icons.email;
  if (key === "whatsapp") return Icons.whatsapp;
  return Icons[key as keyof typeof Icons] || Icons.globe;
};

interface HackathonLink {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface Hackathon {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  mlh?: string;
  links: HackathonLink[];
}

export const DATA = {
  name: portfolioData.personal.name,
  initials: portfolioData.personal.firstName[0] + portfolioData.personal.lastName[0],
  url: portfolioData.seo.siteUrl,
  location: `${portfolioData.personal.location.city}, ${portfolioData.personal.location.country}`,
  locationLink: `https://www.google.com/maps/place/${encodeURIComponent(portfolioData.personal.location.city)}`,
  description: portfolioData.hero.tagline,
  summary: portfolioData.about.paragraphs.join("\n\n"),
  avatarUrl: portfolioData.personal.avatar,
  resumeUrl: portfolioData.personal.resumeUrl,
  githubUrl: portfolioData.social.find((s) => s.id === "github")?.url || "",
  linkedinUrl: portfolioData.social.find((s) => s.id === "linkedin")?.url || "",
  twitterUrl: "",
  services: portfolioData.services,

  skills: portfolioData.skills.map((skill: string) => ({
    name: skill,
    icon: getSkillIcon(skill),
  })),

  navbar: portfolioData.navigation.map((nav) => {
    const lowerLabel = nav.label.toLowerCase();
    const IconComponent = navigationIcons[lowerLabel] || Home;
    return {
      href: nav.href,
      label: nav.label,
      icon: IconComponent,
    };
  }),

  contact: {
    email: portfolioData.contact.email,
    tel: portfolioData.contact.phone,
    social: portfolioData.social.reduce((acc, s) => {
      const name = s.label;
      const IconComponent = getSocialIcon(s.id, s.icon);
      acc[name] = {
        name: name,
        url: s.url || "#",
        icon: IconComponent,
        navbar: s.id !== "email",
      };
      return acc;
    }, {} as Record<string, any>),
  },

  work: portfolioData.experience.map((exp) => ({
    company: exp.company,
    href: "",
    badges: exp.technologies,
    location: exp.location,
    title: exp.role,
    logoUrl: "",
    start: exp.startDate,
    end: exp.endDate || "Present",
    description: exp.description + (exp.points && exp.points.length > 0 ? "\n\n" + exp.points.map((p) => `- ${p}`).join("\n") : ""),
  })),

  education: portfolioData.education.map((edu) => ({
    school: edu.institution,
    href: "",
    degree: edu.degree + (edu.grade ? ` (${edu.grade})` : ""),
    logoUrl: "",
    start: edu.startYear.toString(),
    end: edu.endYear.toString(),
  })),

  projects: projectsData.projects.map((proj) => {
    const projectLinks = [];
    if (proj.links.live) {
      projectLinks.push({
        type: "Website",
        href: proj.links.live,
        icon: "globe",
      });
    }
    if (proj.links.github) {
      projectLinks.push({
        type: "Source",
        href: proj.links.github,
        icon: "github",
      });
    }
    if (proj.links.demo) {
      projectLinks.push({
        type: "Demo",
        href: proj.links.demo,
        icon: "globe",
      });
    }

    return {
      slug: proj.slug,
      title: proj.title,
      href: `/projects/${proj.slug}`,
      dates: proj.year.toString(),
      active: proj.status === "completed" || proj.status === "in-progress",
      description: proj.tagline,
      technologies: proj.tags,
      links: projectLinks.map((link) => {
        const IconComponent = Icons[link.icon as keyof typeof Icons] || Icons.globe;
        return {
          type: link.type,
          href: link.href,
          icon: React.createElement(IconComponent, { className: "size-3" }),
        };
      }),
      image: proj.image,
      video: "",
    };
  }),

  hackathons: [] as Hackathon[],
};
