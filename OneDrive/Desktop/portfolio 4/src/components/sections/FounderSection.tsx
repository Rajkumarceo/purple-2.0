"use client";

import { motion } from "framer-motion";

export const FounderSection = () => {
  return (
    <section className="relative min-h-[60vh] py-32 px-6 md:px-32 z-10 flex justify-center items-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl"
      >
        <span className="inline-block text-accent-teal font-sans font-semibold tracking-[0.2em] text-xs uppercase mb-8 border border-accent-teal/20 py-2 px-6 rounded-full bg-accent-teal/5">
          Leadership & Vision
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight text-foreground">
          Titanobova Private Limited
        </h2>
        <p className="text-lg md:text-2xl text-foreground/60 font-sans font-light leading-relaxed">
          We engineer intelligent systems that drive the future forward. No noise, just pure architectural elegance.
        </p>
      </motion.div>
    </section>
  );
};
