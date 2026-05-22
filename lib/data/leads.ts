import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface Lead {
  email: string;
  source: string;
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

export function appendLead(email: string, source: string): Lead {
  mkdirSync(DATA_DIR, { recursive: true });

  const file = readLeadsFile();
  const lead: Lead = {
    email: email.toLowerCase().trim(),
    source,
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
