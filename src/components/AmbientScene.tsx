"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function GoldParticles({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const startTime = useRef(0);

  const positions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5 - 2
      );
    }
    return pos;
  }, [count]);

  const scales = useMemo(
    () => Array.from({ length: count }, () => 0.015 + Math.random() * 0.03),
    [count]
  );

  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.2 + Math.random() * 0.5),
    [count]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    if (startTime.current === 0) startTime.current = performance.now();
    const t = (performance.now() - startTime.current) / 1000;
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1] + Math.sin(t * speeds[i] + x) * 0.25;
      const z = positions[i * 3 + 2];
      dummy.position.set(x, y, z);
      dummy.rotation.set(t * speeds[i] * 0.25, t * speeds[i] * 0.15, 0);
      dummy.scale.setScalar(scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#D4A574"
        metalness={0.8}
        roughness={0.2}
        emissive="#B8845A"
        emissiveIntensity={0.05}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

function RotatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(0);

  useFrame(() => {
    if (!meshRef.current) return;
    if (startTime.current === 0) startTime.current = performance.now();
    const t = (performance.now() - startTime.current) / 1000;
    meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.25;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshPhysicalMaterial
        color="#E8C4A0"
        metalness={0.7}
        roughness={0.25}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

export function AmbientScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1]}
      frameloop="demand"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      onCreated={({ gl }) => {
        setIsLoaded(true);
        // Prevent WebGL context loss from crashing the scene
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e: Event) => {
            e.preventDefault();
            console.warn(
              "WebGL context lost — attempting to restore..."
            );
          },
          false
        );
        gl.domElement.addEventListener(
          "webglcontextrestored",
          () => {
            console.log("WebGL context restored");
          },
          false
        );
      }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#D4A574" />
      <GoldParticles count={40} />
      <RotatingRing />
      <Environment preset="studio" />
    </Canvas>
  );
}
