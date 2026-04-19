"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

export const CameraRig = ({ scrollProgress, carRef }: { scrollProgress: MotionValue<number>, carRef: React.RefObject<THREE.Group | null> }) => {
  const targetPosition = new THREE.Vector3();
  const lookAtTarget = new THREE.Vector3();
  const baseFov = 45;
  const { mouse } = useThree();

  useFrame((state) => {
    if (!carRef.current) return;
    
    const progress = scrollProgress.get();
    const isFloating = progress > 0.6;
    
    // Stabilized tracking
    const camOffsetZ = isFloating ? 20 : 15;
    const camOffsetY = isFloating ? 6 : 4;

    targetPosition.copy(carRef.current.position);
    targetPosition.z += camOffsetZ;
    targetPosition.y += camOffsetY;
    
    // Smooth, professional parallax (removed jitter/random)
    targetPosition.x += mouse.x * 2.5; 
    targetPosition.y += mouse.y * 1.5; 
    
    const speed = 1 + progress * 5;
    const targetFov = baseFov + speed * 0.5; 
    
    const perspectiveCamera = state.camera as THREE.PerspectiveCamera;
    if (perspectiveCamera.fov) {
      perspectiveCamera.fov = THREE.MathUtils.lerp(perspectiveCamera.fov, targetFov, 0.05);
      perspectiveCamera.updateProjectionMatrix();
    }

    // Ultra-smooth lerp for professional stability
    state.camera.position.lerp(targetPosition, 0.04);

    // Look target stabilization
    lookAtTarget.copy(carRef.current.position);
    lookAtTarget.y += 1.5;
    lookAtTarget.x += mouse.x * 3;
    lookAtTarget.y += mouse.y * 1.5;
    
    state.camera.lookAt(lookAtTarget);
  });

  return null;
};
