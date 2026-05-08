import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIENCES = [
  {
    title: 'Senior Data Scientist',
    company: 'HPE',
    period: 'Aug 2024 – Present',
    logo: '/images/hpe.jpg',
    tags: ['LLMs', 'GPT-4', 'XGBoost', 'Python', 'FastAPI'],
    achievements: [
      'Designed & deployed ChatHPE — in-house GPT-4 chatbot serving 500+ internal users.',
      'Built factory ship-date prediction models, improving supply chain efficiency by 25%.',
      'Led production cycle-time ML initiative, reducing manufacturing variance.',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'Micron',
    period: 'Jan 2022 – Aug 2024',
    logo: '/images/Micron.jpeg',
    tags: ['RL', 'PyTorch', 'Predictive Maintenance', 'Docker', 'GCP'],
    achievements: [
      'Optimized fab status with RL agents, cutting queue time by 50%.',
      'Implemented predictive maintenance pipeline — 30% downtime reduction.',
      'Created master-data solution saving 80% of manual data-entry time.',
    ],
  },
  {
    title: 'Junior Data Scientist',
    company: 'Dentsu',
    period: '2020 – 2022',
    logo: '/images/denstu.jpg',
    tags: ['Analytics', 'Dashboards', 'Python', 'SQL', 'Tableau'],
    achievements: [
      'Reduced post-campaign analysis time by 50% via automated dashboards.',
      'Built performance predictor, saving 20% on media-planning costs.',
      'Engineered data pipelines saving $4k/month on third-party ingestion.',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ExperienceCard = ({ exp, index, inView }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    custom={index + 2}
    style={{ position: 'relative', paddingLeft: '36px', marginBottom: '48px' }}
  >
    {/* Timeline dot */}
    <motion.div
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : { scale: 0 }}
      transition={{ delay: (index + 2) * 0.12 + 0.2, type: 'spring', stiffness: 300 }}
      style={{
        position: 'absolute',
        left: '-6px',
        top: '24px',
        width: '13px',
        height: '13px',
        borderRadius: '50%',
        background: '#00D4FF',
        boxShadow: '0 0 16px rgba(0,212,255,0.6)',
        border: '2px solid #050A14',
      }}
    />

    {/* Card */}
    <motion.div
      className="glass-card"
      whileHover={{ borderColor: 'rgba(0,212,255,0.25)', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}
      style={{ padding: '28px 32px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <img
          src={exp.logo}
          alt={exp.company}
          style={{
            width: '44px',
            height: '44px',
            objectFit: 'contain',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.06)',
            padding: '4px',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#fff',
              marginBottom: '2px',
            }}
          >
            {exp.title}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: '#00D4FF', fontWeight: 600, fontSize: '0.88rem' }}>
              {exp.company}
            </span>
            <span style={{ color: 'rgba(226,232,240,0.3)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'rgba(226,232,240,0.5)', fontSize: '0.8rem' }}>
              {exp.period}
            </span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '18px' }}>
        {exp.achievements.map((a, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '10px',
              fontSize: '0.88rem',
              color: 'rgba(226,232,240,0.7)',
              lineHeight: 1.65,
              marginBottom: '8px',
            }}
          >
            <span style={{ color: '#00D4FF', flexShrink: 0, marginTop: '2px' }}>▹</span>
            {a}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {exp.tags.map((t) => (
          <span
            key={t}
            style={{
              padding: '3px 10px',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.15)',
              borderRadius: '100px',
              fontSize: '0.73rem',
              color: '#00D4FF',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section" ref={ref} style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <motion.p
          className="section-label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          Where I've worked
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '60px' }}
        >
          Experience
        </motion.h2>

        {/* Timeline container */}
        <div style={{ position: 'relative', paddingLeft: '6px' }}>
          {/* Vertical glow line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="timeline-line"
            style={{ transformOrigin: 'top' }}
          />

          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
