"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockLeads, mockStats } from "@/lib/mock-data"
import type { Lead } from "@/lib/mock-data"
import type { StoredLead } from "@/lib/leads-store"
// Note: only type import — no server-side fs code is bundled into the client
import {
  Inbox,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
  ArrowUpRight,
  Bot,
  Mail,
  MessageSquare,
  Globe,
  Star
} from "lucide-react"

const channelIcon: Record<string, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  whatsapp: <MessageSquare className="h-3.5 w-3.5" />,
  website: <Globe className="h-3.5 w-3.5" />,
  google: <Star className="h-3.5 w-3.5" />,
  facebook: <MessageSquare className="h-3.5 w-3.5" />,
}

const statusColor: Record<string, string> = {
  neu: "bg-blue-100 text-blue-700",
  beantwortet: "bg-green-100 text-green-700",
  wartend: "bg-orange-100 text-orange-700",
  eskaliert: "bg-red-100 text-red-700",
  geschlossen: "bg-gray-100 text-gray-600",
}

const statusLabel: Record<string, string> = {
  neu: "Neu",
  beantwortet: "Beantwortet",
  wartend: "Wartend",
  eskaliert: "Eskaliert",
  geschlossen: "Geschlossen",
}

type DashboardLead = Lead | StoredLead

function computeStats(leads: DashboardLead[]) {
  const today = new Date().toDateString()
  const todayLeads = leads.filter(
    (l) => new Date(l.receivedAt).toDateString() === today
  )
  return {
    leadsTotal: todayLeads.length || leads.length,
    autoReplied: leads.filter((l) => l.aiReply).length,
    waiting: leads.filter((l) => l.status === "wartend").length,
    escalated: leads.filter((l) => l.status === "eskaliert").length,
    conversionRate: mockStats.today.conversionRate,
  }
}

export default function Dashboard() {
  const [leads, setLeads] = useState<DashboardLead[]>(mockLeads)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data: { success: boolean; leads?: StoredLead[] }) => {
        if (data.success && data.leads && data.leads.length > 0) {
          setLeads(data.leads)
        }
        // else keep mock data as fallback
      })
      .catch(() => {
        // keep mock data on error
      })
      .finally(() => setLoading(false))
  }, [])

  const stats = computeStats(leads)
  const recentLeads = leads.slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Guten Morgen! 👋</h1>
          <p className="text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · Hier ist Ihre heutige Übersicht
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
          <Bot className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">KI antwortet automatisch</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Inbox className="h-5 w-5 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="h-3 w-3" /> Live
              </span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{loading ? "…" : stats.leadsTotal}</p>
              <p className="text-sm text-muted-foreground mt-0.5">Leads gesamt</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="h-3 w-3" /> KI
              </span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{loading ? "…" : stats.autoReplied}</p>
              <p className="text-sm text-muted-foreground mt-0.5">Auto-beantwortet</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-600">Jetzt</span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{loading ? "…" : stats.waiting}</p>
              <p className="text-sm text-muted-foreground mt-0.5">Wartend</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="h-3 w-3" /> +3%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{stats.conversionRate}%</p>
              <p className="text-sm text-muted-foreground mt-0.5">Conversion</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="col-span-2">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Neueste Leads</CardTitle>
                <a href="/inbox" className="text-xs text-primary font-medium hover:underline">
                  Alle anzeigen →
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-start gap-3 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{lead.name}</span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[lead.status]}`}>
                          {statusLabel[lead.status]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{lead.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-muted-foreground">{channelIcon[lead.channel] ?? <Globe className="h-3.5 w-3.5" />}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(lead.receivedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
                {recentLeads.length === 0 && (
                  <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                    Noch keine Leads. Embed-Formular testen um ersten Lead zu senden!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KI Performance + Quick Stats */}
        <div className="space-y-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                KI-Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Automatisierungsrate</span>
                  <span className="font-semibold">
                    {leads.length > 0
                      ? Math.round((stats.autoReplied / leads.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${leads.length > 0 ? Math.round((stats.autoReplied / leads.length) * 100) : 0}%`
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Ø Reaktionszeit</span>
                  <span className="font-semibold">~1m</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[90%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Kundenzufriedenheit</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[94%] rounded-full bg-purple-500" />
                </div>
              </div>
              <div className="rounded-lg bg-green-50 border border-green-100 p-3 mt-2">
                <p className="text-xs font-medium text-green-700">💡 Tipp</p>
                <p className="text-xs text-green-600 mt-0.5">
                  Neues Lead? Nutze <a href="/embed" className="underline">/embed</a> für das einbettbare Formular.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Kanäle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(["email", "whatsapp", "website", "google", "facebook"] as const).map((ch) => {
                const count = leads.filter((l) => l.channel === ch).length
                const colorMap: Record<string, string> = {
                  email: "bg-blue-500",
                  whatsapp: "bg-green-500",
                  website: "bg-purple-500",
                  google: "bg-yellow-500",
                  facebook: "bg-indigo-500",
                }
                const nameMap: Record<string, string> = {
                  email: "E-Mail", whatsapp: "WhatsApp", website: "Website",
                  google: "Google", facebook: "Facebook"
                }
                return (
                  <div key={ch} className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${colorMap[ch]}`} />
                    <span className="flex-1 text-xs text-muted-foreground">{nameMap[ch]}</span>
                    <span className="text-xs font-semibold">{count}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alert für eskalierte Leads */}
      {stats.escalated > 0 && (
        <Card className="border-red-200 bg-red-50 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">
                  {stats.escalated} Lead{stats.escalated > 1 ? "s" : ""} eskaliert — manuelle Bearbeitung erforderlich
                </p>
                <p className="text-xs text-red-600 mt-0.5">
                  Bitte prüfen Sie den Posteingang für Details.
                </p>
              </div>
              <a href="/inbox" className="ml-auto shrink-0 text-xs font-semibold text-red-700 underline">
                Jetzt öffnen
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
