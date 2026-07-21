"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Gold floating particles ───────────────────────────────────────────────────
function GoldParticles({ count = 20 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const startTime = useRef(0);

  const { positions, scales, speeds } = useMemo(() => {
    const pos: number[] = [];
    const sc: number[] = [];
    const sp: number[] = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5 - 2
      );
      sc.push(0.015 + Math.random() * 0.03);
      sp.push(0.2 + Math.random() * 0.5);
    }
    return { positions: pos, scales: sc, speeds: sp };
  }, [count]);

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
      <sphereGeometry args={[1, 6, 4]} />
      <meshStandardMaterial
        color="#D4A574"
        metalness={0.6}
        roughness={0.3}
        emissive="#B8845A"
        emissiveIntensity={0.05}
        transparent
        opacity={0.35}
      />
    </instancedMesh>
  );
}

// ── Decorative ring ───────────────────────────────────────────────────────────
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
      <torusGeometry args={[2.5, 0.02, 8, 48]} />
      <meshStandardMaterial
        color="#E8C4A0"
        metalness={0.5}
        roughness={0.3}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

// ── Scene content ────────────────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#D4A574" />
      <directionalLight position={[-3, 2, 4]} intensity={0.5} color="#E8C4A0" />
      <GoldParticles count={20} />
      <RotatingRing />
    </>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[0.5, 1]}
      frameloop="demand"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      onCreated={({ gl }) => {
        // Silently prevent context loss default handling
        gl.domElement.addEventListener("webglcontextlost", (e: Event) => {
          e.preventDefault();
        });
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
