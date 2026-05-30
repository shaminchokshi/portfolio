export const PROFILE = {
  name: "Shamin Chokshi",
  role: "AI Engineer & Data Scientist",
  location: "Boston, MA",
  email: "chokshi.sh@northeastern.edu",
  phone: "+1 857 328 7776",
  lede:
    "I build agentic AI systems, RAG pipelines, and ML at production scale — turning messy data and language into products that save money and ship fast.",
  intro:
    "Hi, I'm Shamin Chokshi — a generative A.I. data scientist and A.I. engineer based in Boston. I build agentic systems, retrieval augmented pipelines, and machine learning at scale. Welcome to my portfolio. Take a look around.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shamin-chokshi-northeastern/" },
    { label: "GitHub", href: "https://github.com/shaminchokshi" },
    { label: "X / Twitter", href: "https://x.com/ShaminChokshi" },
  ],
};

export const METRICS = [
  { num: 10, prefix: "$", suffix: "M", label: "Fraudulent reimbursements prevented" },
  { num: 96, suffix: "%", label: "Forecast accuracy (SARIMA)" },
  { num: 90, suffix: "%", label: "Manual lookup time reduced" },
  { num: 1, suffix: "M+", label: "Financial data points modeled" },
];

export const EXPERIENCE = [
  {
    company: "Bright Horizons",
    role: "Generative AI Data Scientist",
    when: "Oct 2024 — Present",
    where: "Boston, MA",
    points: [
      "Built a RAG agentic chatbot for personalized student-loan & tuition-reimbursement counseling, cutting support requests and operational cost 9%.",
      "Shipped a multi-agent system that retrieves and visualizes client data from complex reports via natural language — manual lookup time down 90%.",
      "Built a LangGraph + Azure OpenAI agent detecting tampered grade sheets, preventing $10M in fraudulent tuition reimbursements.",
      "Forecasted unique EdAssist users at 96% accuracy with a SARIMA time-series model for revenue & budget planning.",
      "Deployed a course recommendation engine on Azure ML, lifting certification registrations 13%.",
      "Built an end-to-end MLOps pipeline (Jenkins / GitHub Actions) with a precision/recall/F1 evaluation framework.",
    ],
  },
  {
    company: "Bright Horizons",
    role: "Business Data Analyst Intern",
    when: "Jun 2023 — Dec 2023",
    where: "Boston, MA",
    points: [
      "Built a multimodal hybrid-search chatbot (LangChain · AWS · Pinecone, voice + text), cutting operational cost 30%.",
      "Orchestrated KPIs from an EDW via SQL/ETL & BI tooling, improving feature-refinement accuracy 40%.",
      "Built Power BI & Tableau dashboards driving real-time decisions, +35% monitoring efficiency.",
    ],
  },
  {
    company: "Soho Dragon Solutions",
    role: "Software Data Engineer · Finance",
    when: "Jan 2022 — Aug 2022",
    where: "New York, NY",
    points: [
      "Modeled 650K financial transactions for portfolio optimization & risk management.",
      "Engineered a network-analysis framework (DAGs, community detection) mapping transaction pathways across 10K client profiles.",
      "Designed pipelines processing 1M+ financial data points, raising data quality and analysis efficiency.",
    ],
  },
  {
    company: "Soho Dragon Solutions",
    role: "Software Data Engineer · Healthcare",
    when: "Jun 2021 — Jul 2021",
    where: "New York, NY",
    points: [
      "Feature engineering & dimensionality reduction on 10K+ EHR datasets, +25% model performance.",
      "Deployed a patient-readmission ML pipeline (scikit-learn · TensorFlow) with A/B testing, −11% readmissions.",
      "Ran clustering & ensemble models identifying high-risk segments, +15% recovery-prediction accuracy.",
    ],
  },
];

export const EDUCATION = [
  {
    school: "Northeastern University",
    degree: "M.S. in Data Architecture & Management",
    when: "Aug 2024",
    where: "Boston, MA",
    note: "Graduate study across data systems, machine learning, and applied AI.",
  },
  {
    school: "Vellore Institute of Technology",
    degree: "B.Tech in Computer Science & Engineering",
    when: "May 2022",
    where: "Vellore, India",
    note: "Foundations in algorithms, systems, and software engineering.",
  },
];

export const SKILLS = [
  { title: "Languages", items: ["Python · PyTorch", "TensorFlow · Keras", "SQL · Pandas", "C / C++ · JavaScript"] },
  { title: "GenAI / Agents", items: ["LangChain · LangGraph", "Multi-Agent · MCP", "RAG · Retrieval", "Anthropic Claude · OpenAI", "Google ADK · RLHF"] },
  { title: "Cloud / Platforms", items: ["Azure AI · Azure ML", "AWS Bedrock", "Databricks · Snowflake", "Azure Data Factory", "Vector DBs"] },
  { title: "ML / MLOps", items: ["Model Building · NLP", "Forecasting · A/B Testing", "LLMOps · Deployment", "CI/CD · GPU", "Multimodality"] },
  { title: "Databases", items: ["PostgreSQL · MySQL", "MS SQL · Oracle", "MongoDB · Cassandra", "DynamoDB · SQLite"] },
  { title: "Analytics / BI", items: ["Power BI · Tableau", "Data Analytics", "ETL · EDW", "Network Analysis"] },
];

export const PROJECTS = [
  {
    tag: "Open Source · PyPI",
    title: "less-tokens",
    when: "2025",
    link: "https://pypi.org/project/less-tokens/",
    linkLabel: "pip install less-tokens",
    desc:
      "An MIT-licensed Python library that compresses LLM prompts before they hit the API — cutting 30–40% of tokens with no GPU, no extra model, running in milliseconds. compress_structured shrinks instructions while leaving JSON schemas and rules untouched, and compare scores quality across six metrics so you prove the output holds. Backed by a study on ~18,000 LLM completions. Compare before you compress.",
    stack: ["Python", "NLP", "PyPI", "MIT License", "LLM Cost Optimization"],
  },
  {
    tag: "★ Hackathon Winner",
    title: "Handmade AI",
    when: "Mar 2025 — Apr 2025",
    desc:
      "An AI image pipeline that turns any photo into a numbered paint-by-numbers stencil in under 30 seconds — KMeans color segmentation, Canny edges, bilateral filtering. A free, open-source replacement for $15–30/image services.",
    stack: ["FastAPI", "Streamlit", "OpenCV", "KMeans", "Computer Vision"],
  },
  {
    tag: "Multi-Agent · SaaS",
    title: "Tweak AI",
    when: "May 2025 — Oct 2025",
    desc:
      "A 4-agent autonomous pipeline (LangGraph + GPT-4) for keyword extraction, experience refinement, project optimization & skills tailoring — cutting resume tailoring from 45 min to under 60 seconds. Shipped as a Chrome extension with LinkedIn auto-detection at 80% less cost than competitors.",
    stack: ["LangGraph", "GPT-4", "Chrome Extension", "Multi-Agent"],
  },
];
