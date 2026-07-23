import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Headphones,
  Laptop,
  Mail,
  MonitorCog,
  Palette,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import type {
  Certificate,
  NavItem,
  Project,
  SkillCategory,
  Stat,
  TimelineItem,
} from "@/types/portfolio";

export const siteUrl = "https://sergioloyola.dev";

export const profile = {
  name: "Sérgio Roberto de Oliveira Loyola",
  role: "Suporte, Helpdesk e Programador",
  location: "Teresina – PI",
  email: "sergiorbt12@gmail.com",
  phone: "(86) 98101-4021",
  github: "https://github.com/SergioRobert0",
  githubLabel: "github.com/SergioRobert0",
  linkedin:
    "https://www.linkedin.com/in/s%C3%A9rgio-roberto-oliveira-loyola-420b86255/",
  linkedinLabel: "linkedin.com/in/sérgio-roberto-oliveira-loyola-420b86255",
  image: "/assets/profile-sergio.jpeg",
  summary:
    "Estudante de Ciência da Computação e técnico em Desenvolvimento de Sistemas, com experiência em suporte técnico, helpdesk presencial e remoto, atendimento ao público e orientação de usuários.",
};

export const navItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Currículo", href: "#curriculo" },
  { label: "Contato", href: "#contato" },
];

export const stats: Stat[] = [
  { label: "Áreas de atuação", value: 3 },
  { label: "Experiências", value: 3 },
  { label: "Formações", value: 3 },
  { label: "Cursos complementares", value: 2 },
];

export const projects: Project[] = [
  {
    title: "ProTech",
    slug: "protech",
    description:
      "Aplicativo e ecossistema de ferramentas para educação técnica, com organização de conteúdos e recursos mobile.",
    image: "/assets/protech.png",
    images: [
      "/assets/project-protech-dashboard.svg",
      "/assets/project-protech-mobile.svg",
    ],
    technologies: ["Flutter", "Firebase", "Clean Architecture", "REST APIs"],
    github: "https://github.com/SergioRobert0",
    demo: "#contato",
  },
  {
    title: "LoveInLoop",
    slug: "loveinloop",
    description:
      "Aplicativo autoral com foco em experiência de uso, ciclos de interação e interface mobile.",
    image: "/assets/loveinloopprojeto.png",
    imageFit: "contain",
    images: [
      "/assets/project-loveinloop-mobile.svg",
      "/assets/project-loveinloop-flow.svg",
    ],
    technologies: ["Flutter", "Hive", "Firebase", "UI/UX"],
    github: "https://github.com/SergioRobert0",
    demo: "#contato",
  },
];

export const timeline: TimelineItem[] = [
  {
    title: "Helpdesk e Suporte de TI",
    company: "Secretaria da Agricultura Familiar — SAF · Teresina – PI",
    date: "10/2024 – 10/2026",
    description:
      "Atendimento de chamados de TI presencial e remoto, suporte e orientação a usuários, resolução de problemas em computadores, sistemas, equipamentos e periféricos, além de instalação e configuração de programas e dispositivos.",
    technologies: ["Helpdesk", "Suporte remoto", "Hardware", "Software"],
  },
  {
    title: "Triador e Técnico em Informática",
    company: "Instituto Nacional do Seguro Social — INSS · Campo Maior – PI",
    date: "2021 – 2022 · Estágio remunerado",
    description:
      "Atendimento e triagem de usuários, suporte básico de informática, orientação e encaminhamento de demandas, com apoio às rotinas administrativas e tecnológicas da instituição.",
    technologies: ["Atendimento", "Triagem", "Suporte técnico", "Rotinas administrativas"],
  },
  {
    title: "Sonoplasta",
    company: "Programa Viva Gonzagão — Rádio Verdes Campos SAT · Campo Maior – PI",
    date: "2020 – 2021",
    description:
      "Operação e organização de recursos de áudio, apoio técnico durante a programação e preparação de conteúdos sonoros.",
    technologies: ["Áudio", "Operação técnica", "Organização"],
  },
  {
    title: "Bacharelado em Ciência da Computação",
    company: "Universidade Estadual do Piauí — UESPI",
    date: "Conclusão prevista: 2028.1",
    description:
      "Formação superior em andamento, voltada aos fundamentos da computação e ao desenvolvimento de soluções tecnológicas.",
    technologies: ["Computação", "Programação", "Sistemas"],
  },
  {
    title: "Técnico em Desenvolvimento de Sistemas",
    company: "Instituto Federal do Piauí — IFPI",
    date: "Conclusão: 2023.1",
    description:
      "Formação técnica voltada ao desenvolvimento de sistemas e às práticas de tecnologia da informação.",
    technologies: ["Desenvolvimento de sistemas", "Tecnologia da informação"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Suporte de TI",
    skills: [
      { name: "Suporte presencial e remoto", level: 90, icon: Headphones },
      { name: "Atendimento de chamados", level: 88, icon: BriefcaseBusiness },
      { name: "Orientação a usuários", level: 90, icon: Users },
      { name: "Configuração de equipamentos", level: 84, icon: MonitorCog },
    ],
  },
  {
    title: "Sistemas e ferramentas",
    skills: [
      { name: "Manutenção de computadores", level: 82, icon: Wrench },
      { name: "Instalação de programas", level: 86, icon: Settings },
      { name: "Microsoft Word 2019", level: 82, icon: Laptop },
      { name: "Microsoft Excel 2019", level: 78, icon: Laptop },
    ],
  },
  {
    title: "Desenvolvimento",
    skills: [
      { name: "Desenvolvimento de sistemas", level: 78, icon: Code2 },
      { name: "Adobe Photoshop", level: 70, icon: Palette },
      { name: "Fundamentos de computação", level: 78, icon: GraduationCap },
      { name: "Comunicação técnica", level: 88, icon: Mail },
    ],
  },
];

export const certificates: Certificate[] = [
  {
    title: "Atendimento ao Público",
    institution: "Fundação Bradesco",
    hours: "Curso complementar",
    year: "Concluído",
    image: "/assets/fundacaobradesco.png",
    url: "#contato",
  },
  {
    title: "Tecnologia da Informação e Comunicação",
    institution: "SENAI São Paulo",
    hours: "Curso complementar",
    year: "Concluído",
    image: "/assets/senaisp.png",
    url: "#contato",
  },
  {
    title: "Análise de Dados e Modelagem Estatística com a Linguagem R",
    institution: "Universidade Estadual do Piauí — UESPI",
    hours: "Formação complementar",
    year: "2026",
    image: "/assets/ANALISE DE DADOS.png",
    url: "#contato",
  },
];

export const techStack = [
  "Suporte técnico",
  "Helpdesk",
  "Atendimento de chamados",
  "Suporte remoto",
  "Manutenção de computadores",
  "Instalação de programas",
  "Configuração de periféricos",
  "Microsoft Word 2019",
  "Microsoft Excel 2019",
  "Adobe Photoshop",
  "Desenvolvimento de sistemas",
  "Linguagem R",
];
