import { ExternalLink, Code2, Briefcase, Mail, MessageCircle } from "lucide-react";

export const siteConfig = {
  name: "Your Name",
  role: "Full Stack Developer",
  status: "🟢 Available for Work",
  bio: "I build accessible, responsive, and performant web applications. Passionate about creating seamless user experiences and writing clean, scalable code.",
  email: "your.email@example.com",
  socials: [
    { name: "GitHub", url: "https://github.com", icon: Code2 },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Briefcase },
    { name: "Twitter", url: "https://twitter.com", icon: MessageCircle },
    { name: "Email", url: "mailto:your.email@example.com", icon: Mail },
  ]
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue", "Redux"]
  },
  {
    category: "Backend & Core",
    items: ["Node.js", "Express", "Python", "Django", "Go", "REST APIs", "GraphQL"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma ORM"]
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest", "Linux"]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive admin panel for e-commerce platforms with real-time analytics, inventory management, and order processing capabilities.",
    image: "/placeholder-project-1.jpg",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Prisma"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 2,
    title: "AI Writing Assistant",
    description: "A web application that leverages OpenAI's API to help users draft emails, articles, and code documentation with smart suggestions.",
    image: "/placeholder-project-2.jpg",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 3,
    title: "Task Management Flow",
    description: "A collaborative Kanban board application featuring drag-and-drop interfaces, team workspaces, and real-time activity tracking.",
    image: "/placeholder-project-3.jpg",
    tags: ["Vue.js", "Firebase", "Vuex", "SCSS"],
    liveUrl: "#",
    sourceUrl: "#",
  }
];
