import fs from 'fs'
import path from 'path'

export interface BusinessProfile {
  companyName: string
  industry: string
  services: string
  tone: string
  doNotPromise: string
  bookingLink: string
  ownerName: string
}

const defaultProfile: BusinessProfile = {
  companyName: '',
  industry: '',
  services: '',
  tone: 'freundlich',
  doNotPromise: '',
  bookingLink: '',
  ownerName: '',
}

function getProfilePath() {
  if (process.env.VERCEL) return '/tmp/business-profile.json'
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return path.join(dir, 'business-profile.json')
}

export function loadProfile(): BusinessProfile {
  try {
    const p = getProfilePath()
    if (fs.existsSync(p)) {
      return { ...defaultProfile, ...JSON.parse(fs.readFileSync(p, 'utf8')) }
    }
  } catch {}
  return { ...defaultProfile }
}

export function saveProfile(profile: BusinessProfile): void {
  const p = getProfilePath()
  fs.writeFileSync(p, JSON.stringify(profile, null, 2))
}
