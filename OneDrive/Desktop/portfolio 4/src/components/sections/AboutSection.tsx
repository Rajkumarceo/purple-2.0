"use client";

import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-32 z-10 flex items-center bg-background/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight text-foreground">
          The Architect
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl font-sans font-light text-foreground/70 leading-relaxed border-l border-foreground/10 pl-6 md:pl-10">
          <p>
            I build scalable, intelligent systems that bridge the gap between complex algorithms and seamless user experiences.
          </p>
          <p>
            As the Founder of Titanobova Private Limited, I lead innovation in AI-driven solutions and robust backend infrastructures, transforming ambitious concepts into production-ready reality.
          </p>
          <p>
            Whether it&apos;s training neural networks or architecting high-performance APIs, my focus is always on efficiency, scalability, and elegance.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
