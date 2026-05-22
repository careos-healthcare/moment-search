import { NextRequest, NextResponse } from "next/server";
import { appendLead, isValidEmail } from "@/lib/data/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = body.email?.trim() ?? "";
    const source = body.source?.trim() || "unknown";

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    appendLead(email, source);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to save email. Please try again." },
      { status: 500 },
    );
  }
}
