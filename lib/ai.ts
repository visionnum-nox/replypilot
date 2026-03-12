import { loadProfile } from './business-profile'

function buildSystemPrompt(): string {
  const p = loadProfile()

  if (!p.companyName) {
    return `Du bist ein freundlicher Assistent für ein lokales Unternehmen. Beantworte die Anfrage professionell auf Deutsch. Halte die Antwort kurz (2-3 Sätze), freundlich und hilfreich. Bitte den Kunden am Ende um einen passenden Zeitpunkt für ein Gespräch.`
  }

  return `Du bist der KI-Assistent von "${p.companyName}" (Branche: ${p.industry}).

Über das Unternehmen:
${p.services ? `Leistungen: ${p.services}` : ''}
${p.ownerName ? `Ansprechpartner: ${p.ownerName}` : ''}
${p.bookingLink ? `Terminbuchung: ${p.bookingLink}` : ''}

Tonalität: ${p.tone}
${p.doNotPromise ? `Versprich NICHT: ${p.doNotPromise}` : ''}

Regeln:
- Antworte immer auf Deutsch
- Halte die Antwort kurz (2-4 Sätze)
- Beziehe dich auf die konkreten Leistungen des Unternehmens
- Schließe mit einem konkreten nächsten Schritt (Termin, Rückruf, etc.)
- Unterzeichne als "${p.ownerName || p.companyName} Team"`
}

interface GenerateReplyInput {
  name: string
  message: string
  channel: string
}

export async function generateAiReply(input: GenerateReplyInput): Promise<string> {
  const { name, message, channel } = input

  if (!process.env.OPENAI_API_KEY) {
    return `Vielen Dank für Ihre Nachricht, ${name}! Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich bei Ihnen. Wann wäre ein guter Zeitpunkt für ein kurzes Gespräch?`
  }

  try {
    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        {
          role: 'user',
          content: `Kundenname: ${name}\nKanal: ${channel}\nNachricht des Kunden: ${message}`,
        },
      ],
      max_tokens: 250,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content ?? `Vielen Dank für Ihre Nachricht, ${name}! Wir melden uns umgehend.`
  } catch (error) {
    console.error('OpenAI error:', error)
    return `Vielen Dank für Ihre Nachricht, ${name}! Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich.`
  }
}
