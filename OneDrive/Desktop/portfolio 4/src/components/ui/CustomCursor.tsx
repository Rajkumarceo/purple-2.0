"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Soft spring for elegant trailing
  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, [data-cursor="hover"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Main tiny dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-teal rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Soft trailing ring */}
      <motion.div
        className="fixed top-0 left-0 border border-accent-teal/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? "rgba(13, 148, 136, 0.05)" : "transparent",
          transition: "width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out",
        }}
      />
    </>
  );
};
