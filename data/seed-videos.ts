import type { SeedVideo } from "@/lib/types";

/**
 * Curated ingestion targets. Only videos with public captions are included.
 * Run `npm run ingest` to fetch transcripts and build data/moments.json.
 */
export const seedVideos: SeedVideo[] = [
  {
    videoId: "L_Guz73e6fw",
    title: "Sam Altman: OpenAI CEO on GPT-4, ChatGPT, and the Future of AI",
    creator: "Lex Fridman",
    show: "Lex Fridman Podcast",
    category: "ai",
    tags: ["OpenAI", "GPT-4", "AGI", "startups", "Lex Fridman"],
  },
  {
    videoId: "XbPHojL_61U",
    title: "Neri Oxman: Biology, Art, and Science of Design & Engineering with Nature",
    creator: "Lex Fridman",
    show: "Lex Fridman Podcast",
    category: "philosophy",
    tags: ["design", "biology", "nature", "Lex Fridman", "engineering"],
  },
  {
    videoId: "eF-E40pxxbI",
    title: "Liv Boeree: Poker, Game Theory, AI, Simulation, Aliens & Existential Risk",
    creator: "Lex Fridman",
    show: "Lex Fridman Podcast",
    category: "psychology",
    tags: ["game theory", "psychology", "decision making", "Lex Fridman"],
  },
  {
    videoId: "zjkBMFhNj_g",
    title: "Let's build GPT: from scratch, in code, spelled out",
    creator: "Andrej Karpathy",
    show: "Andrej Karpathy",
    category: "ai",
    tags: ["GPT", "transformers", "RAG", "deep learning", "Karpathy"],
  },
  {
    videoId: "aircAruvnKk",
    title: "But what is a neural network? | Deep learning, chapter 1",
    creator: "Grant Sanderson",
    show: "3Blue1Brown",
    category: "ai",
    tags: ["neural networks", "machine learning", "explainer", "deep learning"],
  },
  {
    videoId: "wjZofJX0v4M",
    title: "Transformers, the tech behind LLMs | Deep learning, chapter 5",
    creator: "Grant Sanderson",
    show: "3Blue1Brown",
    category: "ai",
    tags: ["transformers", "LLM", "attention", "AI Explained", "RAG"],
  },
  {
    videoId: "3xU050kMbHM",
    title: "How to Launch (Again and Again)",
    creator: "Kat Mañalac",
    show: "Y Combinator",
    category: "startups",
    tags: ["YC", "startups", "launch", "product-market fit"],
  },
  {
    videoId: "Ks-_Mh1QhMc",
    title: "Your Body Language May Shape Who You Are",
    creator: "Amy Cuddy",
    show: "TED",
    category: "psychology",
    tags: ["psychology", "confidence", "body language", "health"],
  },
];
