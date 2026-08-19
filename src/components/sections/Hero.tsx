"use client";

import { siteConfig } from "@/config/data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Card3D = dynamic(() => import("@/components/3d/band/Card3D"), { ssr: false });

export function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-zinc-300">{siteConfig.status}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-50">
              Hi, I&apos;m {siteConfig.name.split(" ")[0]}.<br />
              <span className="text-zinc-500">{siteConfig.role}</span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              {siteConfig.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-50 text-zinc-950 font-medium hover:bg-zinc-200 transition-colors"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-zinc-800 bg-transparent text-zinc-50 font-medium hover:bg-zinc-900 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center w-full"
          >
            <div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl rounded-full opacity-50 scale-75" />
              
              {/* 3D Container - Widened using viewport width to ensure the WebGL frustum never clips horizontally */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] min-w-[1500px] max-w-[4000px] h-full z-20">
                <ErrorBoundary>
                  <Card3D />
                </ErrorBoundary>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
