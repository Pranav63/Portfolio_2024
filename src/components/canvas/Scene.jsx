'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

// ── Waypoints ─────────────────────────────────────────────────────────────────
const WAYPOINTS = [
  { pos: [0, 2.8, 14],  target: [0, 0.8,  0]  },
  { pos: [-2, 3.5, 10], target: [0, 1.2,  0]  },
  { pos: [2,  5,   6],  target: [0, 0.8, -3]  },
  { pos: [0,  2.8, 1],  target: [0, 1.2,-12]  },
  { pos: [3,  4,  -3],  target: [0, 2,  -10]  },
  { pos: [0,  7,  -1],  target: [0, 0,   -6]  },
];

// Sky palette — per section, [horizon, midsky, zenith]
const SKY_PALETTE = [
  { h: [0.96, 0.76, 0.40], m: [0.52, 0.72, 0.94], z: [0.20, 0.42, 0.80] }, // dawn
  { h: [0.94, 0.58, 0.22], m: [0.40, 0.58, 0.88], z: [0.14, 0.30, 0.72] }, // morning
  { h: [0.82, 0.38, 0.10], m: [0.20, 0.30, 0.60], z: [0.08, 0.16, 0.50] }, // noon heat
  { h: [0.60, 0.22, 0.06], m: [0.12, 0.10, 0.30], z: [0.05, 0.06, 0.24] }, // dusk
  { h: [0.10, 0.06, 0.18], m: [0.05, 0.04, 0.14], z: [0.02, 0.02, 0.10] }, // twilight
  { h: [0.02, 0.02, 0.06], m: [0.01, 0.01, 0.05], z: [0.00, 0.00, 0.03] }, // night
];

function lV(a, b, t) {
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];
}
function getIdx(progress) {
  const total  = WAYPOINTS.length - 1;
  const scaled = progress * total;
  const idx    = Math.min(Math.floor(scaled), total - 1);
  return { idx, t: scaled - idx, next: Math.min(idx + 1, total) };
}

// ── Camera ────────────────────────────────────────────────────────────────────
const CameraRig = ({ progress }) => {
  const { camera, scene } = useThree();
  const tp = useRef(new THREE.Vector3());
  const tl = useRef(new THREE.Vector3());
  const bg = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    const { idx, t, next } = getIdx(progress);
    tp.current.set(...lV(WAYPOINTS[idx].pos,    WAYPOINTS[next].pos,    t));
    tl.current.set(...lV(WAYPOINTS[idx].target, WAYPOINTS[next].target, t));

    // Idle drift when user hasn't scrolled — camera breathes
    const idle = Math.max(0, 1 - progress * 8);
    const time = clock.getElapsedTime();
    tp.current.x += Math.sin(time * 0.18) * 0.4 * idle;
    tp.current.y += Math.sin(time * 0.12) * 0.15 * idle;

    camera.position.lerp(tp.current, 0.045);
    camera.lookAt(tl.current);

    // Sky background — lerp horizon color
    const cA = SKY_PALETTE[idx].h;
    const cB = SKY_PALETTE[next].h;
    bg.current.setRGB(...lV(cA, cB, t));
    scene.background = bg.current;

    // Exponential fog — thicker at dusk/night
    if (scene.fog) {
      scene.fog.color.copy(bg.current);
      scene.fog.density = 0.018 + progress * 0.025;
    }
  });
  return null;
};

// ── Sky dome — hemisphere gradient ───────────────────────────────────────────
// A large sphere with a vertex-color gradient — no UV seams
const SkyDome = ({ progress }) => {
  const meshRef = useRef();

  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(280, 32, 16);
    // We'll update vertex colors each frame via uniforms
    return g;
  }, []);

  const vertShader = `
    varying float vY;
    void main() {
      vY = normalize(position).y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragShader = `
    varying float vY;
    uniform vec3 uHorizon;
    uniform vec3 uMid;
    uniform vec3 uZenith;
    void main() {
      float t = clamp(vY, 0.0, 1.0);
      vec3 col = mix(uHorizon, uMid,   smoothstep(0.0, 0.25, t));
      col       = mix(col,     uZenith, smoothstep(0.2, 0.8,  t));
      // ground — dark below horizon
      col = mix(vec3(0.12, 0.08, 0.04), col, smoothstep(-0.08, 0.08, vY));
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    uHorizon: { value: new THREE.Color(...SKY_PALETTE[0].h) },
    uMid:     { value: new THREE.Color(...SKY_PALETTE[0].m) },
    uZenith:  { value: new THREE.Color(...SKY_PALETTE[0].z) },
  }), []);

  useFrame(() => {
    if (!meshRef.current) return;
    const { idx, t, next } = getIdx(progress);
    const p = SKY_PALETTE, u = uniforms;
    u.uHorizon.value.setRGB(...lV(p[idx].h, p[next].h, t));
    u.uMid.value.setRGB(...lV(p[idx].m,     p[next].m, t));
    u.uZenith.value.setRGB(...lV(p[idx].z,  p[next].z, t));
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <shaderMaterial
        vertexShader={vertShader}
        fragmentShader={fragShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};

// ── Sun ───────────────────────────────────────────────────────────────────────
const Sun = ({ progress }) => {
  const ref = useRef();

  const vertShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
  const fragShader = `
    varying vec2 vUv;
    uniform float uOpacity;
    uniform vec3  uColor;
    void main() {
      float d     = distance(vUv, vec2(0.5));
      float disc  = 1.0 - smoothstep(0.0,  0.15, d);
      float glow1 = 1.0 - smoothstep(0.12, 0.45, d);
      float glow2 = 1.0 - smoothstep(0.35, 1.0,  d);
      vec3 col = uColor * disc
               + uColor * 0.5 * glow1
               + uColor * 0.12 * glow2;
      float a = (disc + glow1 * 0.4 + glow2 * 0.15) * uOpacity;
      gl_FragColor = vec4(col, a);
    }
  `;

  const uniforms = useMemo(() => ({
    uOpacity: { value: 1.0 },
    uColor:   { value: new THREE.Color(1.0, 0.85, 0.45) },
  }), []);

  useFrame(() => {
    if (!ref.current) return;
    const angle = -Math.PI * 0.05 + progress * Math.PI * 0.9;
    ref.current.position.set(
      Math.cos(angle) * 80,
      Math.sin(angle) * 55 + 5,
      -120
    );
    ref.current.lookAt(0, 0, 0);
    const night = Math.max(0, (progress - 0.52) / 0.18);
    uniforms.uOpacity.value = Math.max(0, 1 - night);
    // Dawn gold → noon white → sunset red
    const phase = progress;
    uniforms.uColor.value.setRGB(
      1.0,
      Math.max(0.3, 0.9 - phase * 0.6),
      Math.max(0.05, 0.45 - phase * 0.43)
    );
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[22, 22]} />
      <shaderMaterial
        vertexShader={vertShader}
        fragmentShader={fragShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// ── Moon ─────────────────────────────────────────────────────────────────────
const Moon = ({ progress }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    const vis = Math.max(0, (progress - 0.62) / 0.18);
    ref.current.material.opacity  = vis * 0.92;
    ref.current.material.emissiveIntensity = vis * 0.6;
  });
  return (
    <mesh ref={ref} position={[-55, 55, -100]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial
        color="#E8E4D4"
        emissive="#B0A888"
        emissiveIntensity={0}
        roughness={0.9}
        transparent
        opacity={0}
      />
    </mesh>
  );
};

// ── Terrain with GLSL Simplex noise ──────────────────────────────────────────
const Terrain = ({ progress }) => {
  const matRef = useRef();

  const vert = `
    varying vec3 vPos;
    varying float vH;

    vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);
      const vec4 D=vec4(0.,.5,1.,2.);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=1.-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-D.yyy;
      i=mod289v3(i);
      vec4 p=permute(permute(permute(
        i.z+vec4(0.,i1.z,i2.z,1.))
        +i.y+vec4(0.,i1.y,i2.y,1.))
        +i.x+vec4(0.,i1.x,i2.x,1.));
      float n_=.142857142857;
      vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);
      vec4 y_=floor(j-7.*x_);
      vec4 x=x_*ns.x+ns.yyyy;
      vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);
      vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.+1.;
      vec4 s1=floor(b1)*2.+1.;
      vec4 sh=-step(h,vec4(0.));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);
      vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z);
      vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
      m=m*m;
      return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    uniform float uTime;
    void main(){
      float n =
        snoise(vec3(position.x*.20, 0., position.z*.13)) * 2.2 +
        snoise(vec3(position.x*.40 + uTime*.04, 0., position.z*.30)) * 0.9 +
        snoise(vec3(position.x*.80, 0., position.z*.60)) * 0.35;
      float h = n * smoothstep(0., 6., -position.z - 2.);
      vH   = h;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, h, position.z, 1.0);
    }
  `;

  const frag = `
    varying vec3  vPos;
    varying float vH;
    uniform float uNight;
    uniform vec3  uSandA;
    uniform vec3  uSandB;
    uniform vec3  uLightDir;

    void main(){
      // blend by height
      float t    = clamp(vH * 0.38 + 0.52, 0., 1.);
      vec3 sand  = mix(uSandA, uSandB, t);

      // fake diffuse
      float diff = max(dot(vec3(0.,1.,0.), normalize(uLightDir)), 0.0);
      sand *= 0.55 + diff * 0.55;

      // crest highlight
      float crest = smoothstep(0.8, 2.2, vH);
      sand += vec3(0.18, 0.12, 0.05) * crest * (1. - uNight * 0.8);

      // night tint
      sand = mix(sand, sand * vec3(0.28, 0.32, 0.45), uNight * 0.75);

      gl_FragColor = vec4(sand, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uNight:    { value: 0 },
    uSandA:    { value: new THREE.Color(0.42, 0.28, 0.12) },
    uSandB:    { value: new THREE.Color(0.88, 0.68, 0.38) },
    uLightDir: { value: new THREE.Vector3(1, 2, 0.5).normalize() },
  }), []);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value  = clock.getElapsedTime();
    matRef.current.uniforms.uNight.value = Math.max(0, (progress - 0.58) / 0.38);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -8]}>
      <planeGeometry args={[80, 140, 180, 220]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// ── Sand particles ────────────────────────────────────────────────────────────
const Sand = ({ progress }) => {
  const ref   = useRef();
  const COUNT = 5000;

  const { pos, vel, rnd } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const v = new Float32Array(COUNT * 3);
    const r = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      p[i*3]   = (Math.random()-.5) * 55;
      p[i*3+1] = Math.random() * 5;
      p[i*3+2] = (Math.random()-.5) * 45;
      v[i*3]   = (Math.random()-.25) * 0.025;
      v[i*3+1] = (Math.random()-.5) * 0.003;
      v[i*3+2] = -(Math.random() * 0.018 + 0.004);
      r[i]     = Math.random();
    }
    return { pos: p, vel: v, rnd: r };
  }, []);

  const vert = `
    attribute float aRnd;
    uniform float uOpacity;
    uniform float uTime;
    varying float vOp;
    void main(){
      vOp = uOpacity * (0.4 + aRnd * 0.6);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = (1.2 + aRnd * 1.8) * (120. / -mv.z);
      gl_Position  = projectionMatrix * mv;
    }
  `;
  const frag = `
    varying float vOp;
    void main(){
      float d = distance(gl_PointCoord, vec2(0.5));
      float a = (1. - smoothstep(0.35, 0.5, d)) * vOp;
      gl_FragColor = vec4(0.90, 0.76, 0.50, a);
    }
  `;

  const uniforms = useMemo(() => ({
    uOpacity: { value: 0 },
    uTime:    { value: 0 },
  }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array;
    const intensity = Math.min(1, progress * 2.2);
    for (let i = 0; i < COUNT; i++) {
      p[i*3]   += vel[i*3]   * (0.2 + intensity * 0.8);
      p[i*3+1] += vel[i*3+1];
      p[i*3+2] += vel[i*3+2];
      if (p[i*3+2] < -22) {
        p[i*3+2] = 22;
        p[i*3]   = (Math.random()-.5) * 55;
        p[i*3+1] = Math.random() * 4.5;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    uniforms.uOpacity.value = Math.min(0.5, progress * 1.0);
    uniforms.uTime.value    = clock.getElapsedTime();
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-aRnd"     count={COUNT} array={rnd} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ── Stars — restrained, only at night ────────────────────────────────────────
const Stars = ({ progress }) => {
  const ref   = useRef();
  const COUNT = 2500;

  const { pos, rnd } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const r = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Distribute on upper hemisphere only
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI * 0.5;
      p[i*3]   = Math.sin(phi) * Math.cos(theta) * 160;
      p[i*3+1] = Math.abs(Math.cos(phi)) * 160 + 10;
      p[i*3+2] = Math.sin(phi) * Math.sin(theta) * 160;
      r[i]     = Math.random();
    }
    return { pos: p, rnd: r };
  }, []);

  const vert = `
    attribute float aRnd;
    uniform float uTime;
    uniform float uOpacity;
    varying float vOp;
    void main(){
      float twinkle = sin(uTime * 1.8 + aRnd * 12.56) * 0.3 + 0.7;
      vOp = uOpacity * twinkle * (0.3 + aRnd * 0.7);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = (0.6 + aRnd * 1.2) * (300. / -mv.z);
      gl_Position  = projectionMatrix * mv;
    }
  `;
  const frag = `
    varying float vOp;
    void main(){
      float d = distance(gl_PointCoord, vec2(0.5));
      float a = (1. - smoothstep(0.15, 0.5, d)) * vOp;
      // slightly blue-white
      gl_FragColor = vec4(0.88, 0.92, 1.0, a);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uOpacity: { value: 0 },
  }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    uniforms.uTime.value    = clock.getElapsedTime();
    // Stars only appear deep into scroll, max opacity 0.7
    uniforms.uOpacity.value = Math.min(0.7, Math.max(0, (progress - 0.65) / 0.22));
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-aRnd"     count={COUNT} array={rnd} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

// ── Milky Way band — subtle arc of denser stars ───────────────────────────────
const MilkyWay = ({ progress }) => {
  const ref   = useRef();
  const COUNT = 1200;

  const { pos, rnd } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const r = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Arc across the sky
      const angle  = (i / COUNT) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.35;
      const R      = 140;
      p[i*3]   = Math.cos(angle + spread) * R;
      p[i*3+1] = Math.abs(Math.sin(angle) * 0.5 + 0.4) * R * 0.6 + 20;
      p[i*3+2] = Math.sin(angle + spread) * R * 0.4 - 40;
      r[i]     = Math.random();
    }
    return { pos: p, rnd: r };
  }, []);

  const vert = `
    attribute float aRnd;
    uniform float uOpacity;
    varying float vOp;
    void main(){
      vOp = uOpacity * aRnd * 0.6;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = (0.4 + aRnd * 0.8) * (300. / -mv.z);
      gl_Position  = projectionMatrix * mv;
    }
  `;
  const frag = `
    varying float vOp;
    void main(){
      float d = distance(gl_PointCoord, vec2(0.5));
      float a = (1. - smoothstep(0.2, 0.5, d)) * vOp;
      gl_FragColor = vec4(0.78, 0.82, 1.0, a);
    }
  `;

  const uniforms = useMemo(() => ({
    uOpacity: { value: 0 },
  }), []);

  useFrame(() => {
    if (!ref.current) return;
    uniforms.uOpacity.value = Math.min(0.5, Math.max(0, (progress - 0.75) / 0.18));
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-aRnd"     count={COUNT} array={rnd} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ── Shooting stars ────────────────────────────────────────────────────────────
const ShootingStars = ({ progress }) => {
  const ref = useRef();
  const COUNT = 6;

  const stars = useMemo(() => Array.from({ length: COUNT }, (_, i) => ({
    ox: (Math.random() - 0.5) * 120,
    oy: 35 + Math.random() * 40,
    oz: -60 - Math.random() * 50,
    delay: i * 1.4 + Math.random() * 2,
    speed: 3 + Math.random() * 4,
  })), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const vis = Math.min(1, Math.max(0, (progress - 0.72) / 0.12));
    ref.current.children.forEach((s, i) => {
      const t  = ((clock.getElapsedTime() + stars[i].delay) % 7) / 7;
      s.position.x = stars[i].ox + t * 30;
      s.position.y = stars[i].oy - t * 18;
      s.material.opacity = vis * Math.sin(t * Math.PI) * 0.85;
    });
  });

  if (progress < 0.7) return null;

  return (
    <group ref={ref}>
      {stars.map((s, i) => (
        <mesh key={i} position={[s.ox, s.oy, s.oz]} rotation={[0, 0, -Math.PI / 5]}>
          <planeGeometry args={[5, 0.06]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

// ── Campfire ──────────────────────────────────────────────────────────────────
const Campfire = ({ progress }) => {
  const flameRef = useRef();
  const glowRef  = useRef();

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime();
    const vis = Math.max(0, (progress - 0.82) / 0.1);
    if (flameRef.current) {
      flameRef.current.scale.y = 0.85 + Math.sin(t * 9) * 0.18;
      flameRef.current.scale.x = 0.9  + Math.sin(t * 7 + 1) * 0.12;
      flameRef.current.material.opacity = vis * (0.7 + Math.sin(t * 6) * 0.3);
    }
    if (glowRef.current) {
      glowRef.current.intensity = vis * (1.8 + Math.sin(t * 4) * 0.5);
    }
  });

  return (
    <group position={[0, -0.3, 3]}>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0.4, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.09, 0.7, 6]} />
        <meshStandardMaterial color="#2A1505" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[0, -0.4, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.09, 0.7, 6]} />
        <meshStandardMaterial color="#2A1505" roughness={0.95} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.42, 0]}>
        <coneGeometry args={[0.14, 0.55, 7]} />
        <meshStandardMaterial
          color="#FF5010"
          emissive="#FF3800"
          emissiveIntensity={3}
          transparent
          opacity={0}
        />
      </mesh>
      <pointLight ref={glowRef} position={[0, 0.6, 0]} intensity={0} color="#FF6820" distance={10} decay={2} />
    </group>
  );
};

// ── Lighting ──────────────────────────────────────────────────────────────────
const Lighting = ({ progress }) => {
  const sunAngle = -Math.PI * 0.05 + progress * Math.PI * 0.92;
  const sunX = Math.cos(sunAngle) * 40;
  const sunY = Math.max(1, Math.sin(sunAngle) * 28);
  const day   = Math.max(0, 1 - progress * 1.55);
  const dusk  = Math.max(0, Math.sin(progress * Math.PI) * 0.8);
  const night = Math.max(0, (progress - 0.58) / 0.38);

  return (
    <>
      <ambientLight intensity={0.12 + day * 0.38} color="#FFE8C0" />
      <directionalLight
        position={[sunX, sunY, -20]}
        intensity={day * 2.2 + dusk * 0.6}
        color={progress < 0.35 ? '#FFD060' : progress < 0.65 ? '#FF8030' : '#CC4010'}
      />
      <hemisphereLight
        skyColor={progress < 0.5 ? '#A8C8E8' : '#2A1008'}
        groundColor="#5A3818"
        intensity={0.25 + day * 0.3 + dusk * 0.2}
      />
      <ambientLight intensity={night * 0.1} color="#101828" />
      <directionalLight position={[-40, 55, -60]} intensity={night * 0.45} color="#C0CCFF" />
    </>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
const SceneContent = () => {
  const { progress } = useScrollProgress();
  return (
    <>
      <fogExp2 attach="fog" args={['#F5C060', 0.018]} />
      <Lighting   progress={progress} />
      <SkyDome    progress={progress} />
      <Sun        progress={progress} />
      <Moon       progress={progress} />
      <Terrain    progress={progress} />
      <Sand       progress={progress} />
      <Stars      progress={progress} />
      <MilkyWay   progress={progress} />
      <ShootingStars progress={progress} />
      <Campfire   progress={progress} />
      <CameraRig  progress={progress} />
    </>
  );
};

export default function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 2.8, 14], fov: 58, near: 0.1, far: 500 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#F5C060');
        scene.fog = new THREE.FogExp2('#F5C060', 0.018);
      }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
    </Canvas>
  );
}