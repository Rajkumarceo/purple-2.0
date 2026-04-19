"use client";

import { motion } from "framer-motion";

export const TransformationSection = () => {
  return (
    <section className="relative h-[150vh] z-10 w-full pointer-events-none">
      <div className="sticky top-0 h-screen flex flex-col justify-end items-center pb-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          <p className="text-xl md:text-2xl text-foreground/60 font-sans font-light leading-relaxed">
            Code begins as a seed. Through careful iteration and architectural foresight, it blossoms into a living entity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
