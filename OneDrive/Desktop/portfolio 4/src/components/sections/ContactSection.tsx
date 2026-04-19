"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <section className="relative min-h-screen py-32 px-6 md:px-32 z-10 flex flex-col justify-center items-center bg-background/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg glass-card p-8 md:p-12 rounded-3xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">
            Initiate Contact
          </h2>
          <p className="text-foreground/60 font-sans font-light">
            Let&apos;s build something elegant together.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              type="text" 
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="peer w-full bg-transparent border-b border-foreground/20 px-0 py-2 outline-none focus:border-accent-teal transition-colors text-foreground font-sans text-base placeholder-transparent cursor-none"
              placeholder="Name"
            />
            <label 
              htmlFor="name"
              className="absolute left-0 top-2 text-foreground/40 font-sans text-base transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-teal peer-valid:-top-4 peer-valid:text-xs pointer-events-none"
            >
              Name
            </label>
          </div>
          
          <div className="relative">
            <input 
              type="email" 
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="peer w-full bg-transparent border-b border-foreground/20 px-0 py-2 outline-none focus:border-accent-teal transition-colors text-foreground font-sans text-base placeholder-transparent cursor-none"
              placeholder="Email"
            />
            <label 
              htmlFor="email"
              className="absolute left-0 top-2 text-foreground/40 font-sans text-base transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-teal peer-valid:-top-4 peer-valid:text-xs pointer-events-none"
            >
              Email Address
            </label>
          </div>
          
          <div className="relative pt-2">
            <textarea 
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="peer w-full bg-transparent border-b border-foreground/20 px-0 py-2 outline-none focus:border-accent-teal transition-colors text-foreground font-sans text-base placeholder-transparent resize-none cursor-none"
              placeholder="Message"
            />
            <label 
              htmlFor="message"
              className="absolute left-0 top-4 text-foreground/40 font-sans text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-teal peer-valid:-top-4 peer-valid:text-xs pointer-events-none"
            >
              Message
            </label>
          </div>

          <div className="pt-6 h-12 relative">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-0 flex items-center justify-center text-accent-green font-semibold font-sans gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Message Sent
                </motion.div>
              ) : (
                <motion.button 
                  key="submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  disabled={isSubmitting}
                  className="w-full h-12 bg-foreground text-background rounded-full font-sans font-medium tracking-wide transition-transform active:scale-95 disabled:opacity-50 cursor-none flex items-center justify-center hover:bg-foreground/90 shadow-md"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </section>
  );
};
