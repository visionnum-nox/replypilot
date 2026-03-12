import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStats, mockChartData, mockLeads } from "@/lib/mock-data"
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  Inbox,
  AlertTriangle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from "lucide-react"

const channelStats = [
  { name: "E-Mail", leads: 72, converted: 24, rate: 33, trend: "+5%" },
  { name: "WhatsApp", leads: 45, converted: 18, rate: 40, trend: "+12%" },
  { name: "Website", leads: 38, converted: 11, rate: 29, trend: "-2%" },
  { name: "Google", leads: 20, converted: 7, rate: 35, trend: "+8%" },
  { name: "Facebook", leads: 8, converted: 2, rate: 25, trend: "-5%" },
]

const weeklyData = [
  { day: "Mo", leads: 12, auto: 10, manual: 2 },
  { day: "Di", leads: 8, auto: 7, manual: 1 },
  { day: "Mi", leads: 15, auto: 13, manual: 2 },
  { day: "Do", leads: 6, auto: 5, manual: 1 },
  { day: "Fr", leads: 18, auto: 15, manual: 3 },
  { day: "Sa", leads: 4, auto: 3, manual: 1 },
  { day: "So", leads: 2, auto: 2, manual: 0 },
]

const maxLeads = Math.max(...weeklyData.map(d => d.leads))

export default function StatsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiken</h1>
        <p className="text-muted-foreground mt-0.5">Übersicht über Performance und Conversion der letzten 30 Tage</p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {["Heute", "Diese Woche", "Dieser Monat", "Letztes Quartal"].map((p, i) => (
          <button
            key={p}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              i === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Leads gesamt",
            value: mockStats.month.leadsTotal,
            icon: Inbox,
            color: "bg-blue-50 text-blue-600",
            trend: "+18%",
            positive: true,
          },
          {
            label: "Auto-beantwortet",
            value: mockStats.month.autoReplied,
            icon: Zap,
            color: "bg-green-50 text-green-600",
            trend: "+22%",
            positive: true,
          },
          {
            label: "Ø Reaktionszeit",
            value: mockStats.month.avgResponseTime,
            icon: Clock,
            color: "bg-purple-50 text-purple-600",
            trend: "-15%",
            positive: true,
          },
          {
            label: "Conversion Rate",
            value: `${mockStats.month.conversionRate}%`,
            icon: TrendingUp,
            color: "bg-orange-50 text-orange-600",
            trend: "+4%",
            positive: true,
          },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-border shadow-none">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${kpi.positive ? "text-green-600" : "text-red-600"}`}>
                  {kpi.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.trend}
                </span>
              </div>
              <p className="text-3xl font-bold">{kpi.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Weekly Bar Chart */}
        <div className="col-span-2">
          <Card className="border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Leads pro Wochentag</CardTitle>
              <CardDescription>Aktuelle Woche · Automatisch vs. Manuell</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-44">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground">{d.leads}</span>
                    <div className="w-full flex flex-col gap-0.5">
                      <div
                        className="w-full rounded-sm bg-orange-300"
                        style={{ height: `${(d.manual / maxLeads) * 140}px` }}
                      />
                      <div
                        className="w-full rounded-sm bg-primary"
                        style={{ height: `${(d.auto / maxLeads) * 140}px` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-primary" />
                  <span className="text-xs text-muted-foreground">Automatisch beantwortet</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-orange-300" />
                  <span className="text-xs text-muted-foreground">Manuell bearbeitet</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automatisierung Rate */}
        <div className="space-y-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Automatisierungsrate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="10"
                      strokeDasharray={`${(151 / 183) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">82%</span>
                    <span className="text-[10px] text-muted-foreground">auto</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Automatisch</span>
                  <span className="font-semibold">151 Leads</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Manuell</span>
                  <span className="font-semibold">32 Leads</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Eskaliert</span>
                  <span className="font-semibold text-red-600">18 Leads</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">KI-Einsparung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-2">
                <p className="text-3xl font-bold text-green-600">€1.240</p>
                <p className="text-xs text-muted-foreground mt-1">Eingesparte Arbeitszeit diesen Monat</p>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">~ 62 Stunden gespart</span>
                  <span className="font-medium">@ €20/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ø Zeit pro Lead</span>
                  <span className="font-medium">24 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Channel Performance */}
      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Kanal-Performance</CardTitle>
          <CardDescription>Leads und Conversion pro Eingangskanal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kanal</th>
                  <th className="text-right py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Leads</th>
                  <th className="text-right py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Konvertiert</th>
                  <th className="text-right py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rate</th>
                  <th className="text-right py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trend</th>
                  <th className="py-2 pl-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {channelStats.map((ch) => (
                  <tr key={ch.name} className="hover:bg-muted/30">
                    <td className="py-3 font-medium">{ch.name}</td>
                    <td className="py-3 text-right">{ch.leads}</td>
                    <td className="py-3 text-right">{ch.converted}</td>
                    <td className="py-3 text-right font-semibold">{ch.rate}%</td>
                    <td className={`py-3 text-right font-semibold text-xs ${ch.trend.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                      {ch.trend}
                    </td>
                    <td className="py-3 pl-6">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${ch.rate}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{ch.rate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Response Time Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Reaktionszeit-Verteilung</CardTitle>
            <CardDescription>Wie schnell werden Leads beantwortet?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Unter 1 Minute", count: 89, percent: 49, color: "bg-green-500" },
              { label: "1–5 Minuten", count: 54, percent: 29, color: "bg-blue-500" },
              { label: "5–30 Minuten", count: 27, percent: 15, color: "bg-yellow-500" },
              { label: "Über 30 Minuten", count: 13, percent: 7, color: "bg-red-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-28 shrink-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                </div>
                <div className="w-12 text-right">
                  <span className="text-xs font-semibold">{item.count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Top Lead-Quellen</CardTitle>
            <CardDescription>Woher kommen die meisten Leads?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { source: "Google My Business", leads: 68, icon: "🔍" },
              { source: "Website Kontaktformular", leads: 45, icon: "🌐" },
              { source: "Google Ads", leads: 32, icon: "📢" },
              { source: "Empfehlung", leads: 24, icon: "👥" },
              { source: "Facebook", leads: 14, icon: "📘" },
            ].map((src, i) => (
              <div key={src.source} className="flex items-center gap-3">
                <span className="text-sm w-6 text-center">{src.icon}</span>
                <span className="flex-1 text-sm">{src.source}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(src.leads / 68) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold w-6 text-right">{src.leads}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
