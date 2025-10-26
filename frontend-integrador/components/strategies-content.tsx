"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lightbulb, BookOpen, Users, Brain, Target } from "lucide-react"
import { AIOverlay } from "@/components/ai/ai-overlay"
import { AISuggestionCard } from "@/components/ai/ai-suggestion-card"
import { AIProvenanceTag } from "@/components/ai/ai-provenance-tag"

interface Strategy {
  id: string
  title: string
  description: string
  category: "active" | "collaborative" | "cognitive" | "assessment"
  competencies: string[]
  activities: string[]
  source: "human" | "ai" | "hybrid"
  effectiveness: number
}

const mockStrategies: Strategy[] = [
  {
    id: "s1",
    title: "Aprendizaje Basado en Proyectos",
    description:
      "Los estudiantes trabajan en proyectos reales que integran múltiples competencias y requieren solución de problemas complejos.",
    category: "active",
    competencies: ["POO-01", "EST-02", "BD-04"],
    activities: ["Diseño de sistema", "Implementación", "Presentación"],
    source: "hybrid",
    effectiveness: 0.92,
  },
  {
    id: "s2",
    title: "Programación en Parejas",
    description:
      "Dos estudiantes trabajan juntos en una computadora, alternando roles de conductor y navegador para mejorar la calidad del código.",
    category: "collaborative",
    competencies: ["POO-01", "EST-02"],
    activities: ["Laboratorios prácticos", "Resolución de problemas"],
    source: "ai",
    effectiveness: 0.85,
  },
  {
    id: "s3",
    title: "Mapas Conceptuales",
    description:
      "Creación de diagramas que representan relaciones entre conceptos para facilitar la comprensión de estructuras complejas.",
    category: "cognitive",
    competencies: ["ALG-03", "EST-02"],
    activities: ["Análisis de algoritmos", "Diseño de estructuras"],
    source: "human",
    effectiveness: 0.78,
  },
  {
    id: "s4",
    title: "Evaluación Formativa Continua",
    description:
      "Evaluaciones frecuentes de bajo impacto que proporcionan retroalimentación inmediata para guiar el aprendizaje.",
    category: "assessment",
    competencies: ["POO-01", "EST-02", "ALG-03"],
    activities: ["Quizzes semanales", "Revisión de código", "Autoevaluación"],
    source: "hybrid",
    effectiveness: 0.88,
  },
]

export function StrategiesContent() {
  const [strategies, setStrategies] = useState(mockStrategies)
  const [showOverlay, setShowOverlay] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleSuggest = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
      setShowSuggestion(true)
    }, 2000)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "active":
        return <Target className="h-5 w-5" />
      case "collaborative":
        return <Users className="h-5 w-5" />
      case "cognitive":
        return <Brain className="h-5 w-5" />
      case "assessment":
        return <BookOpen className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "active":
        return "Aprendizaje Activo"
      case "collaborative":
        return "Colaborativo"
      case "cognitive":
        return "Cognitivo"
      case "assessment":
        return "Evaluación"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "collaborative":
        return "bg-purple-100 text-purple-800"
      case "cognitive":
        return "bg-green-100 text-green-800"
      case "assessment":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      <AIOverlay visible={showOverlay} message="Analizando estrategias pedagógicas..." />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Estrategias Pedagógicas</h2>
          <p className="text-muted-foreground">Descubre y aplica estrategias efectivas para el aprendizaje</p>
        </div>
        <Button onClick={handleSuggest}>
          <Sparkles className="mr-2 h-4 w-4" />
          Sugerir estrategias
        </Button>
      </div>

      {showSuggestion && (
        <AISuggestionCard
          title="Nueva estrategia sugerida"
          description="Basado en las competencias de tu curso, se recomienda esta estrategia"
          confidence={0.89}
          content="Estrategia: 'Revisión de Código por Pares' - Los estudiantes revisan el código de sus compañeros aplicando criterios de calidad. Esto refuerza POO-01 y EST-02 mientras desarrolla habilidades de análisis crítico. Efectividad estimada: 86%"
          onAccept={() => {
            console.log("[v0] Accepted strategy")
            setShowSuggestion(false)
          }}
          onEdit={() => {
            console.log("[v0] Editing strategy")
          }}
          onDiscard={() => {
            console.log("[v0] Discarded strategy")
            setShowSuggestion(false)
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {strategies.map((strategy) => (
          <Card key={strategy.id}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(strategy.category)}
                  <Badge className={getCategoryColor(strategy.category)} variant="secondary">
                    {getCategoryLabel(strategy.category)}
                  </Badge>
                </div>
                <AIProvenanceTag source={strategy.source} />
              </div>
              <CardTitle className="text-lg">{strategy.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground">{strategy.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Efectividad</span>
                  <span className="font-semibold text-primary">{Math.round(strategy.effectiveness * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${strategy.effectiveness * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Competencias relacionadas</h4>
                <div className="flex flex-wrap gap-2">
                  {strategy.competencies.map((comp) => (
                    <Badge key={comp} variant="outline" className="text-xs">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Actividades sugeridas</h4>
                <ul className="space-y-1">
                  {strategy.activities.map((activity, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Ver detalles
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Aplicar al PGF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
