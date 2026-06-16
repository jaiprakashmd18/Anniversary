// @ts-nocheck
"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function RotatingHeart() {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { geometry } = useMemo(() => {
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const geo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    geo.center();
    return { geometry: geo };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    const targetScale = hovered
      ? 1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      : 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    meshRef.current.scale.setScalar(targetScale);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <meshPhysicalMaterial
          color={hovered ? "#FF758F" : "#FF4D6D"}
          metalness={0.3}
          roughness={0.2}
          emissive="#FF1A40"
          emissiveIntensity={hovered ? 0.5 : 0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <pointLight color="#FF4D6D" intensity={hovered ? 3 : 2} distance={4} decay={2} />
    </Float>
  );
}

function OrbitingMemory({ index, total }) {
  const ref = useRef(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 3 + (index % 2) * 0.8;
  const speed = 0.15 + (index % 3) * 0.05;
  const yOffset = (index % 3 - 1) * 0.8;
  const colors = ["#FF4D6D", "#FF758F", "#FFD6E0", "#C084FC", "#60A5FA", "#34D399"];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = yOffset + Math.sin(t * 2) * 0.2;
    ref.current.rotation.y = -t;
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial
          color={colors[index % colors.length]}
          emissive={colors[index % colors.length]}
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      <pointLight color={colors[index % colors.length]} intensity={0.8} distance={1.5} decay={2} />
    </group>
  );
}

function ParticleField() {
  const ref = useRef(null);

  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      col[i * 3] = 1;
      col[i * 3 + 1] = 0.3 + t * 0.4;
      col[i * 3 + 2] = 0.4 + t * 0.4;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFD6E0" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#FF4D6D" castShadow />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
      <ParticleField />
      <RotatingHeart />
      {[...Array(8)].map((_, i) => (
        <OrbitingMemory key={i} index={i} total={8} />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 8, 100]} />
        <meshBasicMaterial color="#FF4D6D" transparent opacity={0.15} />
      </mesh>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  );
}

export default function LoveUniverseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="universe" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-xs text-white/50 tracking-[0.2em] uppercase">
            <span className="text-primary">✦</span>
            Chapter Three
            <span className="text-primary">✦</span>
          </div>
          <h2 className="section-title text-gradient mb-4">3D Love Universe</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Our love exists in its own universe — infinite, beautiful, and ever-expanding.
            Drag to explore.
          </p>
        </motion.div>

        <motion.div
          className="relative h-[500px] md:h-[700px] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            background: "radial-gradient(ellipse at center, #1a0a2e 0%, #0F172A 70%)",
            border: "1px solid rgba(255,77,109,0.2)",
            boxShadow: "0 0 60px rgba(255,77,109,0.1)",
          }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }} shadows gl={{ antialias: true, alpha: true }}>
            <Scene />
          </Canvas>
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p className="text-white/30 text-xs tracking-widest uppercase">✦ Drag to explore ✦</p>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(15,23,42,0.8) 100%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
