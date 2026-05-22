import { NextRequest, NextResponse } from "next/server";
import { loadDataset } from "@/lib/data/dataset";
import { semanticToDisplay } from "@/lib/moments";
import { semanticSearch } from "@/lib/search/semantic-search";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ query: "", results: [], count: 0 });
  }

  const dataset = loadDataset();
  const results = semanticSearch(query, dataset).map(semanticToDisplay);

  return NextResponse.json({
    query,
    count: results.length,
    results,
  });
}
