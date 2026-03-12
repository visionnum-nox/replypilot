export type LeadStatus = "neu" | "beantwortet" | "wartend" | "eskaliert" | "geschlossen"
export type LeadChannel = "email" | "whatsapp" | "website" | "google" | "facebook"
export type LeadPriority = "hoch" | "mittel" | "niedrig"

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  channel: LeadChannel
  status: LeadStatus
  priority: LeadPriority
  subject: string
  message: string
  aiReply?: string
  receivedAt: string
  repliedAt?: string
  tags: string[]
  source: string
}

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Thomas Müller",
    email: "thomas.mueller@example.de",
    phone: "+49 176 1234567",
    channel: "email",
    status: "beantwortet",
    priority: "hoch",
    subject: "Anfrage Hausrenovierung",
    message: "Guten Tag, wir planen eine komplette Renovierung unseres Einfamilienhauses (ca. 180qm). Könnten Sie uns ein Angebot erstellen? Wir würden gerne so bald wie möglich einen Termin vereinbaren.",
    aiReply: "Sehr geehrter Herr Müller, vielen Dank für Ihre Anfrage! Wir freuen uns über Ihr Interesse an unseren Renovierungsleistungen. Für ein maßgeschneidertes Angebot würden wir gerne einen kostenlosen Vor-Ort-Termin vereinbaren. Ich schlage folgende Termine vor: Donnerstag, 14.03. um 10:00 Uhr oder Freitag, 15.03. um 14:00 Uhr. Passt einer dieser Termine für Sie? Mit freundlichen Grüßen, Ihr Team von Muster Handwerk",
    receivedAt: "2026-03-11T08:23:00",
    repliedAt: "2026-03-11T08:24:12",
    tags: ["renovierung", "großprojekt"],
    source: "Organische Suche"
  },
  {
    id: "2",
    name: "Sarah Koch",
    email: "s.koch@gmail.com",
    phone: "+49 162 9876543",
    channel: "whatsapp",
    status: "wartend",
    priority: "hoch",
    subject: "Notfall Heizungsausfall",
    message: "Hallo! Meine Heizung funktioniert seit heute morgen nicht mehr. Es ist ein Notfall, wir haben kleine Kinder zuhause. Können Sie heute noch kommen?",
    receivedAt: "2026-03-11T09:45:00",
    tags: ["notfall", "heizung"],
    source: "Google My Business"
  },
  {
    id: "3",
    name: "Klaus Bauer",
    email: "klausbauer@web.de",
    channel: "website",
    status: "beantwortet",
    priority: "mittel",
    subject: "Badezimmer Komplettsanierung",
    message: "Ich interessiere mich für eine Badezimmersanierung. Badgröße ca. 8qm. Budget ca. 8.000-12.000€. Wann wären Sie verfügbar?",
    aiReply: "Guten Tag Herr Bauer, herzlichen Dank für Ihre Anfrage zur Badezimmersanierung! Mit einem Budget von 8.000-12.000€ können wir Ihnen ein hochwertiges Ergebnis garantieren. Unsere nächsten verfügbaren Termine für eine Besichtigung wären: Mo 18.03. 09:00 oder Mi 20.03. 11:00 Uhr. Bitte antworten Sie uns kurz, welcher Termin für Sie passt. Wir freuen uns auf Ihre Rückmeldung!",
    receivedAt: "2026-03-11T07:15:00",
    repliedAt: "2026-03-11T07:16:03",
    tags: ["bad", "sanierung"],
    source: "Website Kontaktformular"
  },
  {
    id: "4",
    name: "Anna Schneider",
    email: "anna.schneider@outlook.com",
    phone: "+49 170 5551234",
    channel: "email",
    status: "eskaliert",
    priority: "hoch",
    subject: "Wasserschaden - dringende Reparatur",
    message: "Wir haben einen Wasserschaden im Keller entdeckt. Das Wasser läuft durch die Decke. Ich brauche SOFORT jemanden! Bitte melden Sie sich umgehend.",
    receivedAt: "2026-03-11T10:12:00",
    tags: ["notfall", "wasserschaden", "eskaliert"],
    source: "Google Ads"
  },
  {
    id: "5",
    name: "Michael Wagner",
    email: "m.wagner@firma-wagner.de",
    phone: "+49 89 12345678",
    channel: "google",
    status: "beantwortet",
    priority: "mittel",
    subject: "Büroraum streichen",
    message: "Wir möchten unsere Büroräume (ca. 200qm) neu streichen lassen. Arbeit sollte am Wochenende stattfinden um den Betrieb nicht zu stören. Bitte um Angebot.",
    aiReply: "Sehr geehrter Herr Wagner, vielen Dank für Ihre Anfrage! Wochenend-Arbeiten sind für uns selbstverständlich möglich. Für 200qm Bürofläche kalkulieren wir mit ca. 1,5-2 Wochenenden. Ich würde gerne einen kurzen Besichtigungstermin bei Ihnen vereinbaren — wann passt es Ihnen diese Woche? Mit freundlichen Grüßen",
    receivedAt: "2026-03-10T15:30:00",
    repliedAt: "2026-03-10T15:31:22",
    tags: ["gewerbe", "maler"],
    source: "Google My Business"
  },
  {
    id: "6",
    name: "Lisa Hoffmann",
    email: "lisa.hoffmann@t-online.de",
    channel: "facebook",
    status: "wartend",
    priority: "niedrig",
    subject: "Preisanfrage Dachrinne",
    message: "Hallo, was kostet es eine Dachrinne von ca. 15 Metern zu erneuern? Einfamilienhaus, einstöckig.",
    receivedAt: "2026-03-11T11:30:00",
    tags: ["dach", "preisanfrage"],
    source: "Facebook"
  },
  {
    id: "7",
    name: "Petra Zimmermann",
    email: "p.zimmermann@gmx.de",
    phone: "+49 175 4443322",
    channel: "email",
    status: "beantwortet",
    priority: "mittel",
    subject: "Küche einbauen",
    message: "Ich habe eine neue Einbauküche gekauft und suche jemanden der sie aufbaut und die Elektrik macht. Können Sie das übernehmen?",
    aiReply: "Guten Tag Frau Zimmermann, ja, wir übernehmen sowohl den Küchenaufbau als auch die Elektroinstallation — alles aus einer Hand! Für eine genaue Kalkulation bräuchten wir die Küchenmaße und den geplanten Liefertermin Ihrer Küche. Können Sie uns diese Infos zusenden? Dann erstellen wir Ihnen sofort ein Festpreisangebot.",
    receivedAt: "2026-03-10T09:00:00",
    repliedAt: "2026-03-10T09:01:45",
    tags: ["küche", "elektrik"],
    source: "Empfehlung"
  },
  {
    id: "8",
    name: "Hans Richter",
    email: "hans.richter@yahoo.de",
    channel: "website",
    status: "geschlossen",
    priority: "niedrig",
    subject: "Gartenzaun erneuern",
    message: "Ich brauche einen neuen Gartenzaun, ca. 50 Laufmeter. Was kostet das ungefähr?",
    receivedAt: "2026-03-09T14:00:00",
    repliedAt: "2026-03-09T14:01:10",
    tags: ["garten", "zaun"],
    source: "Website"
  }
]

export const mockStats = {
  today: {
    leadsTotal: 8,
    autoReplied: 5,
    waiting: 2,
    escalated: 1,
    avgResponseTime: "1m 12s",
    conversionRate: 34
  },
  week: {
    leadsTotal: 47,
    autoReplied: 38,
    waiting: 6,
    escalated: 3,
    avgResponseTime: "1m 28s",
    conversionRate: 31
  },
  month: {
    leadsTotal: 183,
    autoReplied: 151,
    waiting: 14,
    escalated: 18,
    avgResponseTime: "1m 35s",
    conversionRate: 29
  }
}

export const mockChartData = [
  { tag: "Mo", leads: 12, beantwortet: 10 },
  { tag: "Di", leads: 8, beantwortet: 7 },
  { tag: "Mi", leads: 15, beantwortet: 13 },
  { tag: "Do", leads: 6, beantwortet: 5 },
  { tag: "Fr", leads: 18, beantwortet: 15 },
  { tag: "Sa", leads: 4, beantwortet: 3 },
  { tag: "So", leads: 2, beantwortet: 2 },
]

export const mockResponseTimeData = [
  { zeit: "00:00", minuten: 1.2 },
  { zeit: "04:00", minuten: 2.1 },
  { zeit: "08:00", minuten: 0.8 },
  { zeit: "10:00", minuten: 1.1 },
  { zeit: "12:00", minuten: 1.5 },
  { zeit: "14:00", minuten: 0.9 },
  { zeit: "16:00", minuten: 1.3 },
  { zeit: "18:00", minuten: 1.8 },
  { zeit: "20:00", minuten: 2.2 },
  { zeit: "22:00", minuten: 1.6 },
]

export const channelLabels: Record<string, string> = {
  email: "E-Mail",
  whatsapp: "WhatsApp",
  website: "Website",
  google: "Google",
  facebook: "Facebook"
}

export const statusLabels: Record<string, string> = {
  neu: "Neu",
  beantwortet: "Beantwortet",
  wartend: "Wartend",
  eskaliert: "Eskaliert",
  geschlossen: "Geschlossen"
}
