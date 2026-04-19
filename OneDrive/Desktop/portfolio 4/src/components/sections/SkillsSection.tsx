"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", 
  "TensorFlow", "PyTorch", "GraphQL", "PostgreSQL", "AWS", 
  "Docker", "Three.js", "WebGL", "System Architecture"
];

export const SkillsSection = () => {
  return (
    <section className="relative min-h-[50vh] py-24 px-6 md:px-32 z-10 flex flex-col justify-center bg-background">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-12 tracking-tight text-foreground"
      >
        Neural Pathways
      </motion.h2>
      
      <div className="flex flex-wrap gap-3 max-w-4xl">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ 
              y: -2,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
            className="px-5 py-2 rounded-full border border-foreground/10 bg-white/50 backdrop-blur-sm text-foreground/80 text-sm md:text-base font-sans tracking-wide cursor-none transition-all duration-300 shadow-sm"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
