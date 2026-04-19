"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Html, Text3D, Center, Instances, Instance, Environment } from "@react-three/drei";
import { MotionValue } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", 
  "TensorFlow", "PyTorch", "GraphQL", "PostgreSQL", "AWS", 
  "Docker", "Three.js", "WebGL", "System Architecture"
];

const projects = [
  {
    title: "AI Engine Optimization",
    category: "Machine Learning",
    description: "Architected a high-performance neural network inference engine handling 10k+ requests per second with sub-10ms latency.",
  },
  {
    title: "Titanobova Core Platform",
    category: "System Architecture",
    description: "Built the scalable microservices backend powering the primary platform using Node.js and gRPC.",
  },
  {
    title: "Generative Design Tool",
    category: "Full Stack AI",
    description: "Developed a WebGL-based generative design interface integrating real-time Stable Diffusion rendering.",
  }
];

// --- WebGL / VFX Simulated Assets ---

const RealisticWaterfall = ({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) => {
  const waterRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.children.forEach((child, i) => {
        // High speed fluid sim illusion
        child.position.y -= 0.4 + (i * 0.05);
        if (child.position.y < -20) child.position.y = 20;
      });
    }
  });

  return (
    <group position={position} rotation={rotation || [0,0,0]}>
      {/* Core Flow */}
      <mesh position={[0, 20, 0]}>
        <cylinderGeometry args={[2, 2.5, 40, 32]} />
        <meshPhysicalMaterial color="#e0f2fe" transmission={0.9} roughness={0.1} ior={1.33} thickness={2} />
      </mesh>
      {/* Animated VFX Ripples */}
      <group ref={waterRef}>
        {[...Array(10)].map((_, i) => (
          <mesh key={i} position={[0, i * 4 - 20, 0]}>
            <cylinderGeometry args={[2.2, 2.6, 2, 32]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.5} roughness={0.2} opacity={0.6} transparent clearcoat={1} />
          </mesh>
        ))}
      </group>
      {/* Foam / Splash Impact */}
      <mesh position={[0, 0, 0]}>
         <sphereGeometry args={[5, 32, 16]} />
         <meshBasicMaterial color="#ffffff" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
};

const Elephant = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const headRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (headRef.current) {
      // Interactive Raycast LookAt - Eyes follow the user's cursor
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -(state.pointer.x * 0.8), 0.05);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, (state.pointer.y * 0.5), 0.05);
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[3, 3, 5]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
      {[[-1.2, -2], [1.2, -2], [-1.2, 2], [1.2, 2]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 3]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
      ))}
      <group ref={headRef} position={[0, 3, 2.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh position={[0, -1.5, 1]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.2, 3]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.2, 2, 1.5]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[1.2, 0.5, 0]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.2, 2, 1.5]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[-0.6, -1, 1.5]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.1, 1.5]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0.6, -1, 1.5]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.1, 1.5]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>
    </group>
  );
};

const Tree = ({ position }: { position: [number, number, number] }) => {
  const leafRef = useRef<THREE.Mesh>(null);
  const offset = position[0] + position[2];
  
  useFrame((state) => {
     if (leafRef.current) {
        leafRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + offset) * 0.05;
        leafRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.2 + offset) * 0.05;
     }
  });
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial color="#292524" roughness={1} />
      </mesh>
      <mesh position={[0, 5, 0]} ref={leafRef} castShadow>
        <coneGeometry args={[3.5, 9]} />
        <meshStandardMaterial color="#0f3f21" roughness={0.9} />
      </mesh>
    </group>
  );
};

const TajMahal = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} receiveShadow>
        <boxGeometry args={[40, 2, 40]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 10, 18]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      <mesh position={[0, 15, 0]} castShadow>
        <sphereGeometry args={[7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} />
      </mesh>
      {[-16, 16].map(x => [-16, 16].map(z => (
        <group key={`${x}-${z}`} position={[x, 8, z]}>
          <mesh position={[0, 0, 0]} castShadow>
             <cylinderGeometry args={[0.8, 1.2, 16]} />
             <meshStandardMaterial color="#f8fafc" roughness={0.2} />
          </mesh>
          <mesh position={[0, 8.5, 0]} castShadow>
             <sphereGeometry args={[1]} />
             <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      )))}
    </group>
  )
};

const Fort = ({ position }: { position: [number, number, number] }) => {
  const stonePositions = useMemo(() => {
    const arr = [];
    for(let y=0; y<8; y++) {
      for(let x=-15; x<15; x++) {
        if (Math.random() > 0.7 && y > 4) continue; 
        arr.push([x * 2.1, y * 1.5 + 1, (Math.random() - 0.5) * 0.2]);
      }
    }
    return arr;
  }, []);

  const mossPositions = useMemo(() => {
    const arr = [];
    for(let i=0; i<40; i++) {
       arr.push([(Math.random() - 0.5) * 60, Math.random() * 5, 1.1]);
    }
    return arr;
  }, []);

  return (
    <group position={position}>
      {/* High-Performance Instanced Rendering */}
      <Instances limit={500} castShadow receiveShadow>
        <boxGeometry args={[2, 1.4, 2]} />
        <meshStandardMaterial color="#44403c" roughness={1.0} />
        {stonePositions.map((pos, i) => <Instance key={i} position={pos as any} />)}
      </Instances>
      
      <Instances limit={100}>
        <boxGeometry args={[3, 2, 0.5]} />
        <meshStandardMaterial color="#166534" roughness={1.0} />
        {mossPositions.map((pos, i) => <Instance key={i} position={pos as any} />)}
      </Instances>
    </group>
  )
};

export const CinematicEnvironment = ({ scrollProgress, carRef }: { scrollProgress: MotionValue<number>, carRef: React.RefObject<THREE.Group | null> }) => {
  const scene5Ref = useRef<THREE.Group>(null);
  const scene6Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const progress = scrollProgress.get();

    let targetColor = new THREE.Color("#09090b"); 
    let targetFogDensity = 0.01;

    if (progress < 0.15) {
      targetColor = new THREE.Color("#f1f5f9"); // Bright Clean Highway
      targetFogDensity = 0.008;
    } else if (progress >= 0.15 && progress < 0.30) {
      targetColor = new THREE.Color("#ecfdf5"); // Nature 
      targetFogDensity = 0.012;
    } else if (progress >= 0.30 && progress < 0.45) {
      targetColor = new THREE.Color("#fef3c7"); // Taj Mahal Golden
      targetFogDensity = 0.015; 
    } else if (progress >= 0.45 && progress < 0.6) {
      targetColor = new THREE.Color("#09090b"); // Tech Dark
      targetFogDensity = 0.025;
    } else if (progress >= 0.6 && progress < 0.8) {
      targetColor = new THREE.Color("#000000"); // AI Core Space
      targetFogDensity = 0.005; 
    } else if (progress >= 0.8) {
      targetColor = new THREE.Color("#0c4a6e"); // Innovation
    }

    if (state.scene.background instanceof THREE.Color) {
      state.scene.background.lerp(targetColor, 0.05);
    }
    if (state.scene.fog && state.scene.fog instanceof THREE.FogExp2) {
      state.scene.fog.color.lerp(targetColor, 0.05);
      state.scene.fog.density = THREE.MathUtils.lerp(state.scene.fog.density, targetFogDensity, 0.03);
    }

    if (scene5Ref.current) {
      scene5Ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }

    if (scene6Ref.current && carRef.current) {
      const t = state.clock.elapsedTime * 0.3;
      scene6Ref.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t + i) * 2;
      });
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Global Illumination (Simulated WebGPU Bounce Lighting) */}
      <Environment preset="city" />

      {/* CONTINUOUS ROAD */}
      <mesh position={[0, -0.1, -200]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 450]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* SCENE 1: REALISTIC HIGHWAY & SPATIAL TYPOGRAPHY */}
      <group position={[0, 0, -20]}>
        {/* Spatial Typography: Extruded 3D Text with Glass Shader */}
        <Center position={[-8, 12, -10]} rotation={[0, 0.2, 0]}>
          <Text3D 
            font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
            size={4}
            height={1.5}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.1}
            bevelSize={0.05}
          >
            MY PORTFOLIO
            <meshPhysicalMaterial 
              color="#ffffff" 
              transmission={1} 
              ior={1.6} 
              thickness={2} 
              roughness={0} 
              clearcoat={1} 
            />
          </Text3D>
        </Center>

        <Html transform position={[-6, 4, 0]} rotation={[0, 0.3, 0]} className="w-[500px]">
          <div className="p-12">
            <h1 className="text-7xl font-bold tracking-tighter text-white mb-6" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
              Engineering<br/>Living Systems.
            </h1>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              High-performance digital environments that feel as organic and seamless as nature.
            </p>
            <div className="mt-10">
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform">
                Explore World
              </button>
            </div>
          </div>
        </Html>
      </group>

      {/* SCENE 2: THE LIVING FOREST & INTERACTIVE FAUNA */}
      <group position={[0, 0, -120]}>
        {/* Interactive LookAt Elephant */}
        <Elephant position={[15, 0, -5]} scale={1.5} />
        <Elephant position={[-18, 0, 10]} scale={1.2} />

        <RealisticWaterfall position={[-30, 0, -20]} />
        <RealisticWaterfall position={[30, 0, 10]} />
        
        {[...Array(60)].map((_, i) => (
           <Tree key={i} position={[(Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 30), 0, (Math.random() - 0.5) * 100]} />
        ))}
        
        <Html transform position={[8, 5, 0]} rotation={[0, -0.3, 0]} className="w-[450px]">
          <div className="p-12">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-emerald-400 mb-4">The Architect</h2>
            <h3 className="text-4xl font-semibold text-white tracking-tight mb-6">Bridging complex algorithms and seamless UX.</h3>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              As the Founder of Titanobova Private Limited, I lead innovation in AI-driven solutions and robust backend infrastructures.
            </p>
          </div>
        </Html>
      </group>

      {/* SCENE 3: HERITAGE (Taj Mahal & Instanced Fort) */}
      <group position={[0, 0, -220]}>
        <TajMahal position={[45, 0, -20]} />
        <Fort position={[-45, 0, -40]} />
        
        <Html transform position={[-7, 6, 10]} rotation={[0, 0.3, 0]} className="w-[500px]">
          <div className="p-12">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-amber-400 mb-4">Timeless Foundations</h2>
            <h3 className="text-4xl font-serif text-white mb-6">Resilient, scalable, and beautifully structured.</h3>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Drawing inspiration from historical architectural marvels, building systems designed to stand the test of time.
            </p>
          </div>
        </Html>
      </group>

      {/* SCENE 4: TECH TRANSITION */}
      <group position={[0, 0, -320]}>
        <gridHelper args={[80, 60, "#0ea5e9", "#0284c7"]} position={[0, -0.05, 0]} />
        {[...Array(30)].map((_, i) => (
          <mesh key={i} position={[(Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 15), Math.random() * 20, (Math.random() - 0.5) * 80]}>
            <boxGeometry args={[5, Math.random() * 30 + 10, 5]} />
            <meshStandardMaterial color="#0ea5e9" wireframe />
          </mesh>
        ))}
      </group>

      {/* SCENE 5: AI WORLD */}
      <group position={[0, 0, -420]} ref={scene5Ref}>
        <Html transform position={[0, 15, 0]} center className="w-[800px] text-center">
          <h2 className="text-7xl font-bold tracking-tighter text-white mb-4">Neural Pathways</h2>
          <p className="text-zinc-400 text-lg">System Capabilities Analysis</p>
        </Html>
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const radius = 20 + (i % 2) * 5;
          return (
            <Html key={skill} transform position={[Math.cos(angle) * radius, Math.sin(angle) * 10 + 6, (Math.random() - 0.5) * 10]} center>
              <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium text-lg hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer">
                {skill}
              </div>
            </Html>
          )
        })}
      </group>

      {/* SCENE 6: ANTIGRAVITY CORE */}
      <group position={[0, 0, -540]}>
        <group ref={scene6Ref}>
          {projects.map((project, i) => (
            <Html key={i} transform position={[(i - 1) * 16, 8, (i === 1 ? -12 : 0)]} rotation={[0, (i - 1) * -0.3, 0]} center>
              <div className="w-[400px] p-8 rounded-[2rem] bg-[#09090b]/80 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer group">
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4 block">{project.category}</span>
                <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-zinc-400 text-base font-light leading-relaxed">{project.description}</p>
              </div>
            </Html>
          ))}
        </group>

        <group position={[0, 0, -40]}>
          <Html transform position={[-12, 8, 10]} rotation={[0, 0.4, 0]} className="w-[450px]">
            <div className="p-12 rounded-[2.5rem] bg-[#09090b]/90 backdrop-blur-2xl border border-white/10 text-white flex flex-col">
              <h2 className="text-4xl font-semibold mb-2 tracking-tight">Initiate Contact</h2>
              <p className="text-zinc-400 mb-10">Secure transmission channel.</p>
              
              <div className="w-full space-y-6">
                 <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light" placeholder="Name" />
                 <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light" placeholder="Email" />
                 
                 <button className="w-full rounded-xl bg-white text-black py-4 font-semibold hover:bg-zinc-200 transition-colors mt-4">
                   Transmit Signal
                 </button>
              </div>
            </div>
          </Html>
          <mesh ref={coreRef} position={[12, 12, -10]}>
            <icosahedronGeometry args={[20, 2]} />
            <meshPhysicalMaterial color="#0284c7" emissive="#0ea5e9" emissiveIntensity={0.6} wireframe thickness={3} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
