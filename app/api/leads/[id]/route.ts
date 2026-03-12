import { NextRequest, NextResponse } from 'next/server'
import { findLeadById, updateLead, type LeadStatus } from '@/lib/leads-store'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await findLeadById(id)
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead nicht gefunden' }, { status: 404 })
    }
    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('GET /api/leads/[id] error:', error)
    return NextResponse.json({ success: false, error: 'Interner Serverfehler' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json() as {
      status?: LeadStatus
      notes?: string
    }

    const { status, notes } = body
    const updated = await updateLead(id, { status, notes })

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead nicht gefunden' }, { status: 404 })
    }
    return NextResponse.json({ success: true, lead: updated })
  } catch (error) {
    console.error('PATCH /api/leads/[id] error:', error)
    return NextResponse.json({ success: false, error: 'Interner Serverfehler' }, { status: 500 })
  }
}
