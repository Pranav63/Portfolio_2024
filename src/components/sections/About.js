import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCamera, FaFilm, FaChessKnight, FaGraduationCap } from 'react-icons/fa';

// ── Animated counter ─────────────────────────────────────────────────────────
const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setCount(Math.floor(start));
      if (start >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ── Stat card ────────────────────────────────────────────────────────────────
const Stat = ({ value, suffix, label }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="glass-card"
    style={{ padding: '20px 24px', textAlign: 'center', flex: '1 1 120px' }}
  >
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '2rem',
        fontWeight: 700,
        color: '#00D4FF',
        lineHeight: 1,
        marginBottom: '6px',
      }}
    >
      <Counter end={value} suffix={suffix} />
    </div>
    <div style={{ fontSize: '0.75rem', color: 'rgba(226,232,240,0.5)', letterSpacing: '0.05em' }}>
      {label}
    </div>
  </motion.div>
);

// ── Education item ────────────────────────────────────────────────────────────
const EduItem = ({ degree, institution, year }) => (
  <div
    style={{
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <FaGraduationCap style={{ color: '#00D4FF', marginTop: '3px', flexShrink: 0, fontSize: '1rem' }} />
    <div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '0.9rem',
          color: '#E2E8F0',
          marginBottom: '2px',
        }}
      >
        {degree}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(226,232,240,0.5)' }}>
        {institution} · {year}
      </div>
    </div>
  </div>
);

const HOBBIES = [
  { icon: FaCamera, label: 'Photography' },
  { icon: FaFilm,   label: 'Marvel Films' },
  { icon: FaChessKnight, label: 'Quizzing' },
];

const EDUCATION = [
  {
    degree: 'MSc in Artificial Intelligence',
    institution: 'Singapore Management University',
    year: '2018–2020',
  },
  {
    degree: 'BSc in Computer Science',
    institution: 'UPES, Dehradun',
    year: '2014–2018',
  },
  {
    degree: 'Business Analytics (Online)',
    institution: 'Harvard Business School',
    year: '2020',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section" ref={ref} style={{ padding: '120px 0' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        {/* Section label */}
        <motion.p
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          Who I am
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
          style={{ marginBottom: '60px' }}
        >
          About Me
        </motion.h2>

        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left — bio + photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2}
          >
            <div
              className="glass-card"
              style={{ padding: '32px', marginBottom: '24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img
                  src="/images/pranav_pho.png"
                  alt="Pranav Arora"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #00D4FF',
                    boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#fff',
                    }}
                  >
                    Pranav Arora
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#00D4FF' }}>
                    Senior ML Engineer · Singapore
                  </div>
                </div>
              </div>
              <p style={{ lineHeight: 1.75, color: 'rgba(226,232,240,0.75)', fontSize: '0.95rem' }}>
                Passionate ML &amp; AI engineer with 5+ years building and deploying production ML systems
                across semiconductor manufacturing, digital marketing, and enterprise AI. I specialize in
                turning complex data pipelines into scalable, real-world solutions — from reinforcement
                learning fab agents to in-house LLM chatbots.
              </p>
            </div>

            {/* Hobbies */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {HOBBIES.map(({ icon: Icon, label }) => (
                <div key={label} className="skill-badge">
                  <Icon style={{ color: '#00D4FF', fontSize: '0.85rem' }} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — stats + education */}
          <div>
            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={3}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}
            >
              <Stat value={5}  suffix="+"  label="Years Experience" />
              <Stat value={85} suffix="%"  label="Model Accuracy" />
              <Stat value={30} suffix="%"  label="Downtime Reduced" />
              <Stat value={50} suffix="%"  label="Queue Time Cut" />
            </motion.div>

            {/* Education */}
            <motion.div
              className="glass-card"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={4}
              style={{ padding: '28px 32px' }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#00D4FF',
                  marginBottom: '16px',
                }}
              >
                Education
              </div>
              {EDUCATION.map((edu) => (
                <EduItem key={edu.degree} {...edu} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
