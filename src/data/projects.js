// Source-of-truth project catalog, used only to seed the database
// (server/db/setup.js). The running app reads projects via the API —
// see src/context/ProjectsContext.jsx — not from this file directly.

const NODE_RAG_STACK = ['Node.js', 'Express', 'LangChain.js', 'OpenAI API', 'Pinecone', 'React']
const PY_RAG_STACK = ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'ChromaDB', 'Claude API']
const PY_AGENT_STACK = ['Python', 'FastAPI', 'CrewAI', 'LangGraph', 'Claude API', 'Redis', 'Celery']
const NODE_AGENT_STACK = ['Node.js', 'Express', 'LangChain.js', 'OpenAI API', 'BullMQ', 'PostgreSQL']
const PY_FORECAST_STACK = ['Python', 'FastAPI', 'Pandas', 'scikit-learn', 'OpenAI API', 'Streamlit']
const NODE_CHAT_STACK = ['Node.js', 'Express', 'OpenAI API', 'Socket.IO', 'React', 'PostgreSQL']
const PY_DETECTION_STACK = ['Python', 'FastAPI', 'scikit-learn', 'Pandas', 'Claude API', 'PostgreSQL']

function ragWorkflow(corpus) {
  return [
    `Ingest and chunk ${corpus}, then generate embeddings and store them in a vector database.`,
    'Build a retrieval pipeline that fetches the most relevant passages for a user’s question.',
    'Design prompt templates that ground the model’s answer strictly in retrieved context, with citations back to source documents.',
    'Build a lightweight chat UI so users can ask natural-language questions and see the source snippets behind each answer.',
    'Evaluate answer accuracy against a held-out set of test questions, and tune chunk size, retrieval depth, and prompt wording.',
    'Deploy behind an API with request logging so retrieval quality can be monitored over time.',
  ]
}

function agentWorkflow(process) {
  return [
    `Decompose the end-to-end ${process} into discrete sub-tasks, each owned by a specialized agent.`,
    'Implement each agent with its own tools (API calls, lookups, calculators) and a narrow system prompt.',
    'Build an orchestrator agent that plans the task sequence, delegates to sub-agents, and reconciles their outputs.',
    'Add a human-in-the-loop checkpoint for high-stakes decisions before the agent finalizes an action.',
    'Log every agent decision and tool call for auditability, with retry/fallback logic when a sub-agent fails.',
    'Benchmark end-to-end completion time and accuracy against a manual baseline.',
  ]
}

function forecastWorkflow(metric) {
  return [
    `Collect and clean historical data relevant to ${metric}.`,
    'Train or apply a forecasting model to produce a baseline numeric prediction.',
    'Use an LLM to translate the numeric forecast and its underlying drivers into a plain-language narrative and recommended actions.',
    'Build a dashboard that lets users ask natural-language follow-up questions about the forecast.',
    'Backtest the forecast against real historical outcomes and report accuracy metrics.',
    'Package the copilot as a scheduled job that refreshes forecasts and narratives automatically.',
  ]
}

function chatWorkflow(scope) {
  return [
    `Map the top questions and tasks the assistant should handle around ${scope}, and collect example conversations.`,
    'Build a conversational agent with tool-calling access to the relevant backend data.',
    'Add guardrails so the assistant declines or escalates requests outside its scope.',
    'Build a chat widget with conversation history and a clear hand-off path to a human when needed.',
    'Run a set of realistic test conversations and refine prompts based on the failure cases found.',
    'Add basic analytics (common questions, resolution rate) to show measurable impact.',
  ]
}

function detectionWorkflow(activity) {
  return [
    `Assemble a labeled or rule-based dataset of normal vs. anomalous ${activity}.`,
    'Train or configure an anomaly-detection model (statistical thresholds, isolation forest, or embedding similarity).',
    'Wrap the model in an agent that investigates flagged cases by pulling supporting evidence from related data sources.',
    'Use an LLM to generate a plain-language explanation and risk score for each flagged case.',
    'Build a review queue UI where a human can confirm or dismiss flagged cases, feeding corrections back into the model.',
    'Measure the false-positive rate and iterate on thresholds and features to bring it down.',
  ]
}

function admissionsFor(kind, title) {
  const guides = {
    rag: `Building ${title} gives you a concrete, demoable Retrieval-Augmented Generation system — one of the most in-demand GenAI patterns in industry today. Admissions readers see that you didn’t just call an API: you understood grounding, retrieval quality, and evaluation, which signals real technical depth beyond a classroom assignment and gives you a strong, specific story for essays and interviews.`,
    agent: `${title} shows you can design a system where multiple AI agents plan, delegate, and coordinate to complete a real task autonomously — the same architecture pattern used by leading AI companies in production. It’s a standout portfolio piece because so few applicants have built genuinely agentic systems rather than single-prompt demos.`,
    forecast: `${title} demonstrates you can pair a quantitative forecasting model with an LLM’s ability to explain and communicate results in plain language — a combination of data science and generative AI that is increasingly valued in both industry and research. It’s an excellent talking point for programs with a strong analytics or applied-AI focus.`,
    chat: `${title} proves you can ship a production-shaped conversational product: scoped guardrails, tool-calling, escalation paths, and measurable impact metrics, not just a chatbot demo. It shows admissions committees you think about real users and responsible deployment, not just clever prompts.`,
    detection: `${title} shows rigor that many student projects lack: building an evaluation loop, tracking false positives, and using a human-in-the-loop review process before trusting an AI system’s judgment. That kind of responsible-AI thinking is exactly what strong CS and data-science programs look for.`,
  }
  return guides[kind]
}

const RAW = [
  // ---------------- Finance ----------------
  {
    domain: 'Finance', kind: 'rag', title: 'SmartLedger — AI Expense Auditor', difficulty: 'Beginner', timelineWeeks: '4-6 weeks', stack: NODE_RAG_STACK,
    objective: 'Automatically review employee expense reports against company policy and flag violations before reimbursement.',
    synopsis: 'SmartLedger ingests a company’s expense policy documents and historical receipts, then answers questions like "is this receipt compliant?" by retrieving the exact policy clause that applies. Finance teams get an assistant that explains its reasoning with citations instead of a black-box approval or rejection.',
    corpus: 'expense policy PDFs and historical receipt records',
  },
  {
    domain: 'Finance', kind: 'agent', title: 'CreditSense — Autonomous Loan Underwriting Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate the multi-step loan underwriting process using a team of coordinating agents.',
    synopsis: 'CreditSense splits underwriting into specialist agents — one gathers applicant financial data, one verifies documents, one checks risk rules, and one drafts the underwriting memo — orchestrated by a planner agent. A human loan officer reviews the memo before any decision is finalized.',
    process: 'loan underwriting process',
  },
  {
    domain: 'Finance', kind: 'forecast', title: 'MarketPulse — Earnings Call Insights Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Turn quarterly earnings call transcripts into a forecast-backed narrative on company performance.',
    synopsis: 'MarketPulse combines a lightweight time-series model on historical financial metrics with an LLM that reads earnings call transcripts, producing a plain-English summary of where the numbers are heading and why, with citations to what executives actually said.',
    metric: 'quarterly revenue and margin trends',
  },
  {
    domain: 'Finance', kind: 'chat', title: 'WealthChat — Personal Finance Advisor Bot', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Give users a conversational assistant that answers budgeting and investing questions using their own (mocked) account data.',
    synopsis: 'WealthChat is a friendly conversational advisor that can look up a user’s spending history and account balances through tool calls, then explain budgeting trade-offs or basic investment concepts in plain language — while clearly declining to give regulated financial advice.',
    scope: 'personal budgeting and account questions',
  },
  {
    domain: 'Finance', kind: 'detection', title: 'FraudLens — Transaction Anomaly Detection Agent', difficulty: 'Advanced', timelineWeeks: '8-10 weeks', stack: PY_DETECTION_STACK,
    objective: 'Watch a stream of transactions, flag suspicious ones, and explain why in plain language.',
    synopsis: 'FraudLens scores incoming transactions against a learned model of normal spending behavior, then has an agent pull supporting context (location, merchant history, recent activity) and generate a human-readable explanation of why a transaction was flagged, ready for a fraud analyst to confirm or dismiss.',
    activity: 'card transaction activity',
  },

  // ---------------- eCommerce ----------------
  {
    domain: 'eCommerce', kind: 'rag', title: 'CartWhisper — Product Q&A RAG Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_RAG_STACK,
    objective: 'Let shoppers ask natural-language questions about products and get answers grounded in the actual catalog and reviews.',
    synopsis: 'CartWhisper indexes product descriptions, specs, and customer reviews so shoppers can ask things like "will this fit a 55-inch TV stand?" and get an answer pulled from the real listing instead of a generic guess, with a link back to the source.',
    corpus: 'product descriptions, specs sheets, and customer reviews',
  },
  {
    domain: 'eCommerce', kind: 'agent', title: 'RestockRobot — Autonomous Inventory Replenishment Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automatically decide what to reorder, from whom, and when, across a multi-warehouse catalog.',
    synopsis: 'RestockRobot uses a forecasting agent to predict demand, a supplier agent to compare pricing and lead times, and a planning agent to generate purchase orders — with a manager checkpoint before any order over a configurable threshold is placed.',
    process: 'inventory replenishment process',
  },
  {
    domain: 'eCommerce', kind: 'forecast', title: 'TrendCast — Demand Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Predict upcoming demand spikes per product category and explain the likely drivers.',
    synopsis: 'TrendCast forecasts short-term demand from historical sales and seasonality, then uses an LLM to narrate why a spike is expected (e.g. seasonal pattern, recent promotion, social trend) so merchandising teams can act on it instead of just staring at a chart.',
    metric: 'category-level product demand',
  },
  {
    domain: 'eCommerce', kind: 'chat', title: 'ShopMate — 24/7 Customer Support Chatbot', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Resolve common order, shipping, and return questions instantly without a human agent.',
    synopsis: 'ShopMate handles the high-volume, low-complexity questions — "where’s my order," "how do I return this" — by calling real order-status tools, and escalates anything ambiguous or emotionally charged to a human support queue.',
    scope: 'order status, shipping, and returns',
  },
  {
    domain: 'eCommerce', kind: 'detection', title: 'ReturnGuard — Fraudulent Return Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Identify return requests that show patterns of return fraud or abuse.',
    synopsis: 'ReturnGuard flags return requests with unusual patterns — serial returners, mismatched item descriptions, high-value wardrobing — and generates a plain-language case summary for a trust-and-safety reviewer instead of an opaque risk score.',
    activity: 'product return requests',
  },

  // ---------------- Legal ----------------
  {
    domain: 'Legal', kind: 'rag', title: 'ClauseClerk — Contract Review RAG Assistant', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_RAG_STACK,
    objective: 'Help paralegals quickly find and compare specific clauses across a library of contracts.',
    synopsis: 'ClauseClerk indexes a firm’s contract library so a paralegal can ask "which of our vendor contracts have a 30-day termination clause?" and get a grounded answer with the exact clause text and source document highlighted.',
    corpus: 'contract PDFs and clause libraries',
  },
  {
    domain: 'Legal', kind: 'agent', title: 'CaseFlow — Autonomous Litigation Research Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate the multi-step process of researching precedent and drafting a research memo for a legal issue.',
    synopsis: 'CaseFlow assigns a research agent to search case law, a summarization agent to extract holdings, and a drafting agent to assemble a structured memo with citations — always presented to a supervising attorney as a draft, never as filed work product.',
    process: 'litigation research and memo drafting process',
  },
  {
    domain: 'Legal', kind: 'forecast', title: 'PrecedentScope — Case Outcome Forecasting Copilot', difficulty: 'Advanced', timelineWeeks: '8-10 weeks', stack: PY_FORECAST_STACK,
    objective: 'Estimate the likely outcome range of a case type based on historical rulings, with plain-language reasoning.',
    synopsis: 'PrecedentScope analyzes historical case outcomes for a given case type and jurisdiction, produces a probability range, and has an LLM explain which precedents most influenced the estimate — framed clearly as a research aid, not legal advice.',
    metric: 'case outcome likelihood by case type',
  },
  {
    domain: 'Legal', kind: 'chat', title: 'ParaLegal Bot — Client Intake Chat Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Collect structured information from prospective clients before their first attorney consultation.',
    synopsis: 'ParaLegal Bot asks a prospective client a guided set of intake questions, organizes the answers into a case summary for the attorney, and clearly states it does not provide legal advice at any point in the conversation.',
    scope: 'client intake and case-type triage',
  },
  {
    domain: 'Legal', kind: 'detection', title: 'ComplianceWatch — Regulatory Risk Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: NODE_AGENT_STACK,
    objective: 'Scan internal communications and filings for language that may indicate regulatory risk.',
    synopsis: 'ComplianceWatch scans documents and internal communications for patterns associated with regulatory risk, then generates a plain-language risk summary with the specific passages flagged, for a compliance officer to review — not to act on automatically.',
    activity: 'internal communications and regulatory filings',
  },

  // ---------------- Transportation ----------------
  {
    domain: 'Transportation', kind: 'rag', title: 'RouteReader — Shipment Document RAG Assistant', difficulty: 'Beginner', timelineWeeks: '4-6 weeks', stack: NODE_RAG_STACK,
    objective: 'Let logistics staff ask questions about bills of lading, customs forms, and shipping manifests instantly.',
    synopsis: 'RouteReader indexes shipment paperwork so a dispatcher can ask "what’s the declared value on shipment 4521?" and get an instant, cited answer instead of digging through folders of scanned PDFs.',
    corpus: 'bills of lading, customs forms, and shipping manifests',
  },
  {
    domain: 'Transportation', kind: 'agent', title: 'FleetPilot — Autonomous Route Optimization Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automatically replan delivery routes in response to traffic, weather, and new orders.',
    synopsis: 'FleetPilot runs a monitoring agent that watches for disruptions, a routing agent that recalculates optimal paths, and a notification agent that updates drivers and customers — escalating major reroutes to a human dispatcher for approval.',
    process: 'delivery route planning process',
  },
  {
    domain: 'Transportation', kind: 'forecast', title: 'ETAOracle — Delivery Delay Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Predict which shipments are at risk of delay and explain the likely cause.',
    synopsis: 'ETAOracle forecasts delay risk per shipment from historical transit data, weather, and route congestion, then has an LLM explain the top contributing factors so customer service can proactively notify affected customers.',
    metric: 'shipment delay risk',
  },
  {
    domain: 'Transportation', kind: 'chat', title: 'RiderAssist — Commuter Support Chatbot', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Answer rider questions about schedules, delays, and fares in real time.',
    synopsis: 'RiderAssist answers common transit questions — next arrival time, fare rules, service alerts — by calling live schedule and alert tools, and hands off to a human agent for lost-item or accessibility requests.',
    scope: 'schedules, fares, and service alerts',
  },
  {
    domain: 'Transportation', kind: 'detection', title: 'SafetyNet — Vehicle Anomaly & Maintenance Risk Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Flag vehicles showing early signs of mechanical issues before they cause a breakdown.',
    synopsis: 'SafetyNet analyzes telemetry data (engine temperature, braking patterns, error codes) to flag vehicles trending toward failure, and generates a plain-language maintenance recommendation for the fleet manager to act on.',
    activity: 'vehicle telemetry and maintenance logs',
  },

  // ---------------- Public Service ----------------
  {
    domain: 'Public Service', kind: 'rag', title: 'CivicClerk — Government Forms RAG Assistant', difficulty: 'Beginner', timelineWeeks: '4-6 weeks', stack: NODE_RAG_STACK,
    objective: 'Help residents find which government form applies to their situation and how to fill it out.',
    synopsis: 'CivicClerk indexes municipal forms and instructions so a resident can ask "how do I apply for a building permit for a fence?" and get the exact form and steps, grounded in the actual municipal code rather than a generic answer.',
    corpus: 'municipal forms, codes, and instruction sheets',
  },
  {
    domain: 'Public Service', kind: 'agent', title: 'PermitPilot — Autonomous Permit Processing Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate the multi-step review of routine permit applications.',
    synopsis: 'PermitPilot uses a document-checking agent to verify required attachments, a rules agent to check zoning compliance, and a drafting agent to prepare an approval or request-for-information letter — with a human reviewer signing off on every decision.',
    process: 'permit application review process',
  },
  {
    domain: 'Public Service', kind: 'forecast', title: 'BudgetLens — Municipal Spending Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Project department spending against budget and explain likely overruns before they happen.',
    synopsis: 'BudgetLens forecasts year-end departmental spending from historical and current-year data, then has an LLM narrate which cost categories are driving a projected overrun, giving city officials time to act before the fiscal year closes.',
    metric: 'departmental budget spending',
  },
  {
    domain: 'Public Service', kind: 'chat', title: '311 Chatbot — Citizen Service Request Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Let residents report issues like potholes or broken streetlights conversationally instead of filling out a form.',
    synopsis: 'The 311 Chatbot walks a resident through reporting an issue, collects location and details through natural conversation, files the request through a tool call to the city’s service system, and gives the resident a tracking number.',
    scope: 'non-emergency service requests',
  },
  {
    domain: 'Public Service', kind: 'detection', title: 'GrantGuard — Public Funds Misuse Detection Agent', difficulty: 'Advanced', timelineWeeks: '8-10 weeks', stack: PY_DETECTION_STACK,
    objective: 'Flag grant spending that deviates from an approved budget or shows signs of misuse.',
    synopsis: 'GrantGuard compares grant expenditure records against approved budgets, flags anomalous transactions, and generates a plain-language summary for an auditor — built with explicit false-positive tracking so legitimate spending isn’t wrongly flagged.',
    activity: 'grant expenditure records',
  },

  // ---------------- Marketing ----------------
  {
    domain: 'Marketing', kind: 'rag', title: 'BrandBrief — Campaign Asset RAG Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_RAG_STACK,
    objective: 'Let marketers instantly find past campaign assets, brand guidelines, and performance notes.',
    synopsis: 'BrandBrief indexes a company’s brand guidelines, past campaign briefs, and performance recaps so a marketer can ask "what tone did we use for the last holiday campaign?" and get a grounded, cited answer in seconds.',
    corpus: 'brand guidelines and past campaign briefs',
  },
  {
    domain: 'Marketing', kind: 'agent', title: 'CampaignCrew — Autonomous Multi-Channel Campaign Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate drafting and coordinating a multi-channel campaign across email, social, and ads.',
    synopsis: 'CampaignCrew assigns a copywriting agent, a channel-adaptation agent (email vs. social vs. ad copy), and a scheduling agent, all coordinated by a campaign-manager agent — with every piece of copy routed to a human for approval before it goes live.',
    process: 'multi-channel campaign creation process',
  },
  {
    domain: 'Marketing', kind: 'forecast', title: 'TrendSignal — Consumer Sentiment Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Predict shifts in consumer sentiment toward a brand and explain what is driving them.',
    synopsis: 'TrendSignal tracks sentiment trends from social and review data, forecasts where sentiment is heading, and has an LLM summarize the themes behind the shift so brand teams can respond with the right message.',
    metric: 'brand sentiment trend',
  },
  {
    domain: 'Marketing', kind: 'chat', title: 'AdVisor — Customer Persona Chat Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Let marketers chat with a simulated customer persona to pressure-test messaging before launch.',
    synopsis: 'AdVisor role-plays as a defined customer persona (built from real survey and interview data) so marketers can test how a message lands and refine copy before it ever reaches a real audience.',
    scope: 'persona-based message testing',
  },
  {
    domain: 'Marketing', kind: 'detection', title: 'AdWatch — Ad Fraud & Bot Traffic Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Identify ad clicks and impressions that look like bot traffic rather than real users.',
    synopsis: 'AdWatch analyzes click and impression patterns to flag traffic that looks automated, then generates a plain-language report an ad-ops analyst can use to dispute charges with a publisher or ad network.',
    activity: 'ad click and impression logs',
  },

  // ---------------- Healthcare ----------------
  {
    domain: 'Healthcare', kind: 'rag', title: 'ChartScribe — Clinical Notes RAG Assistant', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_RAG_STACK,
    objective: 'Help clinicians quickly find relevant information across a patient’s (de-identified, synthetic) history.',
    synopsis: 'ChartScribe indexes synthetic clinical notes so a clinician can ask "when was this patient’s last A1C reading?" and get a grounded answer pulled from the exact note, dramatically cutting chart-review time — built entirely on synthetic data for portfolio purposes.',
    corpus: 'synthetic clinical notes and lab results',
  },
  {
    domain: 'Healthcare', kind: 'agent', title: 'CareCrew — Autonomous Patient Intake & Triage Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate the multi-step process of intake, symptom triage, and appointment routing.',
    synopsis: 'CareCrew uses an intake agent to collect symptoms, a triage agent to assess urgency against clinical guidelines, and a scheduling agent to route the patient to the right appointment type — always deferring any urgent-care judgment to a licensed clinician.',
    process: 'patient intake and triage process',
  },
  {
    domain: 'Healthcare', kind: 'forecast', title: 'OutbreakLens — Epidemic Trend Forecasting Copilot', difficulty: 'Advanced', timelineWeeks: '8-10 weeks', stack: PY_FORECAST_STACK,
    objective: 'Forecast the likely trajectory of a local illness outbreak from public health data.',
    synopsis: 'OutbreakLens applies epidemiological forecasting models to public case data, then has an LLM translate the projection into a plain-language briefing for public health communicators, with clear uncertainty ranges.',
    metric: 'local case count trajectory',
  },
  {
    domain: 'Healthcare', kind: 'chat', title: 'SymptomChat — Patient Self-Service Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Help patients understand general health information and book the right type of appointment.',
    synopsis: 'SymptomChat answers general wellness questions and helps patients pick the right appointment type, with clear, prominent disclaimers that it is not a diagnostic tool and always directs urgent symptoms to emergency care.',
    scope: 'general health information and appointment routing',
  },
  {
    domain: 'Healthcare', kind: 'detection', title: 'ClaimGuard — Insurance Claim Anomaly Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Flag insurance claims that show billing patterns associated with error or fraud.',
    synopsis: 'ClaimGuard scores incoming claims against learned billing patterns, flags outliers, and generates a plain-language case summary for a claims reviewer — designed around minimizing false positives so legitimate claims aren’t delayed.',
    activity: 'insurance claim submissions',
  },

  // ---------------- Education ----------------
  {
    domain: 'Education', kind: 'rag', title: 'SyllabusSage — Course Material RAG Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_RAG_STACK,
    objective: 'Let students ask questions about course readings and get answers grounded in the actual material.',
    synopsis: 'SyllabusSage indexes lecture slides, readings, and syllabi so a student can ask "what does the textbook say about supply shocks?" and get an answer with the exact page or slide cited, instead of a generic web answer.',
    corpus: 'lecture slides, readings, and syllabi',
  },
  {
    domain: 'Education', kind: 'agent', title: 'TutorCrew — Autonomous Personalized Learning Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate building a personalized study plan based on a student’s quiz performance.',
    synopsis: 'TutorCrew uses an assessment agent to analyze quiz results, a planning agent to design a targeted study sequence, and a tutoring agent to walk the student through practice problems — adapting the plan as new quiz results come in.',
    process: 'personalized study planning process',
  },
  {
    domain: 'Education', kind: 'forecast', title: 'DropoutLens — Student Risk Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Predict which students are at risk of falling behind and explain the contributing factors.',
    synopsis: 'DropoutLens forecasts at-risk students from attendance, grades, and engagement data, then has an LLM summarize the likely contributing factors so advisors can intervene early with a specific, supportive conversation.',
    metric: 'student academic risk',
  },
  {
    domain: 'Education', kind: 'chat', title: 'CampusChat — Admissions FAQ Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Answer prospective students’ questions about admissions requirements, deadlines, and financial aid.',
    synopsis: 'CampusChat answers common admissions questions grounded in the actual university handbook, and clearly routes anything about an individual applicant’s specific status to the admissions office.',
    scope: 'admissions requirements, deadlines, and financial aid',
  },
  {
    domain: 'Education', kind: 'detection', title: 'IntegrityWatch — Academic Plagiarism Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Flag submitted assignments that show signs of unoriginal or AI-generated content for instructor review.',
    synopsis: 'IntegrityWatch compares submissions against reference corpora and stylistic patterns, flags likely matches, and generates a plain-language summary of the evidence for an instructor to review — never issuing an automatic penalty itself.',
    activity: 'submitted assignments',
  },

  // ---------------- Climate & Sustainability ----------------
  {
    domain: 'Climate & Sustainability', kind: 'rag', title: 'EcoDoc — Sustainability Report RAG Assistant', difficulty: 'Beginner', timelineWeeks: '4-6 weeks', stack: NODE_RAG_STACK,
    objective: 'Let analysts quickly find specific disclosures across a company’s sustainability reports.',
    synopsis: 'EcoDoc indexes corporate sustainability and ESG reports so an analyst can ask "what was this company’s Scope 2 emissions last year?" and get a grounded answer with the exact report page cited.',
    corpus: 'corporate sustainability and ESG reports',
  },
  {
    domain: 'Climate & Sustainability', kind: 'agent', title: 'GridCrew — Autonomous Energy Grid Balancing Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate balancing a simulated microgrid’s energy supply and demand in real time.',
    synopsis: 'GridCrew uses a forecasting agent to predict demand, a supply agent to track available renewable generation, and a dispatch agent to recommend load-shifting or storage decisions — simulated end to end, with a human operator approving any real dispatch action.',
    process: 'energy supply-demand balancing process',
  },
  {
    domain: 'Climate & Sustainability', kind: 'forecast', title: 'CarbonCast — Emissions Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Project a facility’s carbon emissions trajectory and identify the biggest reduction opportunities.',
    synopsis: 'CarbonCast forecasts emissions trends from energy-use data, then has an LLM explain which activities contribute most and suggest concrete, prioritized reduction opportunities for a sustainability team.',
    metric: 'facility carbon emissions',
  },
  {
    domain: 'Climate & Sustainability', kind: 'chat', title: 'GreenGuide — Recycling & Sustainability Chat Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Help residents figure out how to properly recycle or dispose of specific items locally.',
    synopsis: 'GreenGuide answers "can I recycle this?" style questions grounded in a specific municipality’s actual disposal rules, since recycling rules vary widely city to city, and points to local drop-off options when relevant.',
    scope: 'local recycling and disposal rules',
  },
  {
    domain: 'Climate & Sustainability', kind: 'detection', title: 'LeakWatch — Emissions Anomaly Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Flag sensor readings that suggest a gas leak or unusual emissions spike at a facility.',
    synopsis: 'LeakWatch monitors simulated sensor streams for readings that deviate from normal facility operation, flags likely leak events, and generates a plain-language alert with supporting sensor data for a facilities engineer to investigate.',
    activity: 'facility emissions sensor readings',
  },

  // ---------------- Media & Entertainment ----------------
  {
    domain: 'Media & Entertainment', kind: 'rag', title: 'ScriptSense — Script Coverage RAG Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_RAG_STACK,
    objective: 'Help development executives quickly search across a library of submitted scripts and coverage notes.',
    synopsis: 'ScriptSense indexes submitted scripts and past coverage notes so an executive can ask "which submissions have a strong female lead in a sci-fi setting?" and get grounded matches with the reasoning behind each one.',
    corpus: 'submitted scripts and coverage notes',
  },
  {
    domain: 'Media & Entertainment', kind: 'agent', title: 'StudioCrew — Autonomous Content Localization Agent', difficulty: 'Advanced', timelineWeeks: '10-12 weeks', stack: PY_AGENT_STACK,
    objective: 'Automate translating and culturally adapting show subtitles for a new market.',
    synopsis: 'StudioCrew assigns a translation agent, a cultural-adaptation agent (idioms, humor, references), and a QA agent that checks timing and consistency — producing a first-pass localized script for a human localization editor to finalize.',
    process: 'subtitle localization process',
  },
  {
    domain: 'Media & Entertainment', kind: 'forecast', title: 'ViewerLens — Audience Retention Forecasting Copilot', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_FORECAST_STACK,
    objective: 'Predict where viewers are likely to drop off in a new episode and explain probable causes.',
    synopsis: 'ViewerLens forecasts retention curves from historical viewing data and episode metadata, then has an LLM suggest likely pacing or content factors behind predicted drop-off points, giving editors concrete places to look.',
    metric: 'episode viewer retention',
  },
  {
    domain: 'Media & Entertainment', kind: 'chat', title: 'FanChat — Streaming Support Assistant', difficulty: 'Beginner', timelineWeeks: '3-5 weeks', stack: NODE_CHAT_STACK,
    objective: 'Resolve common streaming platform questions like billing, playback issues, and account access.',
    synopsis: 'FanChat handles common support requests — billing questions, playback troubleshooting, password resets — through tool calls to account and diagnostics systems, escalating anything account-security-sensitive to a human.',
    scope: 'billing, playback, and account support',
  },
  {
    domain: 'Media & Entertainment', kind: 'detection', title: 'PiracyWatch — Content Leak Detection Agent', difficulty: 'Intermediate', timelineWeeks: '6-8 weeks', stack: PY_DETECTION_STACK,
    objective: 'Scan for unauthorized re-uploads of copyrighted content across simulated platforms.',
    synopsis: 'PiracyWatch compares content fingerprints against a simulated web crawl to flag likely unauthorized re-uploads, then generates a plain-language case report with matched evidence for a rights-management team to review before any takedown action.',
    activity: 'web content matching copyrighted material',
  },
]

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[—–].*$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const mockProjects = RAW.map((p) => {
  const workflow =
    p.kind === 'rag' ? ragWorkflow(p.corpus)
    : p.kind === 'agent' ? agentWorkflow(p.process)
    : p.kind === 'forecast' ? forecastWorkflow(p.metric)
    : p.kind === 'chat' ? chatWorkflow(p.scope)
    : detectionWorkflow(p.activity)

  return {
    id: slugify(p.title),
    title: p.title,
    domain: p.domain,
    kind: p.kind,
    difficulty: p.difficulty,
    timelineWeeks: p.timelineWeeks,
    stack: p.stack.includes('Node.js') ? 'Node.js' : 'Python',
    techStack: p.stack,
    objective: p.objective,
    synopsis: p.synopsis,
    workflow,
    admissionsGuide: admissionsFor(p.kind, p.title),
  }
})
