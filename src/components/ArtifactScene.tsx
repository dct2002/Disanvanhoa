import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

/** Placeholder 3D model of a Đông Sơn bronze drum, built procedurally with Three.js.
 *  Replace with a real .glb/.gltf model by loading it via useGLTF and swapping the
 *  <DrumModel /> body for <primitive object={gltf.scene} />. */
function DrumProfile() {
  const points = useMemo(() => {
    const raw: [number, number][] = [
      [0, 0],
      [1.05, 0],
      [1.05, 0.06],
      [0.92, 0.14],
      [0.98, 0.4],
      [0.86, 0.62],
      [0.9, 0.86],
      [0.78, 1.0],
      [0.82, 1.18],
      [0.74, 1.3],
      [0.98, 1.42],
      [1.0, 1.5],
      [0, 1.5],
    ];
    return raw.map(([x, y]) => new THREE.Vector2(x, y));
  }, []);
  return points;
}

function DrumModel({ autoRotate }: { autoRotate: boolean }) {
  const groupRef = useRef<Group>(null);
  const points = DrumProfile();

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 64]} />
        <meshStandardMaterial
          color="#7a6538"
          metalness={0.45}
          roughness={0.48}
          emissive="#2a2010"
          emissiveIntensity={0.1}
        />
      </mesh>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.55, 1.505, Math.sin(a) * 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.02, 0.05, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ArtifactScene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <Canvas
      shadows="percentage"
      camera={{ position: [0, 0.4, 4.4], fov: 40 }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#0b0908"]} />
      <hemisphereLight args={["#f4e9d8", "#1a1310", 0.7]} />
      <ambientLight intensity={0.55} />
      <spotLight
        position={[1.8, 4, 3.5]}
        angle={0.55}
        penumbra={0.6}
        intensity={5.5}
        distance={20}
        color="#f4e9d8"
        castShadow
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#d4af37" />
      <pointLight position={[0, 0.2, 4]} intensity={1.1} color="#f4e9d8" />
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3, 48]} />
        <meshStandardMaterial color="#14100f" roughness={0.9} />
      </mesh>
      <DrumModel autoRotate={autoRotate} />
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
