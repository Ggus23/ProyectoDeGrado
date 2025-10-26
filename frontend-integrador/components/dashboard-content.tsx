"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Clock, TrendingUp, Upload, Sparkles } from "lucide-react"
import Link from "next/link"
import { mockAIProgress, mockHistory } from "@/lib/mock"
import { AIProgressBanner } from "@/components/ai/ai-progress-banner"
import { AIProvenanceTag } from "@/components/ai/ai-provenance-tag"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Análisis IA Completados",
    value: mockAIProgress.completed.toString(),
    change: `${mockAIProgress.total} total`,
    icon: CheckCircle,
    color: "text-primary",
  },
  {
    title: "En Revisión",
    value: mockAIProgress.reviewing.toString(),
    change: "Requieren atención",
    icon: Clock,
    color: "text-foreground",
  },
  {
    title: "Sugerencias Listas",
    value: mockAIProgress.ready.toString(),
    change: "Disponibles para revisar",
    icon: Sparkles,
    color: "text-primary",
  },
  {
    title: "Analizando",
    value: mockAIProgress.analyzing.toString(),
    change: "En proceso",
    icon: TrendingUp,
    color: "text-foreground",
  },
]

export function DashboardContent() {
  const aiProgressPercentage = Math.round((mockAIProgress.completed / mockAIProgress.total) * 100)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Bienvenido de nuevo</h2>
        <p className="text-muted-foreground">Resumen del análisis IA de tu PGF</p>
      </div>

      <AIProgressBanner
        message={`Análisis del PGF en progreso: ${aiProgressPercentage}% completado`}
        progress={aiProgressPercentage}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/pgf">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="mr-2 h-4 w-4 text-foreground" />
                Ver PGF completo
              </Button>
            </Link>
            <Link href="/upload">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Upload className="mr-2 h-4 w-4 text-foreground" />
                Cargar nuevo PGF
              </Button>
            </Link>
            <Link href="/generator">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Sparkles className="mr-2 h-4 w-4 text-foreground" />
                Generar recursos pedagógicos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Validaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHistory.slice(0, 3).map((version) => (
                <div
                  key={version.id}
                  className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">Versión {version.version}</p>
                      <AIProvenanceTag source={version.source} />
                    </div>
                    <p className="text-xs text-muted-foreground">{version.changes}</p>
                    <p className="text-xs text-muted-foreground">
                      {version.author} • {version.date}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ml-2",
                      version.status === "approved"
                        ? "bg-primary text-white"
                        : version.status === "reviewing"
                          ? "bg-secondary text-foreground"
                          : "bg-muted text-foreground",
                    )}
                  >
                    {version.status === "approved"
                      ? "Aprobado"
                      : version.status === "reviewing"
                        ? "En revisión"
                        : "Borrador"}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/history">
              <Button variant="ghost" className="w-full mt-4 text-primary">
                Ver historial completo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
