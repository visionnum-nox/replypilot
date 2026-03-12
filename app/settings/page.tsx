"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Bot,
  MessageSquare,
  AlertTriangle,
  Zap,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  Info
} from "lucide-react"

const toneOptions = [
  { value: "professionell", label: "Professionell", desc: "Förmlich, sachlich, vertrauenswürdig" },
  { value: "freundlich", label: "Freundlich", desc: "Warm, persönlich, einladend" },
  { value: "direkt", label: "Direkt", desc: "Schnell, klar, auf den Punkt" },
  { value: "beratend", label: "Beratend", desc: "Informierend, hilfsbereit, kompetent" },
]

const defaultTemplates = [
  {
    id: "1",
    name: "Standard-Begrüßung",
    trigger: "Neue Anfrage",
    text: "Sehr geehrte/r {name}, vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen. Mit freundlichen Grüßen, Ihr Team",
    active: true,
  },
  {
    id: "2",
    name: "Terminvorschlag",
    trigger: "Besichtigungsanfrage",
    text: "Guten Tag {name}, für eine Besichtigung empfehle ich folgende Termine: {termin_1} oder {termin_2}. Bitte bestätigen Sie Ihre Präferenz.",
    active: true,
  },
  {
    id: "3",
    name: "Notfall-Eskalation",
    trigger: "Wasserschaden / Heizungsausfall",
    text: "Wir haben Ihre dringende Anfrage erhalten und leiten diese sofort an unser Notfallteam weiter. Sie werden in Kürze kontaktiert.",
    active: true,
  },
  {
    id: "4",
    name: "Preisanfrage",
    trigger: "Kostenabfrage",
    text: "Hallo {name}, für eine genaue Kostenschätzung benötigen wir weitere Details. Können Sie uns Maße/Umfang mitteilen? Wir erstellen dann ein kostenloses Angebot.",
    active: false,
  },
]

const escalationRules = [
  { id: "1", keyword: "Notfall, dringend, sofort", action: "SMS an Inhaber", active: true },
  { id: "2", keyword: "Wasserschaden, Rohrbruch", action: "Sofort anrufen", active: true },
  { id: "3", keyword: "Unzufrieden, Beschwerde", action: "An Manager weiterleiten", active: true },
  { id: "4", keyword: "Budget über 10.000€", action: "VIP-Follow-up", active: false },
]

export default function SettingsPage() {
  const [selectedTone, setSelectedTone] = useState("professionell")
  const [autoReply, setAutoReply] = useState(true)
  const [nightMode, setNightMode] = useState(true)
  const [followUp, setFollowUp] = useState(true)
  const [templates, setTemplates] = useState(defaultTemplates)
  const [rules, setRules] = useState(escalationRules)
  const [saved, setSaved] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [profile, setProfile] = useState({
    companyName: '',
    industry: '',
    services: '',
    tone: 'freundlich',
    doNotPromise: '',
    bookingLink: '',
    ownerName: '',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleProfileSave = async () => {
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...profile, tone: selectedTone }),
    })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const toggleTemplate = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t))
  }

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">KI-Einstellungen</h1>
          <p className="text-muted-foreground mt-0.5">Konfigurieren Sie Ihr Business-Profil, Ton und Eskalationsregeln</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          {saved ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Gespeichert!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Einstellungen speichern
            </>
          )}
        </Button>
      </div>

      {/* Business Profil */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-5 w-5 text-green-500" />
            🏢 Business-Profil — KI trainieren
          </CardTitle>
          <CardDescription>Je mehr die KI über Ihr Unternehmen weiß, desto besser werden die Antworten.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Firmenname</label>
              <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="z.B. Elektro Müller GmbH" value={profile.companyName} onChange={e => setProfile(p => ({...p, companyName: e.target.value}))} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Branche</label>
              <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="z.B. Elektriker, Coach, Makler..." value={profile.industry} onChange={e => setProfile(p => ({...p, industry: e.target.value}))} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Ihre Leistungen & Preise</label>
            <textarea className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm min-h-[80px]" placeholder="z.B. Elektroinstallation ab 89€/h, Notdienst 24/7, Badezimmer-Renovierung..." value={profile.services} onChange={e => setProfile(p => ({...p, services: e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Ansprechpartner</label>
              <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="z.B. Thomas Müller" value={profile.ownerName} onChange={e => setProfile(p => ({...p, ownerName: e.target.value}))} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Terminbuchungs-Link</label>
              <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="z.B. calendly.com/ihr-name" value={profile.bookingLink} onChange={e => setProfile(p => ({...p, bookingLink: e.target.value}))} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Was soll die KI NICHT versprechen?</label>
            <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="z.B. keine Festpreisgarantien, keine Sofortzusagen bei Großprojekten" value={profile.doNotPromise} onChange={e => setProfile(p => ({...p, doNotPromise: e.target.value}))} />
          </div>
          <Button onClick={handleProfileSave} className="gap-2 bg-green-600 hover:bg-green-700">
            {profileSaved ? <><CheckCircle2 className="h-4 w-4" /> KI trainiert!</> : <><Save className="h-4 w-4" /> KI-Profil speichern</>}
          </Button>
        </CardContent>
      </Card>

      {/* KI Grundeinstellungen */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-5 w-5" />
            KI-Grundeinstellungen
          </CardTitle>
          <CardDescription>Steuern Sie das grundlegende Verhalten der KI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Automatische Antworten</p>
              <p className="text-xs text-muted-foreground">KI antwortet automatisch auf alle eingehenden Leads</p>
            </div>
            <Switch checked={autoReply} onCheckedChange={setAutoReply} />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Nachtmodus (22:00 – 08:00)</p>
              <p className="text-xs text-muted-foreground">Antworten werden verzögert, bis der nächste Werktag beginnt</p>
            </div>
            <Switch checked={nightMode} onCheckedChange={setNightMode} />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Automatisches Follow-up</p>
              <p className="text-xs text-muted-foreground">Nach 48h ohne Antwort automatisch erinnern</p>
            </div>
            <Switch checked={followUp} onCheckedChange={setFollowUp} />
          </div>
        </CardContent>
      </Card>

      {/* Ton-Einstellungen */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-5 w-5" />
            Kommunikationston
          </CardTitle>
          <CardDescription>Wählen Sie den Ton für KI-generierte Antworten</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedTone === tone.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{tone.label}</span>
                  {selectedTone === tone.value && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{tone.desc}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Vorschau</p>
            <p className="text-sm italic">
              {selectedTone === "professionell" && <span>&#8222;Sehr geehrte Frau Schmidt, vielen Dank für Ihre Anfrage. Wir werden uns zeitnah bei Ihnen melden.&#8220;</span>}
              {selectedTone === "freundlich" && <span>&#8222;Hallo Sabine! Super, dass du dich meldest! Wir freuen uns riesig, dir helfen zu können. 😊&#8220;</span>}
              {selectedTone === "direkt" && <span>&#8222;Hi! Anfrage erhalten. Wir melden uns morgen mit einem Angebot.&#8220;</span>}
              {selectedTone === "beratend" && <span>&#8222;Guten Tag, ich empfehle für Ihr Vorhaben folgendes Vorgehen: Zunächst sollten wir gemeinsam die Anforderungen klären...&#8220;</span>}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Antwortvorlagen */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-5 w-5" />
                Antwortvorlagen
              </CardTitle>
              <CardDescription>Definieren Sie Vorlagen für häufige Anfragen</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Neue Vorlage
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`rounded-xl border p-4 transition-all ${
                template.active ? "border-border" : "border-border opacity-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{template.name}</span>
                    <Badge variant="secondary" className="text-[10px] font-medium bg-muted border-0">
                      Trigger: {template.trigger}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{template.text}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch
                    checked={template.active}
                    onCheckedChange={() => toggleTemplate(template.id)}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Eskalationsregeln */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-5 w-5" />
                Eskalationsregeln
              </CardTitle>
              <CardDescription>Wann soll die KI an einen Menschen übergeben?</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Neue Regel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 p-3 mb-2">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Wenn eines der folgenden Schlüsselwörter in einer Lead-Nachricht erkannt wird, wird die Aktion sofort ausgelöst.
            </p>
          </div>
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                rule.active ? "border-border" : "border-border opacity-50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Schlüsselwörter</p>
                <p className="text-sm font-medium">{rule.keyword}</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Aktion</p>
                <p className="text-sm font-medium">{rule.action}</p>
              </div>
              <Switch
                checked={rule.active}
                onCheckedChange={() => toggleRule(rule.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Antwortzeiten */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-5 w-5" />
            Antwortzeit-Ziele
          </CardTitle>
          <CardDescription>Definieren Sie Service-Level-Ziele pro Priorität</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Hoch (Notfälle)", target: "5 Minuten", color: "text-red-600" },
            { label: "Mittel (Standard)", target: "2 Stunden", color: "text-orange-600" },
            { label: "Niedrig (Preisanfragen)", target: "24 Stunden", color: "text-green-600" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1">
              <span className="text-sm">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${item.color}`}>{item.target}</span>
                <Button variant="outline" size="sm" className="h-7 text-xs">Anpassen</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
