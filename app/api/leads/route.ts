import { NextResponse } from 'next/server'
import { readLeads } from '@/lib/leads-store'

export async function GET() {
  try {
    const leads = await readLeads()
    // Already stored newest first, but ensure sort order
    const sorted = [...leads].sort(
      (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
    )
    return NextResponse.json({ success: true, leads: sorted })
  } catch (error) {
    console.error('GET /api/leads error:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Laden der Leads' },
      { status: 500 }
    )
  }
}
