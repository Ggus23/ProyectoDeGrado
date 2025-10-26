"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Upload,
  Sparkles,
  History,
  Settings,
  GraduationCap,
  FileText,
  Network,
  Calendar,
  ClipboardCheck,
  Lightbulb,
  ListChecks,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Visor PGF", href: "/pgf", icon: FileText },
  { name: "Checklist", href: "/checklist", icon: ListChecks },
  { name: "Alineación", href: "/alignment", icon: Network },
  { name: "Secuenciador", href: "/sequencer", icon: Calendar },
  { name: "Rúbricas", href: "/rubrics", icon: ClipboardCheck },
  { name: "Estrategias", href: "/strategies", icon: Lightbulb },
  { name: "Cargar PGF", href: "/upload", icon: Upload },
  { name: "Generar Recursos", href: "/generator", icon: Sparkles },
  { name: "Historial", href: "/history", icon: History },
  { name: "Configuración", href: "/settings", icon: Settings },
]

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300 overflow-hidden",
        // Desktop fijo
        "lg:relative lg:z-auto",
        isOpen
          ? "w-64 lg:w-64 relative z-50"   // en móvil abre como drawer
          : "w-0 lg:w-20",                 // en móvil cerrado = 0; en desktop = colapsado
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border px-4 transition-opacity duration-300",
          isOpen ? "justify-start opacity-100" : "justify-center opacity-0 lg:opacity-100",
        )}
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary shrink-0" />
          {isOpen && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-sm font-bold text-foreground">UNIFRANZ</span>
              <span className="text-xs text-muted-foreground">Cochabamba</span>
            </div>
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              title={!isOpen ? item.name : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : // Solid icon and text color for inactive items (high contrast)
                    "text-foreground hover:bg-muted hover:text-foreground",
                !isOpen && "lg:justify-center",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
