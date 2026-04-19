"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

import { CyberCar } from "./CyberCar";
import { CinematicEnvironment } from "./CinematicEnvironment";
import { CameraRig } from "./CameraRig";

export const Scene = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const [mounted, setMounted] = useState(false);
  const carRef = useRef<THREE.Group>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={["#e0f2fe"]} />
        <fogExp2 attach="fog" args={["#e0f2fe", 0.015]} />
        
        <Suspense fallback={null}>
          <CinematicEnvironment scrollProgress={scrollProgress} carRef={carRef} />
          <CyberCar scrollProgress={scrollProgress} carRef={carRef} />
          <CameraRig scrollProgress={scrollProgress} carRef={carRef} />
        </Suspense>
        
        <ambientLight intensity={0.8} />
        <directionalLight position={[20, 30, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#bae6fd" />
      </Canvas>
    </div>
  );
};
