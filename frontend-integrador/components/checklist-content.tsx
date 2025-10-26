"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ListChecks, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { AIOverlay } from "@/components/ai/ai-overlay"
import { AISuggestionCard } from "@/components/ai/ai-suggestion-card"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  priority: "high" | "medium" | "low"
  aiSuggested?: boolean
}

const mockChecklistItems: ChecklistItem[] = [
  {
    id: "1",
    title: "Definir objetivos de aprendizaje",
    description: "Establecer objetivos claros y medibles para el curso",
    category: "Planificación",
    completed: true,
    priority: "high",
  },
  {
    id: "2",
    title: "Alinear competencias con contenidos",
    description: "Verificar que los contenidos cubran todas las competencias",
    category: "Alineación",
    completed: true,
    priority: "high",
  },
  {
    id: "3",
    title: "Diseñar secuencia de actividades",
    description: "Organizar actividades en orden lógico de complejidad",
    category: "Secuenciación",
    completed: false,
    priority: "high",
    aiSuggested: true,
  },
  {
    id: "4",
    title: "Crear rúbricas de evaluación",
    description: "Desarrollar criterios claros para evaluar el aprendizaje",
    category: "Evaluación",
    completed: false,
    priority: "high",
  },
  {
    id: "5",
    title: "Seleccionar estrategias pedagógicas",
    description: "Elegir métodos de enseñanza apropiados para cada tema",
    category: "Metodología",
    completed: false,
    priority: "medium",
    aiSuggested: true,
  },
  {
    id: "6",
    title: "Definir recursos didácticos",
    description: "Listar materiales y recursos necesarios",
    category: "Recursos",
    completed: false,
    priority: "medium",
  },
  {
    id: "7",
    title: "Establecer cronograma",
    description: "Distribuir contenidos y actividades en el tiempo disponible",
    category: "Planificación",
    completed: false,
    priority: "medium",
  },
  {
    id: "8",
    title: "Revisar bibliografía",
    description: "Actualizar y verificar referencias bibliográficas",
    category: "Recursos",
    completed: false,
    priority: "low",
  },
]

export function ChecklistContent() {
  const [items, setItems] = useState(mockChecklistItems)
  const [showOverlay, setShowOverlay] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleToggle = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const handleAnalyze = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
      setShowSuggestion(true)
    }, 2000)
  }

  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>,
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return priority
    }
  }

  return (
    <div className="space-y-8">
      <AIOverlay visible={showOverlay} message="Analizando progreso del PGF..." />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Checklist de Completitud</h2>
          <p className="text-muted-foreground">Verifica que tu PGF cumpla con todos los requisitos</p>
        </div>
        <Button onClick={handleAnalyze}>
          <Sparkles className="mr-2 h-4 w-4" />
          Analizar progreso
        </Button>
      </div>

      {showSuggestion && (
        <AISuggestionCard
          title="Recomendación de prioridad"
          description="Se detectaron tareas pendientes de alta prioridad"
          confidence={0.93}
          content="Se recomienda completar primero 'Diseñar secuencia de actividades' y 'Crear rúbricas de evaluación' ya que son fundamentales para la estructura del curso y tienen dependencias con otras tareas."
          onAccept={() => {
            console.log("[v0] Accepted priority suggestion")
            setShowSuggestion(false)
          }}
          onEdit={() => {
            console.log("[v0] Editing priorities")
          }}
          onDiscard={() => {
            console.log("[v0] Discarded suggestion")
            setShowSuggestion(false)
          }}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            Progreso General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedCount} de {totalCount} tareas completadas
              </span>
              <span className="font-semibold text-primary">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completadas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Circle className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCount - completedCount}</p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {items.filter((i) => !i.completed && i.priority === "high").length}
                </p>
                <p className="text-xs text-muted-foreground">Alta prioridad</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => handleToggle(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium cursor-pointer ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                      >
                        {item.title}
                      </label>
                      <div className="flex items-center gap-2">
                        {item.aiSuggested && (
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            <Sparkles className="h-3 w-3 mr-1" />
                            IA
                          </Badge>
                        )}
                        <Badge className={getPriorityColor(item.priority)} variant="secondary">
                          {getPriorityLabel(item.priority)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
