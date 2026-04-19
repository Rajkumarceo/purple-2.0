"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

export const CyberCar = ({ scrollProgress, carRef }: { scrollProgress: MotionValue<number>, carRef: React.RefObject<THREE.Group | null> }) => {
  const velocity = useRef(0);
  const worldLength = -600;
  const podRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!carRef.current) return;
    
    const progress = scrollProgress.get(); 
    const targetZ = progress * worldLength;
    
    const currentZ = carRef.current.position.z;
    const targetSpeed = (targetZ - currentZ) * 2;
    velocity.current += (targetSpeed - velocity.current) * 0.05;
    
    carRef.current.position.z += velocity.current * delta * 15;

    const speed = Math.abs(velocity.current);
    
    // Smooth, professional hovering animation
    if (podRef.current) {
      podRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.5;
      podRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * (1 + speed);
    }
    
    // Altitude shift for later scenes
    if (progress > 0.5) {
      const floatY = 4 + Math.sin(state.clock.elapsedTime) * 0.5;
      carRef.current.position.y = THREE.MathUtils.lerp(carRef.current.position.y, floatY, 0.02);
      carRef.current.rotation.x = THREE.MathUtils.lerp(carRef.current.rotation.x, -0.05, 0.02);
    } else {
      carRef.current.position.y = THREE.MathUtils.lerp(carRef.current.position.y, 0, 0.05);
      carRef.current.rotation.x = THREE.MathUtils.lerp(carRef.current.rotation.x, 0, 0.05);
    }
  });

  return (
    <group ref={carRef} position={[0, 0, 0]}>
      <group ref={podRef}>
        {/* Core Capsule - Hyper minimalist */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.8, 2.5, 32, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Glass Canopy */}
        <mesh position={[0, 0.3, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.75, 1.8, 32, 32]} />
          <meshPhysicalMaterial 
            color="#000000" 
            transmission={1} 
            thickness={0.5}
            roughness={0} 
            ior={1.5}
          />
        </mesh>

        {/* Minimalist Energy Ring */}
        <mesh ref={ringRef} position={[0, 0, -1]}>
          <torusGeometry args={[1.2, 0.05, 16, 64]} />
          <meshBasicMaterial color="#0ea5e9" />
        </mesh>

        {/* Thruster Engine Glow */}
        <mesh position={[0, 0, 2.2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <pointLight position={[0, 0, 2.5]} color="#38bdf8" intensity={1.5} distance={5} />
      </group>
    </group>
  );
};
