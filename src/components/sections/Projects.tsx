"use client";

import { projects } from "@/config/data";
import { ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4">
            Featured Projects
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            A selection of my recent work. These projects highlight my approach to problem-solving, system architecture, and user interface design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full bg-zinc-800 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-medium">
                  Project Image Placeholder
                </div>
                {/* 
                  When you have real images, replace the div above with:
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                */}
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-zinc-50 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-zinc-300 px-2 py-1 bg-zinc-800 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-800">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-50 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
                  >
                    <Code2 className="h-4 w-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
