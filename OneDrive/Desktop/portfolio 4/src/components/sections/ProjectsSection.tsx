"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Engine Optimization",
    category: "Machine Learning",
    description: "Architected a high-performance neural network inference engine handling 10k+ requests per second with sub-10ms latency.",
  },
  {
    title: "Titanobova Core Platform",
    category: "System Architecture",
    description: "Built the scalable microservices backend powering the primary Titanobova platform using Node.js and gRPC.",
  },
  {
    title: "Generative Design Tool",
    category: "Full Stack AI",
    description: "Developed a WebGL-based generative design interface integrating real-time Stable Diffusion rendering.",
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-2xl glass-card overflow-hidden p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] cursor-none"
    >
      <span className="text-accent-teal text-xs font-sans uppercase tracking-[0.2em] font-semibold mb-4 block">
        {project.category}
      </span>
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight">
        {project.title}
      </h3>
      <p className="text-foreground/60 font-sans font-light leading-relaxed mb-8">
        {project.description}
      </p>
      
      <div className="flex items-center gap-2 text-sm font-semibold text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        View Project 
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  return (
    <section className="relative min-h-[80vh] py-32 px-6 md:px-32 z-10 bg-background/50 backdrop-blur-sm">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-16 tracking-tight text-center text-foreground"
      >
        Deployed Systems
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};
