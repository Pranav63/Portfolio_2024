import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

// ── Neural network constants ──────────────────────────────────────────────────
const NODE_COUNT = 70;
const CONNECT_DIST = 1.7;
const SPREAD = { x: 14, y: 8, z: 4 };

// ── Glow disc texture (radial gradient) ───────────────────────────────────────
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const c = size / 2;
  const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
  grad.addColorStop(0,   'rgba(0, 212, 255, 1)');
  grad.addColorStop(0.35,'rgba(0, 212, 255, 0.7)');
  grad.addColorStop(0.7, 'rgba(0, 212, 255, 0.15)');
  grad.addColorStop(1,   'rgba(0, 212, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// ── Neural network Three.js scene ─────────────────────────────────────────────
const NeuralNet = () => {
  const { mouse, viewport } = useThree();
  const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;

  // Single memo creates all mutable data + geometry together
  const { nodeGeo, lineGeo, velocities, glowTex } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * SPREAD.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD.z;
      vel[i * 3]     = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    const ng = new THREE.BufferGeometry();
    ng.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));

    return {
      nodeGeo: ng,
      lineGeo: lg,
      velocities: vel,
      glowTex: makeGlowTexture(),
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state) => {
    const np = nodeGeo.attributes.position.array;
    const lp = lineGeo.attributes.position.array;
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    // Update node positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      const x = np[ix], y = np[ix + 1];

      // Mouse repulsion within 2.5 world units
      const dx = x - mx;
      const dy = y - my;
      const dSq = dx * dx + dy * dy;
      if (dSq < 6.25 && dSq > 0.01) {
        const f = 0.012 / dSq;
        velocities[ix]     += dx * f;
        velocities[ix + 1] += dy * f;
      }

      // Boundary bounce
      if (Math.abs(np[ix])     > SPREAD.x / 2) velocities[ix]     *= -0.9;
      if (Math.abs(np[ix + 1]) > SPREAD.y / 2) velocities[ix + 1] *= -0.9;
      if (Math.abs(np[ix + 2]) > SPREAD.z / 2) velocities[ix + 2] *= -0.9;

      // Dampen & integrate
      velocities[ix]     *= 0.97;
      velocities[ix + 1] *= 0.97;
      velocities[ix + 2] *= 0.97;
      np[ix]     += velocities[ix];
      np[ix + 1] += velocities[ix + 1];
      np[ix + 2] += velocities[ix + 2];
    }

    // Build active edge segments
    let lineCount = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const ix = i * 3, jx = j * 3;
        const dx = np[ix] - np[jx];
        const dy = np[ix + 1] - np[jx + 1];
        const dz = np[ix + 2] - np[jx + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST) {
          const off = lineCount * 6;
          lp[off]     = np[ix];     lp[off + 1] = np[ix + 1]; lp[off + 2] = np[ix + 2];
          lp[off + 3] = np[jx];     lp[off + 4] = np[jx + 1]; lp[off + 5] = np[jx + 2];
          lineCount++;
        }
      }
    }

    lineGeo.setDrawRange(0, lineCount * 2);
    nodeGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <>
      {/* Nodes with glow disc */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          size={0.12}
          color="#00D4FF"
          transparent
          opacity={0.95}
          sizeAttenuation
          map={glowTex}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>

      {/* Edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.18} />
      </lineSegments>

      {/* Ambient purple accent nodes — second pass, larger, dimmer */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          size={0.22}
          color="#7928CA"
          transparent
          opacity={0.25}
          sizeAttenuation
          map={glowTex}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>
    </>
  );
};

// ── Hero section ──────────────────────────────────────────────────────────────
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Neural network canvas */}
      {mounted && (
        <Canvas
          style={{ position: 'absolute', inset: 0 }}
          camera={{ position: [0, 0, 9], fov: 58 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <NeuralNet />
        </Canvas>
      )}

      {/* Radial vignette so text is always readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, #050A14 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Text content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px',
        }}
      >
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#00D4FF',
            marginBottom: '18px',
          }}
        >
          Based in Singapore · ML &amp; AI Engineer
        </motion.p>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          Pranav{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #7928CA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Arora
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            color: 'rgba(226,232,240,0.7)',
            marginBottom: '44px',
            height: '2em',
          }}
        >
          <TypeAnimation
            sequence={[
              'Senior ML Engineer @ HPE',
              2200,
              'AI Systems Architect',
              2200,
              'GenAI & LLM Specialist',
              2200,
              'Production ML Deployments',
              2200,
            ]}
            speed={55}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,212,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 34px',
              background: '#00D4FF',
              color: '#050A14',
              borderRadius: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="https://drive.google.com/file/d/13eRwg012J-Q5AsMRfyBbHBOHw8MardYu/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, borderColor: '#00D4FF', boxShadow: '0 0 18px rgba(0,212,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 34px',
              background: 'transparent',
              color: '#00D4FF',
              border: '1px solid rgba(0,212,255,0.5)',
              borderRadius: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Resume
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <span
          style={{
            color: 'rgba(113,128,150,0.6)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, #00D4FF, transparent)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
