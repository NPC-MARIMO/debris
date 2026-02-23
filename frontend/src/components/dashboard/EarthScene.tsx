import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Line, OrbitControls, useTexture } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { orbitConfigs } from '@/data/mockData';

interface EarthSceneProps {
  mode?: 'overview' | 'satellite';
  highlightedIndex?: number;
}

function TexturedEarth() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useTexture('/textures/earth.jpg');

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function WireframeEarth() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 24, 24]} />
      <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.1, 64, 64]} />
      <meshBasicMaterial color="#4da6ff" transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
  );
}

function OrbitRing({ radius, tilt, color, opacity = 0.35 }: { radius: number; tilt: number; color: string; opacity?: number }) {
  const points = useMemo(() => {
    return Array.from({ length: 129 }, (_, i) => {
      const angle = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    });
  }, [radius]);

  return (
    <group rotation={[tilt, 0, 0]}>
      <Line points={points} color={color} lineWidth={1} transparent opacity={opacity} />
    </group>
  );
}

function SatelliteModel({ orbitRadius, tilt, speed, color, highlighted }: {
  orbitRadius: number; tilt: number; speed: number; color: string; highlighted: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * speed;
      groupRef.current.position.set(Math.cos(t) * orbitRadius, 0, Math.sin(t) * orbitRadius);
      groupRef.current.rotation.y = -t;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[0.12, 0.06, 0.06]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={highlighted ? 1 : 0.3} />
        </mesh>
        <mesh position={[0.14, 0, 0]}>
          <boxGeometry args={[0.08, 0.01, 0.16]} />
          <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-0.14, 0, 0]}>
          <boxGeometry args={[0.08, 0.01, 0.16]} />
          <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>
        {highlighted && <pointLight color={color} intensity={2} distance={2} />}
      </group>
    </group>
  );
}

function DebrisField() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2.5;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        scale: 0.01 + Math.random() * 0.04,
        speed: 0.05 + Math.random() * 0.12,
        offset: Math.random() * Math.PI * 2,
      };
    }),
    []
  );

  useFrame((state) => {
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime * p.speed + p.offset;
      dummy.position.set(
        p.x * Math.cos(t) - p.z * Math.sin(t),
        p.y + Math.sin(t * 2) * 0.05,
        p.x * Math.sin(t) + p.z * Math.cos(t)
      );
      dummy.scale.setScalar(p.scale);
      dummy.rotation.set(t, t * 1.3, t * 0.7);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#999" emissive="#555" emissiveIntensity={0.2} roughness={0.9} />
    </instancedMesh>
  );
}

export default function EarthScene({ mode = 'overview', highlightedIndex = -1 }: EarthSceneProps) {
  return (
    <div className="w-full h-full" style={{ minHeight: '450px' }}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050a14']} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <Stars radius={100} depth={50} count={1500} factor={4} fade speed={0.8} />

        <Suspense fallback={<WireframeEarth />}>
          <TexturedEarth />
        </Suspense>
        <Atmosphere />

        {orbitConfigs.map((config, i) => (
          <OrbitRing
            key={`orbit-${i}`}
            radius={config.radius}
            tilt={config.tilt}
            color={config.color}
            opacity={highlightedIndex === i ? 0.7 : 0.25}
          />
        ))}

        {orbitConfigs.map((config, i) => (
          <SatelliteModel
            key={`sat-${i}`}
            orbitRadius={config.radius}
            tilt={config.tilt}
            speed={config.speed}
            color={config.color}
            highlighted={highlightedIndex === i}
          />
        ))}

        <DebrisField />

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={4}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
