import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

function DrumRing() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.05;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusGeometry args={[3.4, 0.01, 8, 96]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.35} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <Sparkles count={90} scale={[9, 6, 4]} size={2.2} speed={0.25} color="#d4af37" opacity={0.7} />
      <DrumRing />
    </Canvas>
  );
}
