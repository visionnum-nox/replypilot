"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Inbox,
  Settings,
  BarChart3,
  Zap,
  Bell,
  ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const navItems = [
  {
    href: "/",
    label: "Übersicht",
    icon: LayoutDashboard,
  },
  {
    href: "/inbox",
    label: "Posteingang",
    icon: Inbox,
    badge: "2",
  },
  {
    href: "/stats",
    label: "Statistiken",
    icon: BarChart3,
  },
  {
    href: "/settings",
    label: "KI-Einstellungen",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight">ReplyPilot</span>
          <span className="ml-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">KI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-2 px-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Navigation
        </div>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && !isActive && (
                    <Badge
                      variant="secondary"
                      className="h-5 min-w-5 text-xs font-bold px-1.5 bg-orange-100 text-orange-700 border-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="h-3 w-3 opacity-60" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Status */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-green-50 px-3 py-2.5 border border-green-100">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </div>
          <div>
            <p className="text-xs font-semibold text-green-700">KI aktiv</p>
            <p className="text-[10px] text-green-600">Antwortet automatisch</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Muster Handwerk GmbH</p>
            <p className="text-[10px] text-muted-foreground truncate">Pro Plan</p>
          </div>
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </aside>
  )
}
