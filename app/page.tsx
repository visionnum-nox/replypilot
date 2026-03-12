import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockLeads, mockStats } from "@/lib/mock-data"
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

export default function Dashboard() {
  const recentLeads = mockLeads.slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Guten Morgen! 👋</h1>
          <p className="text-muted-foreground mt-0.5">Mittwoch, 11. März 2026 · Hier ist Ihre heutige Übersicht</p>
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
                <ArrowUpRight className="h-3 w-3" /> +12%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{mockStats.today.leadsTotal}</p>
              <p className="text-sm text-muted-foreground mt-0.5">Leads heute</p>
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
                <ArrowUpRight className="h-3 w-3" /> +8%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{mockStats.today.autoReplied}</p>
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
              <p className="text-3xl font-bold">{mockStats.today.waiting}</p>
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
              <p className="text-3xl font-bold">{mockStats.today.conversionRate}%</p>
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
                      <span className="text-muted-foreground">{channelIcon[lead.channel]}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(lead.receivedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
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
                  <span className="font-semibold">62.5%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[62.5%] rounded-full bg-green-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Ø Reaktionszeit</span>
                  <span className="font-semibold">1m 12s</span>
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
                <p className="text-xs text-green-600 mt-0.5">Notfall-Leads könnten schneller eskaliert werden. Regel anpassen?</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Kanäle heute</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "E-Mail", count: 4, color: "bg-blue-500" },
                { name: "WhatsApp", count: 2, color: "bg-green-500" },
                { name: "Website", count: 1, color: "bg-purple-500" },
                { name: "Google", count: 1, color: "bg-yellow-500" },
              ].map((ch) => (
                <div key={ch.name} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${ch.color}`} />
                  <span className="flex-1 text-xs text-muted-foreground">{ch.name}</span>
                  <span className="text-xs font-semibold">{ch.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alert für eskalierte Leads */}
      {mockStats.today.escalated > 0 && (
        <Card className="border-red-200 bg-red-50 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">
                  {mockStats.today.escalated} Lead eskaliert — manuelle Bearbeitung erforderlich
                </p>
                <p className="text-xs text-red-600 mt-0.5">
                  Anna Schneider hat einen dringenden Wasserschaden gemeldet. Bitte sofort reagieren.
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
