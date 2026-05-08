import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const PROJECTS = [
  {
    title: 'Production Cycle Time Prediction',
    description:
      'XGBoost-powered model predicting & optimising semiconductor manufacturing cycle times. Achieves 85% accuracy, deployed via FastAPI + Docker with real-time inference.',
    image: '/images/production_time.gif',
    github: 'https://github.com/Pranav63/production_cycle_time_prediction',
    tags: ['Python', 'XGBoost', 'FastAPI', 'Docker'],
    highlights: ['85% accuracy', '30% cycle variance cut', 'Real-time API'],
    accent: '#00D4FF',
  },
  {
    title: "GAN's Face Generation",
    description:
      'Face profile completion using custom Generative Adversarial Network architecture with advanced image synthesis and real-time processing capabilities.',
    image: '/images/gan.gif',
    github: 'https://github.com/Pranav63/Generative-adverserial-Networks-Face-profile-completion-',
    tags: ['PyTorch', 'GANs', 'Computer Vision'],
    highlights: ['Custom GAN architecture', 'High-quality synthesis', 'Real-time processing'],
    accent: '#7928CA',
  },
  {
    title: 'RL Self-Driving Car',
    description:
      'Autonomous car simulation using Reinforcement Learning with dynamic environment adaptation, custom reward function and obstacle avoidance.',
    image: '/images/carrace.gif',
    github: 'https://github.com/Pranav63/SelfDrivingCar',
    tags: ['Python', 'RL', 'PyTorch'],
    highlights: ['Custom reward fn', 'Dynamic obstacle avoidance', 'Performance optimizer'],
    accent: '#00D4FF',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FlipCard = ({ project, index, inView }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    custom={index + 2}
    className="flip-wrapper"
  >
    <div className="flip-inner">
      {/* ── Front face ── */}
      <div
        className="flip-face"
        style={{
          background: 'rgba(8,14,26,0.9)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(8,14,26,0.95) 0%, transparent 50%)`,
            }}
          />
          {/* Accent dot */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: project.accent,
              boxShadow: `0 0 12px ${project.accent}`,
            }}
          />
        </div>

        <div style={{ padding: '20px 24px' }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#fff',
              marginBottom: '10px',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  padding: '2px 10px',
                  background: `${project.accent}14`,
                  border: `1px solid ${project.accent}30`,
                  borderRadius: '100px',
                  fontSize: '0.72rem',
                  color: project.accent,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <p
            style={{
              marginTop: '10px',
              fontSize: '0.7rem',
              color: 'rgba(226,232,240,0.35)',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            Hover to see details
          </p>
        </div>
      </div>

      {/* ── Back face ── */}
      <div
        className="flip-face flip-back"
        style={{
          background: `linear-gradient(135deg, rgba(8,14,26,0.98) 0%, ${project.accent}18 100%)`,
          border: `1px solid ${project.accent}30`,
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: project.accent,
              marginBottom: '10px',
            }}
          >
            Overview
          </div>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#fff',
              marginBottom: '12px',
              lineHeight: 1.4,
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(226,232,240,0.7)', lineHeight: 1.7, marginBottom: '16px' }}>
            {project.description}
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {project.highlights.map((h) => (
              <li
                key={h}
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(226,232,240,0.65)',
                  marginBottom: '6px',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <span style={{ color: project.accent }}>▹</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
            }}
          >
            <FaGithub /> GitHub
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section" ref={ref} style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <motion.p
          className="section-label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          What I've built
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '60px' }}
        >
          Projects
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {PROJECTS.map((p, i) => (
            <FlipCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={PROJECTS.length + 2}
          style={{
            textAlign: 'center',
            marginTop: '48px',
            fontSize: '0.85rem',
            color: 'rgba(226,232,240,0.35)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          More on{' '}
          <a
            href="https://github.com/Pranav63"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00D4FF', textDecoration: 'none' }}
          >
            github.com/Pranav63
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Projects;
