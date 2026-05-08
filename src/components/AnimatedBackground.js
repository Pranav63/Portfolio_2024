import React from 'react';

const orbs = [
  { size: 600, x: '10%',  y: '15%',  color: 'rgba(0,212,255,0.07)',    duration: '18s', delay: '0s'  },
  { size: 500, x: '75%',  y: '60%',  color: 'rgba(121,40,202,0.08)',   duration: '24s', delay: '-8s' },
  { size: 350, x: '50%',  y: '80%',  color: 'rgba(0,212,255,0.05)',    duration: '20s', delay: '-4s' },
  { size: 280, x: '85%',  y: '10%',  color: 'rgba(121,40,202,0.06)',   duration: '16s', delay: '-2s' },
];

const AnimatedBackground = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
    aria-hidden
  >
    {/* CSS grid overlay */}
    <div
      className="grid-bg"
      style={{ position: 'absolute', inset: 0 }}
    />

    {/* Floating orbs */}
    {orbs.map((orb, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: orb.x,
          top: orb.y,
          width: orb.size,
          height: orb.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%)',
          animation: `float-orb ${orb.duration} ease-in-out ${orb.delay} infinite`,
        }}
      />
    ))}
  </div>
);

export default AnimatedBackground;
