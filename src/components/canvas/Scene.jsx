'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const CAMERA_WAYPOINTS = [
  { pos: [0,   3,   14],  target: [0, 1,   0]  }, // Hero — ocean wide
  { pos: [-3,  4,   10],  target: [0, 1.5, 0]  }, // About — pan left
  { pos: [0,   6,   6],   target: [0, 0,   0]  }, // Skills — rising
  { pos: [0,   3,   2],   target: [0, 1,  -10] }, // Experience — desert road
  { pos: [3,   5,  -2],   target: [0, 2,  -10] }, // Projects — dune crest
  { pos: [0,   8,  -4],   target: [0, 0,  -10] }, // Contact — night wide
];

const SKY_COLORS = [
  '#F5C97A', // Hero — Singapore warm dawn gold
  '#E8A855', // About — morning orange
  '#C47840', // Skills — heat haze
  '#8B4520', // Experience — dusk red
  '#2A1545', // Projects — deep purple night
  '#080B18', // Contact — full night
];

function lerpVec3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}
function lerpN(a, b, t) { return a + (b - a) * t; }

// ── Camera ────────────────────────────────────────────────────────────────────
const CameraRig = ({ progress }) => {
  const { camera, scene } = useThree();
  const tPos  = useRef(new THREE.Vector3());
  const tLook = useRef(new THREE.Vector3());
  const bg    = useRef(new THREE.Color(SKY_COLORS[0]));

  useFrame(() => {
    const total  = CAMERA_WAYPOINTS.length - 1;
    const scaled = progress * total;
    const idx    = Math.min(Math.floor(scaled), total - 1);
    const t      = scaled - idx;
    const next   = Math.min(idx + 1, total);

    tPos.current.set(...lerpVec3(CAMERA_WAYPOINTS[idx].pos, CAMERA_WAYPOINTS[next].pos, t));
    tLook.current.set(...lerpVec3(CAMERA_WAYPOINTS[idx].target, CAMERA_WAYPOINTS[next].target, t));

    camera.position.lerp(tPos.current, 0.04);
    camera.lookAt(tLook.current);

    bg.current.lerpColors(
      new THREE.Color(SKY_COLORS[idx]),
      new THREE.Color(SKY_COLORS[next]),
      t
    );
    scene.background = bg.current;

    if (scene.fog) {
      scene.fog.color.copy(bg.current);
      scene.fog.near = lerpN(18, 6, progress);
      scene.fog.far  = lerpN(80, 40, progress);
    }
  });
  return null;
};

// ── Ocean ─────────────────────────────────────────────────────────────────────
const Ocean = ({ progress }) => {
  const meshRef  = useRef();
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(80, 30, 60, 30);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t   = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const wave =
        Math.sin(x * 0.3 + t * 0.8)  * 0.12 +
        Math.sin(x * 0.15 + t * 0.5) * 0.18 +
        Math.sin(z * 0.2  + t * 0.6) * 0.1;
      pos.setY(i, wave);
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    // Fade out ocean as we scroll into desert
    meshRef.current.material.opacity = Math.max(0, 1 - progress * 4);
  });

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, -0.2, 10]}>
      <meshStandardMaterial
        color="#1A6A9A"
        transparent
        opacity={1}
        roughness={0.05}
        metalness={0.3}
      />
    </mesh>
  );
};

// ── Sun disc ──────────────────────────────────────────────────────────────────
const SunDisc = ({ progress }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    // Sun rises then sets
    const angle = Math.PI * 0.1 + progress * Math.PI * 0.8;
    ref.current.position.set(
      Math.cos(angle) * 25,
      Math.sin(angle) * 18 + 2,
      -20
    );
    ref.current.material.opacity = Math.max(0, 1 - progress * 1.8);
  });

  return (
    <mesh ref={ref} position={[15, 10, -20]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#FFE080"
        emissive="#FFD040"
        emissiveIntensity={2}
        transparent
        opacity={1}
      />
    </mesh>
  );
};

// ── Moon ─────────────────────────────────────────────────────────────────────
const Moon = ({ progress }) => {
  const visible = progress > 0.7;
  const opacity = Math.min(1, (progress - 0.7) / 0.15);
  return (
    <mesh position={[-8, 14, -20]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#E8E0C8"
        emissive="#C8C0A8"
        emissiveIntensity={visible ? opacity * 1.5 : 0}
        transparent
        opacity={visible ? opacity : 0}
      />
    </mesh>
  );
};

// ── Birds ─────────────────────────────────────────────────────────────────────
const Birds = ({ progress }) => {
  const groupRef = useRef();
  const count    = 12;

  const offsets = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 20,
      y: 3 + Math.random() * 4,
      z: (Math.random() - 0.5) * 10 + 6,
      speed: 0.4 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      amp:   0.15 + Math.random() * 0.15,
    })),
  []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Fade birds out as we enter desert
    groupRef.current.children.forEach((bird, i) => {
      const o = offsets[i];
      bird.position.x = o.x + Math.sin(t * o.speed * 0.3 + o.phase) * 3;
      bird.position.y = o.y + Math.sin(t * o.speed + o.phase) * o.amp;
      bird.position.z = o.z - (t * o.speed * 0.5) % 20;
      if (bird.position.z < -5) bird.position.z += 20;
      bird.material.opacity = Math.max(0, 1 - progress * 5);
    });
  });

  return (
    <group ref={groupRef}>
      {offsets.map((o, i) => (
        <mesh key={i} position={[o.x, o.y, o.z]} rotation={[0, Math.PI, 0]}>
          {/* Simple V-shape bird using two planes */}
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={6}
              array={new Float32Array([
                0, 0, 0,  -0.4, 0.15, 0,  -0.2, 0, 0,
                0, 0, 0,   0.4, 0.15, 0,   0.2, 0, 0,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <meshStandardMaterial
            color="#1A1A2A"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// ── Garden trees (Singapore) ──────────────────────────────────────────────────
const Gardens = ({ progress }) => {
  const trees = useMemo(() => [
    // Neatly placed along the shore — left to right, consistent z depth
    { x: -10, z: 5.5, h: 3.2, r: 0.9, variant: 0 },
    { x: -7,  z: 6.0, h: 2.8, r: 0.8, variant: 1 },
    { x: -4,  z: 5.8, h: 3.5, r: 1.0, variant: 0 },
    { x:  4,  z: 5.8, h: 3.0, r: 0.85, variant: 1 },
    { x:  7,  z: 6.0, h: 3.3, r: 0.9, variant: 2 },
    { x:  10, z: 5.5, h: 2.6, r: 0.75, variant: 0 },
  ], []);

  const CANOPY_COLORS = ['#2A7A38', '#358A42', '#3A9648'];

  return (
    <group>
      {trees.map((tree, i) => {
        const opacity = Math.max(0, 1 - progress * 4);
        return (
          <group key={i} position={[tree.x, 0, tree.z]}>
            {/* Trunk — clean cylinder */}
            <mesh position={[0, tree.h * 0.28, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.13, tree.h * 0.55, 7]} />
              <meshStandardMaterial
                color="#5C3A1E"
                roughness={0.95}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Lower canopy — wider, darker */}
            <mesh position={[0, tree.h * 0.72, 0]} castShadow>
              <sphereGeometry args={[tree.r * 1.15, 9, 7]} />
              <meshStandardMaterial
                color={CANOPY_COLORS[tree.variant]}
                roughness={0.85}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Upper canopy — smaller, lighter */}
            <mesh position={[0, tree.h * 0.95, 0]} castShadow>
              <sphereGeometry args={[tree.r * 0.65, 8, 6]} />
              <meshStandardMaterial
                color={CANOPY_COLORS[(tree.variant + 1) % 3]}
                roughness={0.85}
                transparent
                opacity={opacity * 0.9}
              />
            </mesh>

            {/* Top tuft */}
            <mesh position={[0, tree.h * 1.12, 0]}>
              <sphereGeometry args={[tree.r * 0.3, 6, 5]} />
              <meshStandardMaterial
                color="#4AAA58"
                roughness={0.8}
                transparent
                opacity={opacity * 0.8}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ── Desert terrain ────────────────────────────────────────────────────────────
const Terrain = ({ progress }) => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(80, 160, 100, 160);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Flat near ocean (z > 6), dunes in middle, flat far end
      const duneStrength = Math.max(0, Math.min(1, (-z + 4) / 12));
      const y = (
        Math.sin(x * 0.3)              * 0.9 +
        Math.sin(x * 0.1 + z * 0.07)  * 1.8 +
        Math.sin(z * 0.15 + x * 0.04) * 0.7 +
        Math.cos(x * 0.05 + z * 0.09) * 1.1 +
        Math.sin(x * 0.5  + z * 0.2)  * 0.3
      ) * duneStrength;
      pos.setY(i, y);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial color="#C4905A" roughness={0.93} metalness={0.01} />
    </mesh>
  );
};

// ── Sand particles ────────────────────────────────────────────────────────────
const SandParticles = ({ progress }) => {
  const meshRef = useRef();
  const count   = 700;
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 5 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      vel[i * 3]     = (Math.random() - 0.3) * 0.012;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = -Math.random() * 0.009;
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
      if (p[i * 3 + 2] < -15) {
        p[i * 3 + 2] = 15;
        p[i * 3]     = (Math.random() - 0.5) * 40;
        p[i * 3 + 1] = Math.random() * 4;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    // Particles intensify in desert
    meshRef.current.material.opacity = Math.min(0.7, progress * 1.4);
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
        opacity={0.1}
        sizeAttenuation
      />
    </points>
  );
};

// ── Heat haze overlay ─────────────────────────────────────────────────────────
const HeatHaze = ({ progress }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const hazeStrength = Math.min(1, Math.max(0, (progress - 0.25) / 0.3));
    ref.current.material.opacity = hazeStrength * 0.08 *
      (0.8 + Math.sin(clock.getElapsedTime() * 2.1) * 0.2);
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial
        color="#FFD080"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
};

// ── Shooting stars (desert night) ─────────────────────────────────────────────
const ShootingStars = ({ progress }) => {
  const ref    = useRef();
  const active = progress > 0.75;

  useFrame(({ clock }) => {
    if (!ref.current || !active) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((star, i) => {
      const speed = 0.8 + i * 0.3;
      star.position.x = ((star.userData.startX + t * speed * 2) % 40) - 20;
      star.position.y = star.userData.startY - (t * speed * 0.5 % 15);
      if (star.position.y < 2) {
        star.position.y = star.userData.startY;
        star.position.x = star.userData.startX;
      }
      star.material.opacity = Math.min(1, (progress - 0.75) / 0.1) *
        (0.6 + Math.sin(t * 3 + i) * 0.4);
    });
  });

  if (!active) return null;

  return (
    <group ref={ref}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          userData={{ startX: (Math.random() - 0.5) * 40, startY: 8 + Math.random() * 8 }}
          position={[(Math.random() - 0.5) * 40, 8 + Math.random() * 8, -15]}
        >
          <boxGeometry args={[1.5, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// ── Campfire ──────────────────────────────────────────────────────────────────
const Campfire = ({ progress }) => {
  const flameRef = useRef();
  const visible  = progress > 0.8;

  useFrame(({ clock }) => {
    if (!flameRef.current) return;
    const t = clock.getElapsedTime();
    flameRef.current.scale.y = 0.9 + Math.sin(t * 8) * 0.15;
    flameRef.current.scale.x = 0.9 + Math.sin(t * 6 + 1) * 0.1;
    flameRef.current.material.opacity = visible
      ? Math.min(1, (progress - 0.8) / 0.1) * (0.7 + Math.sin(t * 5) * 0.3)
      : 0;
  });

  return (
    <group position={[0, 0, 2]}>
      {/* Log base */}
      <mesh rotation={[0, Math.PI / 4, Math.PI / 2]} position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 6]} />
        <meshStandardMaterial color="#3A2010" roughness={0.9} />
      </mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.3, 0]}>
        <coneGeometry args={[0.12, 0.5, 8]} />
        <meshStandardMaterial
          color="#FF6020"
          emissive="#FF4010"
          emissiveIntensity={3}
          transparent
          opacity={0}
        />
      </mesh>
      {/* Fire glow */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={visible ? 2.5 : 0}
        color="#FF6020"
        distance={8}
      />
    </group>
  );
};

// ── Lighting ──────────────────────────────────────────────────────────────────
const DynamicLighting = ({ progress }) => {
  const night = Math.max(0, (progress - 0.55) / 0.45);
  const day   = Math.max(0, 1 - progress * 1.5);
  const dusk  = Math.max(0, Math.sin(progress * Math.PI));

  return (
    <>
      <ambientLight intensity={0.3 + day * 0.5} color="#FFE8C0" />
      <directionalLight
        position={[
          Math.cos(progress * Math.PI) * 15,
          Math.max(0.5, Math.sin(progress * Math.PI) * 12),
          -5,
        ]}
        intensity={Math.max(0, 2.5 - progress * 2)}
        color={progress < 0.5 ? '#FFD060' : '#FF8020'}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight
        skyColor={progress < 0.5 ? '#FFD080' : '#FF6030'}
        groundColor="#9B6E3A"
        intensity={0.6 + dusk * 0.4}
      />
      {/* Night blue ambient */}
      <ambientLight intensity={night * 0.2} color="#1A2060" />
      {/* Moonlight */}
      <directionalLight
        position={[-8, 15, -10]}
        intensity={night * 0.8}
        color="#C8D8FF"
      />
    </>
  );
};

// ── Master scene ──────────────────────────────────────────────────────────────
const SceneContent = () => {
  const { progress } = useScrollProgress();
  const night = Math.max(0, (progress - 0.65) / 0.35);

  return (
    <>
      <fog attach="fog" args={['#F5C97A', 18, 80]} />

      <DynamicLighting progress={progress} />

      <SunDisc progress={progress} />
      <Moon progress={progress} />

      {night > 0.1 && (
        <Stars
          radius={100}
          depth={50}
          count={6000}
          factor={4}
          saturation={0}
          fade
          speed={0.2}
        />
      )}

      <Ocean progress={progress} />
      <Terrain progress={progress} />
      <Gardens progress={progress} />
      <Birds progress={progress} />
      <SandParticles progress={progress} />
      <HeatHaze progress={progress} />
      <ShootingStars progress={progress} />
      <Campfire progress={progress} />

      <CameraRig progress={progress} />
    </>
  );
};

export default function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 3, 14], fov: 60, near: 0.1, far: 400 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#F5C97A');
        scene.fog = new THREE.Fog('#F5C97A', 18, 80);
      }}
      dpr={[1, 1.5]}
      shadows
    >
      <SceneContent />
    </Canvas>
  );
}