export const PROJECTS = [
  {
    id: 'multi-agent',
    title: 'Autonomous Multi-Agent Research System',
    subtitle: 'LangGraph orchestration with specialized research agents',
    description:
      'Production multi-agent system where a planner agent decomposes research queries, dispatches to specialist agents (search, summarise, critique, synthesise), and produces structured research reports. Built with LangGraph state machines, streaming responses, and full agent observability.',
    tags: ['LangGraph', 'Multi-Agent', 'GPT-4o', 'FastAPI', 'Fly.io', 'Python'],
    metrics: ['Live on Fly.io', 'LangGraph DAG', 'Streaming Output'],
    highlights: [
      'Planner → Researcher → Critic → Synthesiser agent pipeline',
      'LangGraph state machine with conditional edge routing',
      'Real-time streaming responses via FastAPI + SSE',
    ],
    github: 'https://github.com/Pranav63/autonomous-research-agent',
    live: 'https://autonomous-research-agent.fly.dev/',
    accent: '#C9A84C',
  },
  {
    id: 'rag-eval',
    title: 'Production RAG + Eval Framework',
    subtitle: 'Hybrid retrieval with LLM-as-judge evaluation dashboard',
    description:
      'End-to-end RAG pipeline with hybrid BM25 + dense retrieval, HNSW indexing, cross-encoder reranking, and a RAGAS-based evaluation dashboard tracking retrieval quality drift in production.',
    tags: ['LangChain', 'Qdrant', 'RAGAS', 'Supabase', 'Fly.io', 'Python'],
    metrics: ['Hybrid BM25 + Dense', 'LLM-as-Judge', 'Live on Fly.io'],
    highlights: [
      'Cross-encoder reranking over HNSW vector index',
      'RAGAS evaluation dashboard with drift detection',
      'Supabase persistence + Streamlit observability frontend',
    ],
    github: 'https://github.com/Pranav63/production-rag-eval',
    live: 'https://rag-eval-framework.fly.dev',
    accent: '#C9A84C',
  },
  {
    id: 'qlora',
    title: 'QLoRA Multilingual Fine-tuning Pipeline',
    subtitle: 'Arabic/multilingual LLM fine-tuning with MLflow + vLLM serving',
    description:
      'QLoRA fine-tuning of Llama 3.2 3B on Arabic NLP tasks using HuggingFace PEFT. Full MLflow experiment tracking, base vs fine-tuned benchmark comparison, and vLLM serving layer for inference.',
    tags: ['QLoRA', 'PEFT', 'MLflow', 'vLLM', 'Llama 3.2', 'Arabic NLP'],
    metrics: ['BLEU +18% vs base', 'MLflow Tracked', 'vLLM Served'],
    highlights: [
      'QLoRA 4-bit quantisation on Llama 3.2 3B',
      'BLEU + ROUGE benchmarking vs base model',
      'MLflow experiment tracking + vLLM inference server',
    ],
    github: 'https://github.com/Pranav63/qlora-multilingual-finetuning',
    live: 'https://github.com/Pranav63/qlora-multilingual-finetuning',
    accent: '#8B6F47',
  },
];

export const EXPERIENCE = [
  {
    title: 'Senior ML Engineer',
    company: 'Hewlett Packard Enterprise',
    period: 'Aug 2024 – Present',
    location: 'Singapore',
    achievements: [
      'Text-to-SQL platform — 85% accuracy, 2,000+ queries/week across 7 business units',
      'K8s Watcher agentic system — 70% MTTR reduction, 50+ incidents/week',
      'Document Planning Hub — LangGraph multi-agent, 5,000+ users, 80% error reduction',
      'OneAI platform standards across 8 teams — deployment failures down 60%',
    ],
    tags: ['LangGraph', 'GPT-4o', 'Azure OpenAI', 'Kubernetes', 'FastAPI'],
  },
  {
    title: 'Data Scientist',
    company: 'Micron Technology',
    period: 'Jan 2022 – Aug 2024',
    location: 'Singapore',
    achievements: [
      'PPO RL wafer scheduling — $10M annual revenue impact, 0.5% production increase',
      'Predictive maintenance pipeline — 30% downtime reduction across 70-machine cluster',
      'LLM fine-tuned on 10K internal docs — 80% first-contact resolution, BLEU 0.82',
    ],
    tags: ['PPO', 'Ray RLlib', 'PyTorch', 'GCP', 'Docker'],
  },
  {
    title: 'Data Scientist',
    company: 'Dentsu International',
    period: 'Aug 2020 – Jan 2022',
    location: 'Singapore',
    achievements: [
      'ROAS prediction models — 50% faster post-campaign analysis, 20% cost reduction',
      'Customer propensity model — 85% validation accuracy, deployed to live campaigns',
      'Data catalog on Azure AKS — ingesting 10,000+ datasets for enterprise governance',
    ],
    tags: ['Python', 'SQL', 'Tableau', 'Azure', 'Terraform'],
  },
];

export const SKILLS = {
  'Agentic AI & LLMs': ['LangGraph', 'LangChain', 'GPT-4o', 'RAG', 'Multi-Agent', 'Prompt Engineering', 'vLLM', 'HuggingFace'],
  'ML & Modeling': ['PPO / RL', 'QLoRA / PEFT', 'XGBoost', 'PyTorch', 'TensorFlow', 'Fine-tuning', 'SHAP / LIME'],
  'Cloud & Infra': ['Azure (primary)', 'Kubernetes', 'Docker', 'AWS', 'GCP', 'FastAPI', 'Keycloak'],
  'MLOps': ['MLflow', 'KServe', 'Prometheus', 'Grafana', 'Azure DevOps', 'GitHub Actions'],
  'Data & Vector': ['PostgreSQL', 'Qdrant', 'Redis', 'Pinecone', 'Supabase', 'Snowflake'],
};

export const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/Pranav63',                  icon: 'github'   },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranavarora63/',   icon: 'linkedin' },
  { label: 'Email',    href: 'mailto:pranav2vis@gmail.com',                  icon: 'mail'     },
];