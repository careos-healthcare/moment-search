import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface Lead {
  email: string;
  source: string;
  sourcePage: string;
  createdAt: string;
}

interface LeadsFile {
  leads: Lead[];
}

const DATA_DIR = join(process.cwd(), "data");
const LEADS_PATH = join(DATA_DIR, "leads.json");

function readLeadsFile(): LeadsFile {
  if (!existsSync(LEADS_PATH)) {
    return { leads: [] };
  }

  try {
    return JSON.parse(readFileSync(LEADS_PATH, "utf-8")) as LeadsFile;
  } catch {
    return { leads: [] };
  }
}

export function getLeads(): Lead[] {
  return readLeadsFile().leads
    .map((lead) => ({
      ...lead,
      sourcePage: lead.sourcePage ?? "unknown",
    }))
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function appendLead(
  email: string,
  source: string,
  sourcePage: string,
): Lead {
  mkdirSync(DATA_DIR, { recursive: true });

  const file = readLeadsFile();
  const lead: Lead = {
    email: email.toLowerCase().trim(),
    source,
    sourcePage,
    createdAt: new Date().toISOString(),
  };

  const exists = file.leads.some((l) => l.email === lead.email);
  if (!exists) {
    file.leads.push(lead);
  }

  writeFileSync(LEADS_PATH, JSON.stringify(file, null, 2), "utf-8");
  return lead;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getLeadSummary(): { total: number; bySource: Record<string, number> } {
  const leads = getLeads();
  const bySource: Record<string, number> = {};

  for (const lead of leads) {
    bySource[lead.source] = (bySource[lead.source] ?? 0) + 1;
  }

  return { total: leads.length, bySource };
}
