"use client"

import { useState, useEffect, useCallback } from "react"
import { mockLeads, channelLabels, statusLabels } from "@/lib/mock-data"
import type { Lead } from "@/lib/mock-data"
import type { StoredLead } from "@/lib/leads-store"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  MessageSquare,
  Globe,
  Star,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Bot,
  User,
  Phone,
  Search,
  RefreshCw,
  Inbox
} from "lucide-react"

type AnyLead = Lead | StoredLead

const channelIcon: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
  google: <Star className="h-4 w-4" />,
  facebook: <MessageSquare className="h-4 w-4" />,
}

const statusIcon: Record<string, React.ReactNode> = {
  neu: <Clock className="h-3.5 w-3.5" />,
  beantwortet: <CheckCircle2 className="h-3.5 w-3.5" />,
  wartend: <Clock className="h-3.5 w-3.5" />,
  eskaliert: <AlertTriangle className="h-3.5 w-3.5" />,
  geschlossen: <XCircle className="h-3.5 w-3.5" />,
}

const statusVariant: Record<string, string> = {
  neu: "bg-blue-100 text-blue-700 border-0",
  beantwortet: "bg-green-100 text-green-700 border-0",
  wartend: "bg-orange-100 text-orange-700 border-0",
  eskaliert: "bg-red-100 text-red-700 border-0",
  geschlossen: "bg-gray-100 text-gray-600 border-0",
}

const priorityColor: Record<string, string> = {
  hoch: "bg-red-500",
  mittel: "bg-yellow-500",
  niedrig: "bg-gray-300",
}

export default function InboxPage() {
  const [leads, setLeads] = useState<AnyLead[]>(mockLeads)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<AnyLead | null>(null)
  const [filter, setFilter] = useState<string>("alle")
  const [search, setSearch] = useState("")

  const loadLeads = useCallback(() => {
    setLoading(true)
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data: { success: boolean; leads?: StoredLead[] }) => {
        if (data.success && data.leads && data.leads.length > 0) {
          setLeads(data.leads)
          setSelected(data.leads[0] ?? null)
        } else {
          setLeads(mockLeads)
          setSelected(mockLeads[1] ?? null)
        }
      })
      .catch(() => {
        setLeads(mockLeads)
        setSelected(mockLeads[1] ?? null)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadLeads()
  }, [loadLeads])

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = filter === "alle" || l.status === filter
    const matchesSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.subject.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex h-screen">
      {/* Lead List */}
      <div className="w-[340px] shrink-0 border-r border-border flex flex-col bg-card">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold">Posteingang</h1>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={loadLeads}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Leads durchsuchen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {/* Filter Tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {[
              { key: "alle", label: "Alle" },
              { key: "wartend", label: "Wartend" },
              { key: "eskaliert", label: "Eskaliert" },
              { key: "beantwortet", label: "Beantwortet" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {filteredLeads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelected(lead)}
              className={`w-full text-left px-4 py-3.5 hover:bg-muted/50 transition-colors ${
                selected?.id === lead.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${priorityColor[(lead as Lead).priority ?? 'mittel']}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-sm font-semibold truncate">{lead.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(lead.receivedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-foreground/80 truncate">{lead.subject}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{lead.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-muted-foreground">{channelIcon[lead.channel] ?? <Globe className="h-4 w-4" />}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusVariant[lead.status]}`}>
                      {statusLabels[lead.status] ?? lead.status}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
          {filteredLeads.length === 0 && !loading && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Keine Leads gefunden
            </div>
          )}
        </div>
      </div>

      {/* Detail View */}
      {selected ? (
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-2xl mx-auto p-6 space-y-5">
            {/* Lead Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {selected.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{selected.name}</h2>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${statusVariant[selected.status]}`}>
                    {statusIcon[selected.status]}
                    {statusLabels[selected.status] ?? selected.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {selected.email}
                  </span>
                  {selected.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {selected.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  Zuweisen
                </Button>
                <Button size="sm">Antworten</Button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">Kanal</p>
                <p className="text-sm font-semibold mt-0.5 flex items-center gap-1.5">
                  {channelIcon[selected.channel] ?? <Globe className="h-4 w-4" />}
                  {channelLabels[selected.channel] ?? selected.channel}
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">Quelle</p>
                <p className="text-sm font-semibold mt-0.5">{(selected as Lead).source ?? "Website Formular"}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">Eingegangen</p>
                <p className="text-sm font-semibold mt-0.5">
                  {new Date(selected.receivedAt).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Tags */}
            {(selected as Lead).tags && (selected as Lead).tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {(selected as Lead).tags.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Original Message */}
            <Card className="border-border shadow-none">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Nachricht des Leads</span>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm leading-relaxed">{selected.message}</p>
              </CardContent>
            </Card>

            {/* AI Reply */}
            {selected.aiReply ? (
              <Card className="border-green-200 bg-green-50 shadow-none">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">KI-Antwort</span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                        Auto-gesendet
                      </span>
                    </div>
                    {selected.repliedAt && (
                      <span className="text-xs text-green-600">
                        {new Date(selected.repliedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-sm leading-relaxed text-green-800">{selected.aiReply}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-orange-200 bg-orange-50 shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-semibold text-orange-700">Wartet auf Antwort</p>
                      <p className="text-xs text-orange-600">Die KI bereitet eine Antwort vor oder wartet auf manuelle Bearbeitung.</p>
                    </div>
                    <Button size="sm" className="ml-auto bg-orange-600 hover:bg-orange-700 text-white">
                      Manuell antworten
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes (if present) */}
            {(selected as StoredLead).notes && (
              <Card className="border-border shadow-none">
                <CardHeader className="pb-2 pt-4 px-4">
                  <span className="text-sm font-semibold">Notizen</span>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{(selected as StoredLead).notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Inbox className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Lead auswählen</p>
          </div>
        </div>
      )}
    </div>
  )
}
