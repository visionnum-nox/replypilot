import { NextRequest, NextResponse } from 'next/server'
import { appendLead, type StoredLead } from '@/lib/leads-store'
import { generateAiReply } from '@/lib/ai'
import { randomUUID } from 'crypto'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      name?: string
      email?: string
      message?: string
      channel?: string
      phone?: string
    }

    const { name, email, message, channel = 'website', phone } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'name, email und message sind Pflichtfelder' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    // Generate AI reply
    const aiReply = await generateAiReply({ name, message, channel })

    const now = new Date().toISOString()
    const leadId = randomUUID()

    const lead: StoredLead = {
      id: leadId,
      name,
      email,
      phone,
      channel: channel as StoredLead['channel'],
      message,
      subject: message.slice(0, 60) + (message.length > 60 ? '…' : ''),
      status: 'beantwortet',
      priority: 'mittel',
      aiReply,
      receivedAt: now,
      repliedAt: now,
      tags: [],
      source: 'Website Formular',
    }

    await appendLead(lead)

    return NextResponse.json(
      { success: true, leadId, aiResponse: aiReply },
      { status: 201, headers: CORS_HEADERS }
    )
  } catch (error) {
    console.error('POST /api/lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Interner Serverfehler' },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
