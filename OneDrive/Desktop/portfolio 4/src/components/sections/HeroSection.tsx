"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl text-center"
      >
        <span className="inline-block text-accent-teal font-sans text-xs tracking-[0.2em] uppercase font-semibold mb-8">
          Digital Nature Edition
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight leading-[1.1]">
          Engineering Living Systems
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/60 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-12">
          I am Rajkumar. I architect high-performance, intelligent digital environments that feel as organic and seamless as nature.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex justify-center"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
