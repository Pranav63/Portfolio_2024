'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const EDUCATION = [
  {
    degree: 'MSc — Artificial Intelligence',
    school: 'Singapore Management University',
    year: '2019 – 2020',
  },
  {
    degree: 'BSc — Computer Science',
    school: 'UPES, Dehradun',
    year: '2014 – 2018',
  },
  {
    degree: 'Business Analytics',
    school: 'Harvard Business School Online',
    year: '2020',
  },
];

// Individual animated stat card
const StatCard = ({ value, suffix, prefix, label, duration = 2000, decimals = 0 }) => {
  const { count, ref } = useCountUp(value, duration, decimals);
  return (
    <motion.div
      ref={ref}
      className="glass-panel"
      whileHover={{ scale: 1.04, borderColor: 'rgba(201,168,76,0.45)' }}
      style={{ padding: '20px', textAlign: 'center' }}
    >
      <div style={{
        fontFamily: 'var(--font-main)',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#C9A84C',
        lineHeight: 1,
        marginBottom: '6px',
        letterSpacing: '-0.02em',
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{
        fontSize: '0.71rem',
        color: 'rgba(237,232,220,0.45)',
        letterSpacing: '0.04em',
        lineHeight: 1.45,
      }}>
        {label}
      </div>
    </motion.div>
  );
};

const STATS = [
  { value: 6,    suffix: '+',  prefix: '',  label: 'Years in Production AI',      duration: 1500 },
  { value: 10,   suffix: 'M',  prefix: '$', label: 'Revenue Impact (Micron RL)',   duration: 2000 },
  { value: 5000, suffix: '+',  prefix: '',  label: 'Users Served (HPE DPH)',       duration: 2200 },
  { value: 85,   suffix: '%',  prefix: '',  label: 'Query Accuracy (Text-to-SQL)', duration: 1800 },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-waypoint" ref={ref}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(9,12,24,0.75) 20%, rgba(9,12,24,0.85) 50%, rgba(9,12,24,0.75) 80%, transparent)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.span
          className="label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          Who I am
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '60px' }}
        >
          About Me
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Left — bio */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
          >
            <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A84C, #8B6F47)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: '#090C18',
                  flexShrink: 0,
                  boxShadow: '0 0 24px rgba(201,168,76,0.35)',
                }}>
                  PA
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-main)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#EDE8DC',
                    marginBottom: '2px',
                  }}>
                    Pranav Arora
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>
                    Senior ML Engineer · Singapore
                  </div>
                </div>
              </div>

              <p style={{
                lineHeight: 1.8,
                color: 'rgba(237,232,220,0.72)',
                fontSize: '0.92rem',
                marginBottom: '14px',
              }}>
                ML & AI engineer with 6+ years building production systems across
                semiconductor manufacturing, enterprise AI, and digital marketing.
                I specialise in turning complex research into deployed, measurable
                systems — from RL agents scheduling $10M wafer fab runs to LangGraph
                multi-agent platforms serving 5,000+ users.
              </p>

              <p style={{
                lineHeight: 1.8,
                color: 'rgba(237,232,220,0.72)',
                fontSize: '0.92rem',
              }}>
                Currently building towards applied AI roles in the UAE — where I
                want to work on AI systems that operate at civilisational scale.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Photography', 'Marvel Films', 'Quizzing', 'Chess'].map((h) => (
                <span key={h} className="tag">{h}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — stats + education */}
          <div>
            {/* Animated stats */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              className="glass-panel"
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
              style={{ padding: '28px 32px' }}
            >
              <span className="label" style={{ marginBottom: '20px' }}>Education</span>
              {EDUCATION.map((edu, i) => (
                <div
                  key={edu.degree}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    paddingBottom: '16px',
                    marginBottom: i < EDUCATION.length - 1 ? '16px' : 0,
                    borderBottom: i < EDUCATION.length - 1
                      ? '1px solid rgba(201,168,76,0.1)'
                      : 'none',
                  }}
                >
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#C9A84C',
                    marginTop: '6px',
                    flexShrink: 0,
                    boxShadow: '0 0 8px rgba(201,168,76,0.5)',
                  }} />
                  <div>
                    <div style={{
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      color: '#EDE8DC',
                      marginBottom: '3px',
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{
                      fontSize: '0.78rem',
                      color: 'rgba(237,232,220,0.45)',
                    }}>
                      {edu.school} · {edu.year}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}