'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILLS = [
  {
    category: 'Agentic AI & LLMs',
    items: [
      'LangGraph', 'LangChain', 'GPT-4o', 'RAG Systems',
      'Multi-Agent Orchestration', 'Prompt Engineering',
      'Function Calling', 'LangSmith', 'AutoGen', 'MCP',
    ],
  },
  {
    category: 'Model Development',
    items: [
      'QLoRA / PEFT', 'Fine-tuning', 'vLLM', 'HuggingFace Transformers',
      'PPO / Ray RLlib', 'PyTorch', 'TensorFlow', 'Scikit-learn',
      'XGBoost', 'SHAP / LIME',
    ],
  },
  {
    category: 'Evaluation & Observability',
    items: [
      'RAGAS', 'LLM-as-Judge', 'MLflow', 'MTEB',
      'Prometheus', 'Grafana', 'LangSmith Tracing',
      'A/B Testing', 'Model Versioning', 'Drift Detection',
    ],
  },
  {
    category: 'Cloud & Infra',
    items: [
      'Azure AI Foundry', 'Azure OpenAI', 'AKS', 'Azure DevOps',
      'AWS (SageMaker, Bedrock, EKS)', 'GCP (Vertex AI, BigQuery)',
      'Kubernetes', 'Docker', 'Istio', 'Keycloak',
    ],
  },
  {
    category: 'MLOps & Deployment',
    items: [
      'KServe', 'BentoML', 'TorchServe', 'FastAPI',
      'GitHub Actions', 'CI/CD Pipelines', 'Kubeflow',
      'HashiCorp Vault', 'Azure Container Apps', 'Fly.io',
    ],
  },
  {
    category: 'Data & Vector Stores',
    items: [
      'PostgreSQL (pgvector)', 'Qdrant', 'Pinecone', 'ChromaDB',
      'Redis', 'Supabase', 'Snowflake', 'Apache Airflow',
      'Azure Synapse', 'Prefect',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-waypoint" ref={ref}>
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
          What I work with
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '16px' }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
          style={{
            color: 'var(--text-dim)',
            fontSize: '0.95rem',
            marginBottom: '56px',
            maxWidth: '540px',
          }}
        >
          Full-stack production AI — from fine-tuning models to deploying
          agentic systems at enterprise scale.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              className="glass-panel"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={gi + 3}
              whileHover={{ borderColor: 'rgba(201,168,76,0.35)' }}
              style={{ padding: '24px 28px' }}
            >
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}>
                <div style={{
                  width: '20px',
                  height: '2px',
                  background: '#C9A84C',
                  boxShadow: '0 0 8px rgba(201,168,76,0.6)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                }}>
                  {group.category}
                </span>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="tag"
                    variants={badgeVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    custom={gi * 0.5 + si * 0.06}
                    whileHover={{
                      background: 'rgba(201,168,76,0.18)',
                      borderColor: 'rgba(201,168,76,0.5)',
                      y: -2,
                    }}
                    style={{ cursor: 'default' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}