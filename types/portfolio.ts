import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  images: string[];
  technologies: string[];
  github: string;
  demo: string;
};

export type TimelineItem = {
  title: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
};

export type Skill = {
  name: string;
  level: number;
  icon: LucideIcon;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export type Certificate = {
  title: string;
  institution: string;
  hours: string;
  year: string;
  image: string;
  url: string;
};
