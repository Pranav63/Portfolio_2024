'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { PROJECTS } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Glowing metric chip for key numbers
const MetricChip = ({ text }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.06, boxShadow: '0 0 16px rgba(201,168,76,0.4)' }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      background: 'rgba(201,168,76,0.12)',
      border: '1px solid rgba(201,168,76,0.35)',
      borderRadius: '100px',
      fontSize: '0.72rem',
      fontWeight: 700,
      color: '#C9A84C',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.04em',
      boxShadow: '0 0 8px rgba(201,168,76,0.15)',
      cursor: 'default',
    }}
  >
    {text}
  </motion.span>
);

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    custom={index + 2}
    whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.4)' }}
    className="glass-panel"
    style={{
      overflow: 'hidden',
      transition: 'transform 0.3s, border-color 0.3s',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Top accent bar — animated shimmer */}
    <div style={{
      height: '3px',
      background: `linear-gradient(90deg, #C9A84C, ${project.accent || '#8B6F47'}, #C9A84C)`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 3s linear infinite',
    }} />

    <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Status + links */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
      }}>
        <span style={{
          padding: '3px 10px',
          background: project.live ? 'rgba(39,201,63,0.1)' : 'rgba(201,168,76,0.1)',
          border: `1px solid ${project.live ? 'rgba(39,201,63,0.3)' : 'rgba(201,168,76,0.25)'}`,
          borderRadius: '100px',
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: project.live ? '#27C93F' : '#C9A84C',
        }}>
          {project.live ? '● Live' : '● In Progress'}
        </span>

        <div style={{ display: 'flex', gap: '12px' }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#C9A84C' }}
              style={{ color: 'rgba(237,232,220,0.4)', fontSize: '1.05rem' }}
            >
              <FaGithub />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#C9A84C' }}
              style={{ color: 'rgba(237,232,220,0.4)', fontSize: '0.95rem' }}
            >
              <FaExternalLinkAlt />
            </motion.a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-main)',
        fontWeight: 700,
        fontSize: '1.05rem',
        color: '#EDE8DC',
        marginBottom: '6px',
        lineHeight: 1.3,
      }}>
        {project.title}
      </h3>

      {/* Subtitle */}
      <p style={{
        fontSize: '0.78rem',
        color: '#C9A84C',
        marginBottom: '14px',
        fontWeight: 500,
      }}>
        {project.subtitle}
      </p>

      {/* Description */}
      <p style={{
        fontSize: '0.86rem',
        color: 'rgba(237,232,220,0.62)',
        lineHeight: 1.75,
        marginBottom: '20px',
        flex: 1,
      }}>
        {project.description}
      </p>

      {/* Metric chips — key numbers pop */}
      {project.metrics && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '18px',
        }}>
          {project.metrics.map((m) => (
            <MetricChip key={m} text={m} />
          ))}
        </div>
      )}

      {/* Regular highlights */}
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
        {project.highlights.map((h) => (
          <li key={h} style={{
            display: 'flex',
            gap: '8px',
            fontSize: '0.82rem',
            color: 'rgba(237,232,220,0.58)',
            marginBottom: '6px',
            lineHeight: 1.5,
          }}>
            <span style={{ color: '#C9A84C', flexShrink: 0 }}>▹</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map((t) => (
          <span key={t} className="tag" style={{ fontSize: '0.68rem' }}>{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ComingSoonCard = ({ index, inView }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    custom={index + 2}
    style={{
      border: '1px dashed rgba(201,168,76,0.2)',
      borderRadius: '16px',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '320px',
      gap: '16px',
      background: 'rgba(201,168,76,0.02)',
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '1px dashed rgba(201,168,76,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.4rem',
        color: 'rgba(201,168,76,0.4)',
      }}
    >
      +
    </motion.div>
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontSize: '0.82rem',
        color: 'rgba(237,232,220,0.3)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
      }}>
        Coming Soon
      </p>
      <p style={{
        fontSize: '0.72rem',
        color: 'rgba(237,232,220,0.2)',
        marginTop: '6px',
      }}>
        Multi-agent system · 2026
      </p>
    </div>
  </motion.div>
);

const MIN_DISPLAY = 3;

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const placeholderCount = Math.max(0, MIN_DISPLAY - PROJECTS.length);

  return (
    <section id="projects" className="section-waypoint" ref={ref}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(9,12,24,0.8) 20%, rgba(9,12,24,0.88) 50%, rgba(9,12,24,0.8) 80%, transparent)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.span
          className="label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          What I've built
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '16px' }}
        >
          Projects
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
          style={{
            color: 'var(--text-dim)',
            fontSize: '0.95rem',
            marginBottom: '56px',
            maxWidth: '520px',
          }}
        >
          Production-grade public projects — built to demonstrate real engineering
          depth, not toy demos.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <ComingSoonCard key={`placeholder-${i}`} index={PROJECTS.length + i} inView={inView} />
          ))}
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={MIN_DISPLAY + 3}
          style={{
            textAlign: 'center',
            marginTop: '48px',
            fontSize: '0.83rem',
            color: 'rgba(237,232,220,0.3)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          More on{' '}
          <motion.a
            href="https://github.com/Pranav63"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: '#C9A84C' }}
            style={{ color: 'rgba(201,168,76,0.6)', textDecoration: 'none' }}
          >
            github.com/Pranav63
          </motion.a>
        </motion.p>
      </div>
    </section>
  );
}