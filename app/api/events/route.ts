import { NextRequest, NextResponse } from "next/server";
import { appendEvent, isValidEvent } from "@/lib/data/events";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      event?: string;
      properties?: Record<string, string | number | boolean>;
    };

    if (!body.event || !isValidEvent(body.event)) {
      return NextResponse.json({ error: "Invalid event." }, { status: 400 });
    }

    const entry = appendEvent(body.event, body.properties);

    return NextResponse.json({ ok: true, id: entry.id });
  } catch {
    return NextResponse.json(
      { error: "Unable to record event." },
      { status: 500 },
    );
  }
}
