export function queryToSlug(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugToQuery(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

export const exampleQueries = [
  "best explanation of RAG",
  "Naval on leverage",
  "Huberman dopamine",
  "How Kubernetes works",
  "startup product-market fit",
  "Stoic philosophy daily practice",
] as const;
