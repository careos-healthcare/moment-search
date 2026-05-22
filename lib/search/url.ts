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
  "ADHD productivity",
  "how to focus",
  "how to negotiate salary",
  "how to stop procrastinating",
  "how to get rich",
  "relationship advice",
  "confidence",
  "startup ideas",
] as const;
