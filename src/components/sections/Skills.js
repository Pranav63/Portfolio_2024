import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiOpenai,
  SiDocker, SiKubernetes, SiGooglecloud, SiAmazonaws, SiFastapi,
  SiPostgresql, SiApachespark, SiTableau, SiMlflow,
  SiReact, SiGit, SiAmazonwebservices,
} from 'react-icons/si';
import { FaDatabase, FaRobot, FaBrain } from 'react-icons/fa';

const CATEGORIES = [
  {
    label: 'AI / Machine Learning',
    color: '#00D4FF',
    skills: [
      { icon: SiPython,      name: 'Python' },
      { icon: SiTensorflow,  name: 'TensorFlow' },
      { icon: SiPytorch,     name: 'PyTorch' },
      { icon: SiScikitlearn, name: 'Scikit-learn' },
      { icon: FaBrain,       name: 'Deep Learning' },
      { icon: FaRobot,       name: 'RL Agents' },
      { icon: SiOpenai,      name: 'LLMs / GPT-4' },
      { icon: FaRobot,       name: 'NLP' },
    ],
  },
  {
    label: 'MLOps & Deployment',
    color: '#7928CA',
    skills: [
      { icon: SiFastapi,     name: 'FastAPI' },
      { icon: SiDocker,      name: 'Docker' },
      { icon: SiKubernetes,  name: 'Kubernetes' },
      { icon: SiGooglecloud, name: 'GCP' },
      { icon: SiAmazonwebservices, name: 'AWS' },
      { icon: SiMlflow,      name: 'MLflow' },
    ],
  },
  {
    label: 'Data & Analytics',
    color: '#00D4FF',
    skills: [
      { icon: FaDatabase,    name: 'SQL' },
      { icon: SiPostgresql,  name: 'PostgreSQL' },
      { icon: SiApachespark, name: 'Spark' },
      { icon: SiTableau,     name: 'Tableau' },
      { icon: SiGit,         name: 'Git' },
      { icon: SiReact,       name: 'React' },
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const badge = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section" ref={ref} style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <motion.p
          className="section-label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          What I work with
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '60px' }}
        >
          Skills &amp; Expertise
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={ci + 2}
            >
              {/* Category heading */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '2px',
                    background: cat.color,
                    boxShadow: `0 0 8px ${cat.color}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: cat.color,
                  }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Badge grid */}
              <motion.div
                variants={container}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
              >
                {cat.skills.map(({ icon: Icon, name }) => (
                  <motion.div
                    key={name}
                    variants={badge}
                    className={`skill-badge${cat.color === '#7928CA' ? ' accent' : ''}`}
                    whileHover={{ y: -2 }}
                  >
                    <Icon style={{ fontSize: '1rem', color: cat.color, flexShrink: 0 }} />
                    <span>{name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
