export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

export function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) ?? 0) + 1);
  }
  return tf;
}

export function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const value of a.values()) normA += value * value;
  for (const value of b.values()) normB += value * value;

  for (const [term, freqA] of a) {
    const freqB = b.get(term);
    if (freqB) dot += freqA * freqB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function keywordScore(queryTokens: string[], text: string, boosts: Record<string, number> = {}): number {
  if (queryTokens.length === 0) return 0;

  const haystack = text.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (haystack.includes(token)) score += boosts[token] ?? 1;
  }

  const phrase = queryTokens.join(" ");
  if (phrase.length > 4 && haystack.includes(phrase)) {
    score += queryTokens.length * 2;
  }

  return score;
}
