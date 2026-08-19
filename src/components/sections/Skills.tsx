"use client";

import { skills } from "@/config/data";
import { motion } from "framer-motion";

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-zinc-950/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4">
            Technical Skills
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            A comprehensive overview of the technologies and tools I use to build robust applications and seamless user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
            >
              <h3 className="text-xl font-semibold text-zinc-50 mb-6">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium text-zinc-300 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:bg-zinc-700 hover:text-zinc-50 hover:border-zinc-600 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
