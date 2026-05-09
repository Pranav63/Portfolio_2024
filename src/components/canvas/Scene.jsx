'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sky as DreiSky } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const CAMERA_WAYPOINTS = [
  { pos: [0,   2.5, 10],  target: [0, 0.8, 0]   },
  { pos: [-2,  3,   8],   target: [0, 1,   0]   },
  { pos: [2,   4,   7],   target: [0, 0.5, -2]  },
  { pos: [0,   2.5, 5],   target: [0, 1.2, -8]  },
  { pos: [4,   3,   4],   target: [0, 0.8, -2]  },
  { pos: [0,   7,   5],   target: [0, 0,   0]   },
];

function lerpVec3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

const CameraRig = ({ progress }) => {
  const { camera } = useThree();
  const targetPos  = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const total  = CAMERA_WAYPOINTS.length - 1;
    const scaled = progress * total;
    const idx    = Math.min(Math.floor(scaled), total - 1);
    const t      = scaled - idx;

    const from = CAMERA_WAYPOINTS[idx];
    const to   = CAMERA_WAYPOINTS[Math.min(idx + 1, total)];

    targetPos.current.set(...lerpVec3(from.pos,    to.pos,    t));
    targetLook.current.set(...lerpVec3(from.target, to.target, t));

    camera.position.lerp(targetPos.current, 0.04);
    camera.lookAt(targetLook.current);
  });

  return null;
};

function generateTerrain(width, depth, wSegs, dSegs) {
  const geo = new THREE.PlaneGeometry(width, depth, wSegs, dSegs);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y =
      Math.sin(x * 0.35)               * 0.8  +
      Math.sin(x * 0.12 + z * 0.08)    * 1.6  +
      Math.sin(z * 0.18 + x * 0.04)    * 0.6  +
      Math.cos(x * 0.06 + z * 0.10)    * 1.0  +
      Math.sin(x * 0.55 + z * 0.22)    * 0.3;
    pos.setY(i, y);
  }

  geo.computeVertexNormals();
  return geo;
}

const Terrain = () => {
  const geo = useMemo(() => generateTerrain(50, 80, 100, 150), []);

  return (
    <mesh geometry={geo} receiveShadow castShadow>
      <meshStandardMaterial
        color="#C8955A"
        roughness={0.92}
        metalness={0.02}
      />
    </mesh>
  );
};

const SandParticles = () => {
  const meshRef = useRef();
  const count   = 800;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      vel[i * 3]     = (Math.random() - 0.3) * 0.012;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = -Math.random() * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i * 3]     += velocities[i * 3];
      p[i * 3 + 1] += velocities[i * 3 + 1];
      p[i * 3 + 2] += velocities[i * 3 + 2];
      if (p[i * 3 + 2] < -20) {
        p[i * 3 + 2] = 20;
        p[i * 3]     = (Math.random() - 0.5) * 40;
        p[i * 3 + 1] = Math.random() * 4 + 0.5;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#F0D99A"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
};

const DynamicSky = ({ progress }) => {
  const turbidity  = 0.8 + progress * 5;
  const rayleigh   = 2.0 - progress * 1.2;
  const elevation  = 10 - progress * 22;
  const sunAngle   = Math.PI * 0.15 + progress * Math.PI * 0.5;

  return (
    <DreiSky
      distance={450}
      sunPosition={[
        Math.cos(sunAngle) * 100,
        Math.sin(Math.max(elevation, -6) * Math.PI / 180) * 100,
        -80,
      ]}
      turbidity={turbidity}
      rayleigh={rayleigh}
      mieCoefficient={0.002}
      mieDirectionalG={0.94}
    />
  );
};

const OasisMarkers = ({ progress }) => {
  const opacity = progress > 0.55
    ? Math.min((progress - 0.55) / 0.08, 1) * Math.min((0.85 - progress) / 0.05, 1)
    : 0;

  return (
    <group>
      {[[-1.8, 0.4, -3], [0, 0.6, -4], [1.8, 0.4, -3]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#C9A84C"
            emissive="#C9A84C"
            emissiveIntensity={Math.max(opacity, 0) * 2}
            transparent
            opacity={Math.max(opacity, 0)}
          />
        </mesh>
      ))}
    </group>
  );
};

const SceneContent = () => {
  const { progress } = useScrollProgress();
  const nightProgress = Math.max(0, (progress - 0.72) / 0.28);

  return (
    <>
      {/* Warm dawn/day ambient */}
      <ambientLight
        intensity={0.7 + (1 - progress) * 0.4}
        color="#FFE8C0"
      />

      {/* Main sun directional */}
      <directionalLight
        position={[8, 6, -4]}
        intensity={Math.max(0, 2.5 - progress * 2.0)}
        color="#FFD060"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Hemisphere — sky warmth vs ground */}
      <hemisphereLight
        skyColor="#FFD080"
        groundColor="#9B6E3A"
        intensity={0.9 - progress * 0.5}
      />

      {/* Night blue fill */}
      <pointLight
        position={[0, 5, 3]}
        intensity={nightProgress * 1.2}
        color="#3A5F8A"
        distance={30}
      />

      {/* Campfire gold glow — contact section */}
      <pointLight
        position={[0, 0.8, 2]}
        intensity={nightProgress * 2.0}
        color="#C9A84C"
        distance={12}
      />

      <DynamicSky progress={progress} />

      {nightProgress > 0.25 && (
        <Stars
          radius={100}
          depth={50}
          count={4000}
          factor={3.5}
          saturation={0}
          fade
          speed={0.3}
        />
      )}

      <Terrain />
      <SandParticles />
      <OasisMarkers progress={progress} />
      <CameraRig progress={progress} />
    </>
  );
};

export default function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 2.5, 10], fov: 58, near: 0.1, far: 600 }}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      dpr={[1, 1.5]}
      shadows
    >
      <SceneContent />
    </Canvas>
  );
}