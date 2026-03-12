import { NextRequest, NextResponse } from 'next/server'
import { loadProfile, saveProfile, BusinessProfile } from '@/lib/business-profile'

export async function GET() {
  const profile = loadProfile()
  return NextResponse.json(profile)
}

export async function POST(req: NextRequest) {
  const body = await req.json() as BusinessProfile
  saveProfile(body)
  return NextResponse.json({ success: true })
}
