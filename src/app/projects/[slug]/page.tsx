import projectsData from "../../../../data/projects.json";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import { 
  ChevronLeft, 
  ExternalLink, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Check,
  Globe,
  Github,
  Target
} from "lucide-react";
import { Icons } from "@/components/icons";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.projects.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    return undefined;
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-12 max-w-3xl mx-auto px-4">
      {/* Back Link */}
      <div className="flex justify-start mb-8">
        <Link 
          href="/#projects" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-xl px-3 py-1.5 inline-flex items-center gap-1.5 group bg-card/50"
        >
          <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Title & Header */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {project.category}
          </span>
          <span className="text-[11px] font-semibold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded-full inline-flex items-center gap-1">
            <Calendar className="size-3" /> {project.year}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>
        <p className="text-xl text-muted-foreground leading-normal font-medium">
          {project.subtitle}
        </p>
      </div>

      {/* Featured Banner Image */}
      {project.image && (
        <div className="w-full mb-10 overflow-hidden border border-border rounded-2xl shadow-xl bg-muted max-h-[400px] flex items-center justify-center">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* Metadata Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-border rounded-2xl bg-card/40 mb-10 text-sm">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider inline-flex items-center gap-1">
            <User className="size-3.5" /> My Role
          </span>
          <span className="text-foreground font-medium leading-relaxed">
            {project.role}
          </span>
        </div>

        {(project.duration || project.client) ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider inline-flex items-center gap-1">
              <Clock className="size-3.5" /> Project Info
            </span>
            <span className="text-foreground font-medium">
              {project.duration && `Duration: ${project.duration}`}
              {project.duration && project.client && <br />}
              {project.client && `Client: ${project.client}`}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider inline-flex items-center gap-1">
              <Clock className="size-3.5" /> Status
            </span>
            <span className="text-foreground font-medium capitalize">
              {project.status}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider inline-flex items-center gap-1">
            <Target className="size-3.5" /> Live Links
          </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs border border-border rounded-lg px-2.5 py-1 bg-background text-foreground hover:bg-muted transition-colors font-medium"
              >
                <Globe className="size-3" /> Live Site
              </a>
            )}
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs border border-border rounded-lg px-2.5 py-1 bg-background text-foreground hover:bg-muted transition-colors font-medium"
              >
                <Github className="size-3" /> GitHub
              </a>
            )}
            {project.links.demo && (
              <a 
                href={project.links.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs border border-border rounded-lg px-2.5 py-1 bg-background text-foreground hover:bg-muted transition-colors font-medium"
              >
                <ExternalLink className="size-3" /> Demo
              </a>
            )}
            {!project.links.live && !project.links.github && !project.links.demo && (
              <span className="text-muted-foreground text-xs italic">
                Internal enterprise / private project
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tech Stack Tags */}
      <div className="mb-10">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="text-xs font-medium border border-border px-2.5 py-1 rounded-xl bg-card"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative Section (Problem vs Solution) */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        <div className="border border-border/80 rounded-2xl p-6 bg-card/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-destructive/60" />
          <h2 className="text-lg font-bold text-foreground mb-2 inline-flex items-center gap-2">
            <AlertCircle className="size-4 text-destructive" /> The Challenge
          </h2>
          <div className="text-sm leading-relaxed text-muted-foreground prose dark:prose-invert">
            <Markdown>{project.problem}</Markdown>
          </div>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/60" />
          <h2 className="text-lg font-bold text-foreground mb-2 inline-flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-500" /> The Solution
          </h2>
          <div className="text-sm leading-relaxed text-muted-foreground prose dark:prose-invert">
            <Markdown>{project.solution}</Markdown>
          </div>
        </div>
      </div>

      {/* Features List */}
      {project.features && project.features.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 gap-3 pl-0">
            {project.features.map((feature, idx) => (
              <li 
                key={idx} 
                className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed p-4 border border-border rounded-xl bg-card/10 hover:bg-card/20 transition-colors"
              >
                <div className="mt-0.5 p-0.5 rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5 stroke-3" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Outcomes & Impact */}
      {project.outcomes && project.outcomes.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Results & Impact</h2>
          <ul className="grid grid-cols-1 gap-3 pl-0">
            {project.outcomes.map((outcome, idx) => (
              <li 
                key={idx} 
                className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed p-4 border border-border/60 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
              >
                <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="size-3.5 stroke-3" />
                </div>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
