'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ExperienceCard = ({ exp, index, inView }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    custom={index + 2}
    style={{ position: 'relative', paddingLeft: '32px', marginBottom: '40px' }}
  >
    {/* Timeline dot */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ delay: (index + 2) * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
      className="timeline-dot"
    />

    <motion.div
      className="glass-panel"
      whileHover={{ borderColor: 'rgba(201,168,76,0.35)', x: 4 }}
      style={{ padding: '28px 32px', transition: 'border-color 0.3s, transform 0.3s' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '8px',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-main)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: '#EDE8DC',
            marginBottom: '4px',
          }}>
            {exp.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#C9A84C', fontWeight: 600, fontSize: '0.88rem' }}>
              {exp.company}
            </span>
            <span style={{ color: 'rgba(237,232,220,0.25)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'rgba(237,232,220,0.45)', fontSize: '0.8rem' }}>
              {exp.location}
            </span>
          </div>
        </div>

        {/* Period badge */}
        <span style={{
          padding: '4px 12px',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '100px',
          fontSize: '0.72rem',
          color: 'rgba(237,232,220,0.55)',
          fontFamily: 'var(--font-mono)',
          whiteSpace: 'nowrap',
        }}>
          {exp.period}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'rgba(201,168,76,0.1)',
        margin: '16px 0',
      }} />

      {/* Achievements */}
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
        {exp.achievements.map((a, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '10px',
              fontSize: '0.87rem',
              color: 'rgba(237,232,220,0.7)',
              lineHeight: 1.7,
              marginBottom: '8px',
            }}
          >
            <span style={{
              color: '#C9A84C',
              flexShrink: 0,
              marginTop: '2px',
              fontSize: '0.7rem',
            }}>
              ▹
            </span>
            {a}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {exp.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section-waypoint" ref={ref}>
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
          Where I've worked
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '60px' }}
        >
          Experience
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '6px' }}>
          {/* Vertical gold line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="timeline-line"
            style={{ transformOrigin: 'top' }}
          />

          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={EXPERIENCE.length + 3}
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontSize: '0.8rem',
            color: 'rgba(237,232,220,0.3)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          6 years · 3 companies · Singapore
        </motion.p>
      </div>
    </section>
  );
}