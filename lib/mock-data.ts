import type { Moment } from "./types";

export const mockMoments: Moment[] = [
  // AI (5)
  {
    id: "ai-001",
    title: "What RAG Actually Does — In Plain English",
    creator: "Andrej Karpathy",
    show: "No Priors",
    timestamp: "42:18",
    timestampSeconds: 2538,
    duration: "8:24",
    durationSeconds: 504,
    explanation:
      "Karpathy breaks RAG down as retrieval-augmented generation: instead of stuffing everything into a model's context window, you fetch relevant documents first, then let the LLM synthesize an answer grounded in those sources.",
    whyThisMatters:
      "This is the clearest mental model for why RAG beats fine-tuning for most knowledge-heavy applications — you get freshness, citations, and lower hallucination risk without retraining.",
    tags: ["RAG", "LLM", "retrieval", "AI architecture"],
    category: "ai",
    relatedMomentIds: ["ai-002", "ai-003"],
  },
  {
    id: "ai-002",
    title: "Embeddings vs. Keyword Search — When Each Wins",
    creator: "Simon Willison",
    show: "Latent Space",
    timestamp: "1:07:52",
    timestampSeconds: 4072,
    duration: "6:11",
    durationSeconds: 371,
    explanation:
      "Willison walks through hybrid search: dense embeddings capture semantic similarity while BM25 catches exact terminology. The best production systems combine both with reranking.",
    whyThisMatters:
      "Most RAG failures come from choosing the wrong retrieval strategy. This moment gives you a decision framework in under seven minutes.",
    tags: ["embeddings", "vector search", "RAG", "hybrid search"],
    category: "ai",
    relatedMomentIds: ["ai-001", "ai-004"],
  },
  {
    id: "ai-003",
    title: "Why Context Windows Aren't Infinite Memory",
    creator: "Swyx",
    show: "Latent Space",
    timestamp: "23:04",
    timestampSeconds: 1384,
    duration: "5:47",
    durationSeconds: 347,
    explanation:
      "Swyx explains that long context windows don't solve the 'needle in a haystack' problem — models still lose focus. Retrieval remains essential even with 1M-token windows.",
    whyThisMatters:
      "Dispels the myth that bigger context eliminates RAG. Essential for anyone architecting production AI systems.",
    tags: ["context window", "LLM limits", "RAG", "attention"],
    category: "ai",
    relatedMomentIds: ["ai-001", "ai-005"],
  },
  {
    id: "ai-004",
    title: "Fine-Tuning vs. RAG — The Decision Tree",
    creator: "Harrison Chase",
    show: "LangChain Podcast",
    timestamp: "18:33",
    timestampSeconds: 1113,
    duration: "7:02",
    durationSeconds: 422,
    explanation:
      "Chase lays out when to fine-tune (behavior/style) vs. when to RAG (knowledge). Fine-tuning teaches how to speak; RAG teaches what to say.",
    whyThisMatters:
      "Saves teams months of wasted effort fine-tuning models on data that should live in a vector database instead.",
    tags: ["fine-tuning", "RAG", "LLM ops", "decision framework"],
    category: "ai",
    relatedMomentIds: ["ai-001", "ai-002"],
  },
  {
    id: "ai-005",
    title: "How Kubernetes Orchestrates Containers",
    creator: "Kelsey Hightower",
    show: "Software Engineering Daily",
    timestamp: "31:45",
    timestampSeconds: 1905,
    duration: "9:18",
    durationSeconds: 558,
    explanation:
      "Hightower uses a restaurant kitchen analogy: pods are dishes, nodes are stations, and the scheduler is the head chef assigning work. Deployments handle rolling updates without downtime.",
    whyThisMatters:
      "The most intuitive Kubernetes explanation ever recorded. If you've read docs and still don't get it, start here.",
    tags: ["Kubernetes", "containers", "DevOps", "orchestration"],
    category: "ai",
    relatedMomentIds: ["startups-003"],
  },

  // Startups (5)
  {
    id: "startups-001",
    title: "Leverage — The One Concept That Changes Everything",
    creator: "Naval Ravikant",
    show: "Naval Podcast",
    timestamp: "12:04",
    timestampSeconds: 724,
    duration: "11:32",
    durationSeconds: 692,
    explanation:
      "Naval defines leverage as force multipliers: labor (people), capital (money), and code/media (permissionless, zero marginal cost). The last two scale without your direct time.",
    whyThisMatters:
      "This single framework explains why software founders can out-earn entire industries. Naval's most referenced clip for a reason.",
    tags: ["leverage", "wealth", "Naval", "scaling"],
    category: "startups",
    relatedMomentIds: ["startups-002", "philosophy-001"],
  },
  {
    id: "startups-002",
    title: "Specific Knowledge Can't Be Trained For",
    creator: "Naval Ravikant",
    show: "Naval Podcast",
    timestamp: "8:17",
    timestampSeconds: 497,
    duration: "6:45",
    durationSeconds: 405,
    explanation:
      "Specific knowledge is found by pursuing genuine curiosity, not by following trends. It's knowledge that feels like play to you but looks like work to others.",
    whyThisMatters:
      "Reframes career strategy from 'what's hot' to 'what's uniquely yours' — the foundation of defensible founder advantage.",
    tags: ["specific knowledge", "Naval", "career", "moats"],
    category: "startups",
    relatedMomentIds: ["startups-001", "productivity-002"],
  },
  {
    id: "startups-003",
    title: "Product-Market Fit — The Marc Andreessen Definition",
    creator: "Marc Andreessen",
    show: "a16z Podcast",
    timestamp: "14:22",
    timestampSeconds: 862,
    duration: "5:33",
    durationSeconds: 333,
    explanation:
      "Andreessen defines PMF as being in a good market with a product that can satisfy it. Before PMF, everything feels like pushing a boulder uphill. After, it's pulling.",
    whyThisMatters:
      "The canonical PMF moment. Every founder should internalize the 'before/after' feeling Andreessen describes.",
    tags: ["product-market fit", "startups", "a16z", "fundraising"],
    category: "startups",
    relatedMomentIds: ["startups-004", "startups-005"],
  },
  {
    id: "startups-004",
    title: "Do Things That Don't Scale — The Paul Graham Playbook",
    creator: "Paul Graham",
    show: "How to Start a Startup (YC)",
    timestamp: "6:08",
    timestampSeconds: 368,
    duration: "8:51",
    durationSeconds: 531,
    explanation:
      "Graham argues early startups should manually recruit users one by one. Stripe's 'Collison installation' — setting up accounts on the spot — is the archetype.",
    whyThisMatters:
      "Counterintuitive advice that separates founders who find PMF from those who build in isolation. The Stripe example makes it concrete.",
    tags: ["YC", "Paul Graham", "growth", "early stage"],
    category: "startups",
    relatedMomentIds: ["startups-003", "startups-005"],
  },
  {
    id: "startups-005",
    title: "Why Startups Die — Running Out of Money or Motivation",
    creator: "Jessica Livingston",
    show: "Founders at Work",
    timestamp: "22:15",
    timestampSeconds: 1335,
    duration: "4:28",
    durationSeconds: 268,
    explanation:
      "Livingston distills startup failure to two causes: you run out of money, or founders lose conviction. Most 'product' failures are actually motivation failures in disguise.",
    whyThisMatters:
      "A blunt diagnostic that helps founders distinguish between pivot-worthy problems and quit-worthy ones.",
    tags: ["failure", "founders", "YC", "motivation"],
    category: "startups",
    relatedMomentIds: ["startups-003", "psychology-003"],
  },

  // Productivity (5)
  {
    id: "productivity-001",
    title: "Deep Work — The Superpower of the 21st Century",
    creator: "Cal Newport",
    show: "Deep Questions",
    timestamp: "4:52",
    timestampSeconds: 292,
    duration: "7:14",
    durationSeconds: 434,
    explanation:
      "Newport defines deep work as professional activities performed in a state of distraction-free concentration that push cognitive capabilities to their limit.",
    whyThisMatters:
      "The foundational definition behind one of the most influential productivity frameworks. Everything else in Newport's system builds on this.",
    tags: ["deep work", "focus", "Cal Newport", "concentration"],
    category: "productivity",
    relatedMomentIds: ["productivity-002", "productivity-003"],
  },
  {
    id: "productivity-002",
    title: "Time Blocking — Treating Your Calendar Like a Budget",
    creator: "Cal Newport",
    show: "Deep Questions",
    timestamp: "11:30",
    timestampSeconds: 690,
    duration: "5:55",
    durationSeconds: 355,
    explanation:
      "Newport assigns every minute of the workday to a specific task block. If it's not on the calendar, it doesn't happen. Reactive work gets squeezed into explicit slots.",
    whyThisMatters:
      "The most actionable Cal Newport technique. Converts vague intentions into executable daily plans.",
    tags: ["time blocking", "calendar", "planning", "Cal Newport"],
    category: "productivity",
    relatedMomentIds: ["productivity-001", "productivity-004"],
  },
  {
    id: "productivity-003",
    title: "The Two-Minute Rule for Beating Procrastination",
    creator: "James Clear",
    show: "Tim Ferriss Show",
    timestamp: "1:14:08",
    timestampSeconds: 4448,
    duration: "3:42",
    durationSeconds: 222,
    explanation:
      "Clear explains the two-minute rule from Atomic Habits: if a task takes less than two minutes, do it now. The goal isn't the task — it's becoming someone who takes action.",
    whyThisMatters:
      "A deceptively simple habit hack that breaks the inertia loop. Works because it targets identity, not just behavior.",
    tags: ["Atomic Habits", "procrastination", "James Clear", "habits"],
    category: "productivity",
    relatedMomentIds: ["psychology-002", "productivity-005"],
  },
  {
    id: "productivity-004",
    title: "Maker vs. Manager Schedules — Why Meetings Destroy Engineers",
    creator: "Paul Graham",
    show: "Essays on Audio",
    timestamp: "3:21",
    timestampSeconds: 201,
    duration: "6:33",
    durationSeconds: 393,
    explanation:
      "Graham distinguishes maker schedules (long uninterrupted blocks) from manager schedules (hourly appointments). A single meeting can destroy an afternoon of creative work.",
    whyThisMatters:
      "The essay behind every 'no meetings Wednesday' policy. Essential for anyone managing or working on creative/engineering teams.",
    tags: ["meetings", "Paul Graham", "maker schedule", "engineering culture"],
    category: "productivity",
    relatedMomentIds: ["productivity-001", "productivity-002"],
  },
  {
    id: "productivity-005",
    title: "Systems Over Goals — Why Winners and Losers Share the Same Goals",
    creator: "James Clear",
    show: "Huberman Lab",
    timestamp: "48:22",
    timestampSeconds: 2902,
    duration: "5:18",
    durationSeconds: 318,
    explanation:
      "Clear argues goals set direction but systems drive progress. You don't rise to the level of your goals — you fall to the level of your systems.",
    whyThisMatters:
      "Reframes New Year's resolutions and OKRs into daily process design. The quote everyone misattributes starts here.",
    tags: ["systems", "goals", "James Clear", "habits"],
    category: "productivity",
    relatedMomentIds: ["productivity-003", "psychology-002"],
  },

  // Psychology (5)
  {
    id: "psychology-001",
    title: "Dopamine — Motivation Molecule, Not Pleasure Molecule",
    creator: "Andrew Huberman",
    show: "Huberman Lab",
    timestamp: "34:10",
    timestampSeconds: 2050,
    duration: "12:45",
    durationSeconds: 765,
    explanation:
      "Huberman clarifies that dopamine drives anticipation and pursuit, not satisfaction. The spike happens before and during the chase — which is why achievement often feels hollow.",
    whyThisMatters:
      "Rewires how you think about motivation, social media, and goal-setting. One of Huberman's most-shared neuroscience clips.",
    tags: ["dopamine", "Huberman", "motivation", "neuroscience"],
    category: "psychology",
    relatedMomentIds: ["psychology-002", "health-001"],
  },
  {
    id: "psychology-002",
    title: "Identity-Based Habits — Who You Wish to Become",
    creator: "James Clear",
    show: "Huberman Lab",
    timestamp: "52:18",
    timestampSeconds: 3138,
    duration: "4:55",
    durationSeconds: 295,
    explanation:
      "Clear explains that lasting behavior change requires shifting identity: don't aim to read a book, aim to become a reader. Every action is a vote for the type of person you want to be.",
    whyThisMatters:
      "The psychological mechanism behind why small habits stick when willpower fails. Bridges neuroscience and practical behavior design.",
    tags: ["identity", "habits", "James Clear", "behavior change"],
    category: "psychology",
    relatedMomentIds: ["psychology-001", "productivity-003"],
  },
  {
    id: "psychology-003",
    title: "Growth Mindset vs. Fixed Mindset — The Original Framework",
    creator: "Carol Dweck",
    show: "The Knowledge Project",
    timestamp: "19:44",
    timestampSeconds: 1184,
    duration: "8:02",
    durationSeconds: 482,
    explanation:
      "Dweck defines fixed mindset as believing abilities are static, and growth mindset as believing abilities develop through effort. Praise for effort, not intelligence, shapes which mindset children adopt.",
    whyThisMatters:
      "The source material behind a concept that's become cultural shorthand. Dweck's nuance is richer than the meme version.",
    tags: ["growth mindset", "Carol Dweck", "learning", "praise"],
    category: "psychology",
    relatedMomentIds: ["psychology-004", "startups-005"],
  },
  {
    id: "psychology-004",
    title: "The Spotlight Effect — Nobody Is Watching You",
    creator: "Daniel Kahneman",
    show: "Conversations with Tyler",
    timestamp: "41:07",
    timestampSeconds: 2467,
    duration: "3:28",
    durationSeconds: 208,
    explanation:
      "Kahneman discusses how people overestimate how much others notice their appearance and behavior. The 'invisible gorilla' experiments reveal how blind we are to our own inattention.",
    whyThisMatters:
      "Liberating for anyone paralyzed by social anxiety or imposter syndrome. Backed by Nobel-prize-winning research.",
    tags: ["Kahneman", "cognitive bias", "social anxiety", "attention"],
    category: "psychology",
    relatedMomentIds: ["psychology-003", "philosophy-002"],
  },
  {
    id: "psychology-005",
    title: "Flow State — The Neurochemistry of Peak Performance",
    creator: "Steven Kotler",
    show: "Tim Ferriss Show",
    timestamp: "38:55",
    timestampSeconds: 2335,
    duration: "9:44",
    durationSeconds: 584,
    explanation:
      "Kotler breaks down flow triggers: clear goals, immediate feedback, challenge-skill balance, and risk. During flow, the prefrontal cortex downregulates — time dilates and self-criticism vanishes.",
    whyThisMatters:
      "A practical map for engineering peak performance states, not just hoping they happen randomly.",
    tags: ["flow state", "peak performance", "neuroscience", "focus"],
    category: "psychology",
    relatedMomentIds: ["productivity-001", "health-002"],
  },

  // Health (5)
  {
    id: "health-001",
    title: "Morning Sunlight — The #1 Free Health Intervention",
    creator: "Andrew Huberman",
    show: "Huberman Lab",
    timestamp: "8:42",
    timestampSeconds: 522,
    duration: "10:33",
    durationSeconds: 633,
    explanation:
      "Huberman explains that viewing bright light within 30-60 minutes of waking sets your circadian clock, boosts cortisol at the right time, and improves sleep quality that night.",
    whyThisMatters:
      "Zero-cost protocol with cascading benefits for sleep, mood, and focus. Huberman's most recommended daily habit.",
    tags: ["Huberman", "circadian rhythm", "sunlight", "sleep"],
    category: "health",
    relatedMomentIds: ["health-002", "psychology-001"],
  },
  {
    id: "health-002",
    title: "Sleep Architecture — Why 8 Hours Isn't Negotiable",
    creator: "Matthew Walker",
    show: "Joe Rogan Experience",
    timestamp: "1:02:18",
    timestampSeconds: 3738,
    duration: "11:07",
    durationSeconds: 667,
    explanation:
      "Walker explains REM and deep sleep cycles, why alcohol fragments sleep architecture, and how even modest sleep debt impairs memory consolidation and immune function.",
    whyThisMatters:
      "The conversation that made 'sleep is non-negotiable' mainstream. Walker's urgency is backed by decades of research.",
    tags: ["sleep", "Matthew Walker", "REM", "health"],
    category: "health",
    relatedMomentIds: ["health-001", "health-003"],
  },
  {
    id: "health-003",
    title: "Zone 2 Cardio — The Foundation of Longevity",
    creator: "Peter Attia",
    show: "The Drive",
    timestamp: "27:33",
    timestampSeconds: 1653,
    duration: "8:49",
    durationSeconds: 529,
    explanation:
      "Attia defines Zone 2 as the highest aerobic output where you can still hold a conversation. 150-200 minutes weekly builds mitochondrial density — the engine of metabolic health.",
    whyThisMatters:
      "Demystifies the 'what kind of exercise' question with a clear, measurable protocol tied directly to lifespan data.",
    tags: ["Zone 2", "longevity", "Peter Attia", "cardio"],
    category: "health",
    relatedMomentIds: ["health-004", "health-005"],
  },
  {
    id: "health-004",
    title: "Protein — The Most Underrated Macro",
    creator: "Layne Norton",
    show: "Huberman Lab",
    timestamp: "1:08:44",
    timestampSeconds: 4124,
    duration: "7:21",
    durationSeconds: 441,
    explanation:
      "Norton argues most adults under-eat protein. 1.6g/kg supports muscle retention during fat loss, and protein has the highest thermic effect of any macronutrient.",
    whyThisMatters:
      "Cuts through diet tribalism with evidence-based numbers. Especially relevant for anyone over 30 concerned about muscle loss.",
    tags: ["protein", "nutrition", "muscle", "metabolism"],
    category: "health",
    relatedMomentIds: ["health-003", "health-005"],
  },
  {
    id: "health-005",
    title: "Cold Exposure — Deliberate Stress for Resilience",
    creator: "Andrew Huberman",
    show: "Huberman Lab",
    timestamp: "56:12",
    timestampSeconds: 3372,
    duration: "9:05",
    durationSeconds: 545,
    explanation:
      "Huberman explains cold exposure triggers norepinephrine and dopamine increases lasting hours post-exposure. The key is deliberate discomfort with controlled breathing — not hypothermia.",
    whyThisMatters:
      "Separates the science from the ice bath bro culture. Gives precise protocols (11 min/week total) instead of vague 'just be cold' advice.",
    tags: ["cold exposure", "Huberman", "resilience", "dopamine"],
    category: "health",
    relatedMomentIds: ["psychology-001", "health-001"],
  },

  // Philosophy (5)
  {
    id: "philosophy-001",
    title: "Memento Mori — Remember You Will Die",
    creator: "Ryan Holiday",
    show: "Daily Stoic",
    timestamp: "2:18",
    timestampSeconds: 138,
    duration: "5:44",
    durationSeconds: 344,
    explanation:
      "Holiday explains memento mori not as morbid obsession but as clarity tool. Awareness of mortality strips away trivial concerns and sharpens focus on what actually matters.",
    whyThisMatters:
      "The most accessible entry point to Stoic philosophy. Transforms abstract philosophy into a daily practice in under six minutes.",
    tags: ["Stoicism", "memento mori", "Ryan Holiday", "mortality"],
    category: "philosophy",
    relatedMomentIds: ["philosophy-002", "philosophy-003"],
  },
  {
    id: "philosophy-002",
    title: "The Dichotomy of Control — What Is and Isn't Up to You",
    creator: "William Irvine",
    show: "Modern Stoicism",
    timestamp: "15:07",
    timestampSeconds: 907,
    duration: "7:33",
    durationSeconds: 453,
    explanation:
      "Irvine teaches Epictetus's core insight: some things are up to us (judgments, impulses, desires) and some aren't (body, reputation, office). Serenity comes from focusing only on the first category.",
    whyThisMatters:
      "The Stoic principle behind the Serenity Prayer. Irvine makes 2,000-year-old wisdom immediately applicable to modern anxiety.",
    tags: ["Epictetus", "Stoicism", "control", "anxiety"],
    category: "philosophy",
    relatedMomentIds: ["philosophy-001", "philosophy-004"],
  },
  {
    id: "philosophy-003",
    title: "Amor Fati — Love Your Fate",
    creator: "Ryan Holiday",
    show: "Daily Stoic",
    timestamp: "7:42",
    timestampSeconds: 462,
    duration: "4:18",
    durationSeconds: 258,
    explanation:
      "Holiday unpacks Nietzsche's amor fati: not just accepting what happens but loving it. Every obstacle becomes raw material for growth rather than a reason for complaint.",
    whyThisMatters:
      "Elevates Stoicism from coping mechanism to active embrace of life. Pairs perfectly with memento mori for a complete daily practice.",
    tags: ["amor fati", "Nietzsche", "Stoicism", "resilience"],
    category: "philosophy",
    relatedMomentIds: ["philosophy-001", "philosophy-002"],
  },
  {
    id: "philosophy-004",
    title: "Negative Visualization — Premeditatio Malorum",
    creator: "William Irvine",
    show: "Modern Stoicism",
    timestamp: "28:19",
    timestampSeconds: 1699,
    duration: "6:02",
    durationSeconds: 362,
    explanation:
      "Irvine describes negative visualization: periodically imagining loss of health, relationships, or possessions. Counterintuitively, this increases gratitude and reduces anxiety about the future.",
    whyThisMatters:
      "A concrete Stoic exercise you can do in five minutes. More effective than gratitude journaling alone because it creates contrast.",
    tags: ["negative visualization", "Stoicism", "gratitude", "premeditatio"],
    category: "philosophy",
    relatedMomentIds: ["philosophy-002", "psychology-004"],
  },
  {
    id: "philosophy-005",
    title: "The Map Is Not the Territory — Models vs. Reality",
    creator: "Sam Harris",
    show: "Making Sense",
    timestamp: "44:51",
    timestampSeconds: 2691,
    duration: "8:27",
    durationSeconds: 507,
    explanation:
      "Harris explores Korzybski's insight that our models of reality are not reality itself. Confusing the two leads to ideology, tribalism, and the inability to update beliefs with new evidence.",
    whyThisMatters:
      "A philosophical razor for cutting through bad arguments in politics, science, and personal relationships. Timeless epistemology made conversational.",
    tags: ["epistemology", "models", "Sam Harris", "rationality"],
    category: "philosophy",
    relatedMomentIds: ["psychology-004", "ai-001"],
  },
];
