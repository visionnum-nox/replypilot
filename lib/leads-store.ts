import { promises as fs } from 'fs'
import path from 'path'

export type LeadStatus = 'neu' | 'beantwortet' | 'wartend' | 'eskaliert' | 'geschlossen'
export type LeadChannel = 'email' | 'whatsapp' | 'website' | 'google' | 'facebook'
export type LeadPriority = 'hoch' | 'mittel' | 'niedrig'

export interface StoredLead {
  id: string
  name: string
  email: string
  phone?: string
  channel: LeadChannel
  message: string
  subject: string
  status: LeadStatus
  priority: LeadPriority
  aiReply?: string
  receivedAt: string
  repliedAt?: string
  tags: string[]
  source: string
  notes?: string
}

// On Vercel, filesystem is read-only except /tmp
// Locally, we use the data/ directory
function getStoragePath(): string {
  if (process.env.VERCEL) {
    return '/tmp/leads.json'
  }
  return path.join(process.cwd(), 'data', 'leads.json')
}

async function ensureDataDir(): Promise<void> {
  if (!process.env.VERCEL) {
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }
  }
}

export async function readLeads(): Promise<StoredLead[]> {
  const filePath = getStoragePath()
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as StoredLead[]
  } catch {
    // File doesn't exist yet — return empty array
    return []
  }
}

export async function writeLeads(leads: StoredLead[]): Promise<void> {
  await ensureDataDir()
  const filePath = getStoragePath()
  await fs.writeFile(filePath, JSON.stringify(leads, null, 2), 'utf-8')
}

export async function appendLead(lead: StoredLead): Promise<void> {
  const leads = await readLeads()
  leads.unshift(lead) // newest first
  await writeLeads(leads)
}

export async function findLeadById(id: string): Promise<StoredLead | undefined> {
  const leads = await readLeads()
  return leads.find((l) => l.id === id)
}

export async function updateLead(
  id: string,
  updates: Partial<Pick<StoredLead, 'status' | 'notes' | 'aiReply' | 'repliedAt'>>
): Promise<StoredLead | null> {
  const leads = await readLeads()
  const index = leads.findIndex((l) => l.id === id)
  if (index === -1) return null
  leads[index] = { ...leads[index], ...updates }
  await writeLeads(leads)
  return leads[index]
}
