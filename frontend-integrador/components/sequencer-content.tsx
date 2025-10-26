"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Calendar, GripVertical, Clock, BookOpen } from "lucide-react"
import { AIOverlay } from "@/components/ai/ai-overlay"
import { AISuggestionCard } from "@/components/ai/ai-suggestion-card"

interface Activity {
  id: string
  title: string
  type: "lecture" | "lab" | "project" | "exam"
  duration: number
  week: number
  competencies: string[]
}

const mockActivities: Activity[] = [
  {
    id: "a1",
    title: "Introducción a POO",
    type: "lecture",
    duration: 2,
    week: 1,
    competencies: ["POO-01"],
  },
  {
    id: "a2",
    title: "Laboratorio: Clases y Objetos",
    type: "lab",
    duration: 3,
    week: 1,
    competencies: ["POO-01"],
  },
  {
    id: "a3",
    title: "Estructuras de Datos Lineales",
    type: "lecture",
    duration: 2,
    week: 2,
    competencies: ["EST-02"],
  },
  {
    id: "a4",
    title: "Proyecto: Sistema de Gestión",
    type: "project",
    duration: 8,
    week: 3,
    competencies: ["POO-01", "EST-02"],
  },
  {
    id: "a5",
    title: "Examen Parcial",
    type: "exam",
    duration: 2,
    week: 4,
    competencies: ["POO-01", "EST-02"],
  },
]

export function SequencerContent() {
  const [activities, setActivities] = useState(mockActivities)
  const [showOverlay, setShowOverlay] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleOptimize = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
      setShowSuggestion(true)
    }, 2000)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-800"
      case "lab":
        return "bg-purple-100 text-purple-800"
      case "project":
        return "bg-green-100 text-green-800"
      case "exam":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Clase"
      case "lab":
        return "Laboratorio"
      case "project":
        return "Proyecto"
      case "exam":
        return "Examen"
      default:
        return type
    }
  }

  const groupedByWeek = activities.reduce(
    (acc, activity) => {
      if (!acc[activity.week]) {
        acc[activity.week] = []
      }
      acc[activity.week].push(activity)
      return acc
    },
    {} as Record<number, Activity[]>,
  )

  return (
    <div className="space-y-8">
      <AIOverlay visible={showOverlay} message="Optimizando secuencia de actividades..." />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Secuenciador de Actividades</h2>
          <p className="text-muted-foreground">Organiza y optimiza la secuencia de actividades de aprendizaje</p>
        </div>
        <Button onClick={handleOptimize}>
          <Sparkles className="mr-2 h-4 w-4" />
          Optimizar secuencia
        </Button>
      </div>

      {showSuggestion && (
        <AISuggestionCard
          title="Optimización de secuencia sugerida"
          description="Se detectó una oportunidad para mejorar la progresión de aprendizaje"
          confidence={0.87}
          content="Se recomienda agregar un laboratorio práctico entre la semana 2 y 3 para reforzar los conceptos de estructuras de datos antes del proyecto integrador. Esto mejorará la preparación de los estudiantes."
          onAccept={() => {
            console.log("[v0] Accepted sequence optimization")
            setShowSuggestion(false)
          }}
          onEdit={() => {
            console.log("[v0] Editing sequence")
          }}
          onDiscard={() => {
            console.log("[v0] Discarded sequence suggestion")
            setShowSuggestion(false)
          }}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Línea de Tiempo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(groupedByWeek)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([week, weekActivities]) => (
                <div key={week} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      {week}
                    </div>
                    <h3 className="font-semibold text-foreground">Semana {week}</h3>
                  </div>

                  <div className="ml-4 border-l-2 border-border pl-6 space-y-3">
                    {weekActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card hover:bg-muted transition-colors cursor-move"
                      >
                        <GripVertical className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-foreground">{activity.title}</h4>
                            <Badge className={getTypeColor(activity.type)} variant="secondary">
                              {getTypeLabel(activity.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{activity.duration}h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{activity.competencies.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total actividades</span>
                <span className="font-semibold text-foreground">{activities.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duración total</span>
                <span className="font-semibold text-foreground">
                  {activities.reduce((sum, a) => sum + a.duration, 0)}h
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Semanas</span>
                <span className="font-semibold text-foreground">{Object.keys(groupedByWeek).length}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Por tipo</h4>
              {["lecture", "lab", "project", "exam"].map((type) => {
                const count = activities.filter((a) => a.type === type).length
                if (count === 0) return null
                return (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <Badge className={getTypeColor(type)} variant="secondary">
                      {getTypeLabel(type)}
                    </Badge>
                    <span className="font-semibold text-foreground">{count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
