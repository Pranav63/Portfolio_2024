'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PHRASES = [
  'Senior ML Engineer @ HPE',
  'Production AI Systems Builder',
  'LLMs · RAG · RL at Scale',
  'GenAI · Fine-tuning · MLOps',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Custom typewriter with glowing gold cursor
function GlowTypewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed]  = useState('');
  const [deleting, setDeleting]    = useState(false);
  const [cursorOn, setCursorOn]    = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing logic
  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (!deleting && displayed === phrase) {
      const id = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(id);
    }

    if (deleting && displayed === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return;
    }

    const speed = deleting ? 38 : 58;
    const id = setTimeout(() => {
      setDisplayed((prev) =>
        deleting ? prev.slice(0, -1) : phrase.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(id);
  }, [displayed, deleting, phraseIdx]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1.1em',
        background: cursorOn ? '#C9A84C' : 'transparent',
        marginLeft: '3px',
        verticalAlign: 'middle',
        borderRadius: '1px',
        boxShadow: cursorOn ? '0 0 8px rgba(201,168,76,0.9), 0 0 20px rgba(201,168,76,0.5)' : 'none',
        transition: 'box-shadow 0.1s',
      }} />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="section-waypoint">
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(9,12,24,0.65) 0%, rgba(9,12,24,0.3) 55%, transparent 78%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          padding: '0 24px',
        }}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: '28px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 20px',
            background: 'rgba(9,12,24,0.7)',
            border: '1px solid rgba(201,168,76,0.55)',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#E8D5A3',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#C9A84C',
              boxShadow: '0 0 10px #C9A84C',
              animation: 'pulse-dot 2s ease-in-out infinite',
              flexShrink: 0,
            }} />
            Based in Singapore · Open to UAE
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(3.8rem, 11vw, 7.5rem)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#EDE8DC',
            marginBottom: '20px',
          }}
        >
          Pranav{' '}
          <span style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #F0D99A 45%, #C9A84C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Arora
          </span>
        </motion.h1>

        {/* Glowing typewriter */}
        <motion.div
          variants={fadeUp}
          custom={2}
          style={{
            fontSize: 'clamp(1rem, 2.8vw, 1.45rem)',
            color: 'rgba(237,232,220,0.75)',
            marginBottom: '52px',
            height: '2.2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 400,
            textShadow: '0 2px 20px rgba(9,12,24,0.8)',
          }}
        >
          <GlowTypewriter />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          custom={3}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(201,168,76,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '15px 40px',
              background: '#C9A84C',
              color: '#090C18',
              borderRadius: '8px',
              fontFamily: 'var(--font-main)',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 24px rgba(201,168,76,0.25)',
            }}
          >
            View My Work
          </motion.a>

          <motion.a
            href="https://drive.google.com/file/d/13eRwg012J-Q5AsMRfyBbHBOHw8MardYu/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, background: 'rgba(201,168,76,0.12)', borderColor: 'rgba(232,213,163,0.9)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '15px 40px',
              background: 'rgba(9,12,24,0.55)',
              color: '#E8D5A3',
              border: '1px solid rgba(232,213,163,0.65)',
              borderRadius: '8px',
              fontFamily: 'var(--font-main)',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          custom={4}
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            animation: 'float 2.5s ease-in-out infinite',
          }}
        >
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(232,213,163,0.95)',
            textShadow: '0 0 20px rgba(201,168,76,0.9)',
            fontWeight: 600,
          }}>
            Scroll to explore
          </span>
          <div style={{
            width: '1px',
            height: '44px',
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.9), transparent)',
          }} />
        </motion.div>
      </motion.div>
    </section>
  );
}