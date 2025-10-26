"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Network, CheckCircle, AlertCircle } from "lucide-react"
import { AIOverlay } from "@/components/ai/ai-overlay"
import { AISuggestionCard } from "@/components/ai/ai-suggestion-card"
import { AIConfidenceMeter } from "@/components/ai/ai-confidence-meter"

interface Competency {
  id: string
  code: string
  title: string
  description: string
  level: "basic" | "intermediate" | "advanced"
}

interface AlignmentMapping {
  sectionId: string
  sectionTitle: string
  competencies: Competency[]
  aiConfidence: number
  status: "aligned" | "partial" | "missing"
}

const mockCompetencies: Competency[] = [
  {
    id: "c1",
    code: "POO-01",
    title: "Programación Orientada a Objetos",
    description: "Aplicar principios de POO en el desarrollo de software",
    level: "intermediate",
  },
  {
    id: "c2",
    code: "EST-02",
    title: "Estructuras de Datos",
    description: "Implementar y utilizar estructuras de datos eficientes",
    level: "intermediate",
  },
  {
    id: "c3",
    code: "ALG-03",
    title: "Análisis de Algoritmos",
    description: "Evaluar complejidad y eficiencia de algoritmos",
    level: "advanced",
  },
  {
    id: "c4",
    code: "BD-04",
    title: "Bases de Datos",
    description: "Diseñar e implementar bases de datos relacionales",
    level: "basic",
  },
]

const mockAlignments: AlignmentMapping[] = [
  {
    sectionId: "s1",
    sectionTitle: "Objetivos de Aprendizaje",
    competencies: [mockCompetencies[0], mockCompetencies[1]],
    aiConfidence: 0.95,
    status: "aligned",
  },
  {
    sectionId: "s2",
    sectionTitle: "Contenidos Temáticos",
    competencies: [mockCompetencies[1], mockCompetencies[2]],
    aiConfidence: 0.88,
    status: "aligned",
  },
  {
    sectionId: "s3",
    sectionTitle: "Metodología",
    competencies: [mockCompetencies[0]],
    aiConfidence: 0.72,
    status: "partial",
  },
  {
    sectionId: "s4",
    sectionTitle: "Evaluación",
    competencies: [],
    aiConfidence: 0.45,
    status: "missing",
  },
]

export function AlignmentContent() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleAnalyze = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
      setShowSuggestion(true)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aligned":
        return <CheckCircle className="h-5 w-5 text-primary" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "missing":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aligned":
        return "Alineado"
      case "partial":
        return "Parcial"
      case "missing":
        return "Sin alinear"
      default:
        return ""
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "intermediate":
        return "bg-purple-100 text-purple-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      <AIOverlay visible={showOverlay} message="Analizando alineación con competencias..." />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Alineación de Competencias</h2>
          <p className="text-muted-foreground">Mapeo entre secciones del PGF y competencias del programa</p>
        </div>
        <Button onClick={handleAnalyze}>
          <Sparkles className="mr-2 h-4 w-4" />
          Analizar alineación
        </Button>
      </div>

      {showSuggestion && (
        <AISuggestionCard
          title="Sugerencia de alineación detectada"
          description="La sección 'Evaluación' no tiene competencias asignadas. Se sugiere alinear con competencias relacionadas."
          confidence={0.89}
          content="Se recomienda vincular la sección de Evaluación con las competencias POO-01 y EST-02, ya que los criterios de evaluación mencionados están directamente relacionados con estas competencias."
          onAccept={() => {
            console.log("[v0] Accepted alignment suggestion")
            setShowSuggestion(false)
          }}
          onEdit={() => {
            console.log("[v0] Editing alignment")
          }}
          onDiscard={() => {
            console.log("[v0] Discarded alignment suggestion")
            setShowSuggestion(false)
          }}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Mapeo de Alineación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAlignments.map((alignment) => (
              <div key={alignment.sectionId} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(alignment.status)}
                      <h3 className="font-semibold text-foreground">{alignment.sectionTitle}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getStatusText(alignment.status)}
                      </Badge>
                    </div>
                    <AIConfidenceMeter confidence={alignment.aiConfidence} />
                  </div>
                </div>

                {alignment.competencies.length > 0 ? (
                  <div className="space-y-2">
                    {alignment.competencies.map((comp) => (
                      <div key={comp.id} className="flex items-start gap-3 p-2 bg-muted rounded">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-mono font-semibold text-primary">{comp.code}</span>
                            <Badge className={getLevelColor(comp.level)} variant="secondary">
                              {comp.level}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground">{comp.title}</p>
                          <p className="text-xs text-muted-foreground">{comp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground italic">
                    No hay competencias asignadas a esta sección
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competencias del Programa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCompetencies.map((comp) => (
              <div key={comp.id} className="p-3 border border-border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-semibold text-primary">{comp.code}</span>
                  <Badge className={getLevelColor(comp.level)} variant="secondary">
                    {comp.level}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground">{comp.title}</p>
                <p className="text-xs text-muted-foreground">{comp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
