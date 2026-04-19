"use client";

import { useScroll, useSpring } from "framer-motion";
import { Scene } from "@/components/three/Scene";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Tighter spring for extreme stability, eliminating wild camera jitter
  const springProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 1 });

  return (
    <main className="relative bg-[#020617] font-sans selection:bg-cyan-500/30">
      <Scene scrollProgress={springProgress} />
      <div className="relative w-full h-[800vh] pointer-events-none"></div>
    </main>
  );
}
