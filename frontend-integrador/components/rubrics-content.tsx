"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ClipboardCheck, Plus, Download } from "lucide-react"
import { AIOverlay } from "@/components/ai/ai-overlay"
import { AISuggestionCard } from "@/components/ai/ai-suggestion-card"
import { AIProvenanceTag } from "@/components/ai/ai-provenance-tag"

interface RubricCriterion {
  id: string
  name: string
  weight: number
  levels: {
    level: string
    description: string
    points: number
  }[]
}

interface Rubric {
  id: string
  title: string
  description: string
  criteria: RubricCriterion[]
  source: "human" | "ai" | "hybrid"
  createdAt: string
}

const mockRubrics: Rubric[] = [
  {
    id: "r1",
    title: "Rúbrica: Proyecto Final POO",
    description: "Evaluación del proyecto final de Programación Orientada a Objetos",
    source: "hybrid",
    createdAt: "2024-01-15",
    criteria: [
      {
        id: "c1",
        name: "Diseño de Clases",
        weight: 30,
        levels: [
          {
            level: "Excelente",
            description: "Diseño completo con herencia, polimorfismo y encapsulación correcta",
            points: 30,
          },
          {
            level: "Bueno",
            description: "Diseño adecuado con algunos principios de POO aplicados",
            points: 24,
          },
          {
            level: "Regular",
            description: "Diseño básico con estructura de clases simple",
            points: 18,
          },
          {
            level: "Insuficiente",
            description: "Diseño incompleto o incorrecto",
            points: 10,
          },
        ],
      },
      {
        id: "c2",
        name: "Funcionalidad",
        weight: 40,
        levels: [
          {
            level: "Excelente",
            description: "Todas las funcionalidades implementadas y funcionando correctamente",
            points: 40,
          },
          {
            level: "Bueno",
            description: "Mayoría de funcionalidades implementadas con errores menores",
            points: 32,
          },
          {
            level: "Regular",
            description: "Funcionalidades básicas implementadas",
            points: 24,
          },
          {
            level: "Insuficiente",
            description: "Funcionalidades incompletas o no funcionan",
            points: 16,
          },
        ],
      },
      {
        id: "c3",
        name: "Documentación",
        weight: 30,
        levels: [
          {
            level: "Excelente",
            description: "Documentación completa y clara del código",
            points: 30,
          },
          {
            level: "Bueno",
            description: "Documentación adecuada de las partes principales",
            points: 24,
          },
          {
            level: "Regular",
            description: "Documentación básica o incompleta",
            points: 18,
          },
          {
            level: "Insuficiente",
            description: "Sin documentación o muy deficiente",
            points: 10,
          },
        ],
      },
    ],
  },
  {
    id: "r2",
    title: "Rúbrica: Laboratorio Estructuras de Datos",
    description: "Evaluación de prácticas de laboratorio",
    source: "ai",
    createdAt: "2024-01-14",
    criteria: [
      {
        id: "c1",
        name: "Implementación Correcta",
        weight: 50,
        levels: [
          {
            level: "Excelente",
            description: "Implementación completa y eficiente de todas las estructuras",
            points: 50,
          },
          {
            level: "Bueno",
            description: "Implementación correcta con eficiencia aceptable",
            points: 40,
          },
          {
            level: "Regular",
            description: "Implementación básica con algunos errores",
            points: 30,
          },
          {
            level: "Insuficiente",
            description: "Implementación incorrecta o incompleta",
            points: 20,
          },
        ],
      },
      {
        id: "c2",
        name: "Análisis de Complejidad",
        weight: 50,
        levels: [
          {
            level: "Excelente",
            description: "Análisis completo y correcto de complejidad temporal y espacial",
            points: 50,
          },
          {
            level: "Bueno",
            description: "Análisis correcto de complejidad temporal",
            points: 40,
          },
          {
            level: "Regular",
            description: "Análisis básico con algunos errores",
            points: 30,
          },
          {
            level: "Insuficiente",
            description: "Sin análisis o análisis incorrecto",
            points: 20,
          },
        ],
      },
    ],
  },
]

export function RubricsContent() {
  const [rubrics, setRubrics] = useState(mockRubrics)
  const [showOverlay, setShowOverlay] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleGenerate = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
      setShowSuggestion(true)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <AIOverlay visible={showOverlay} message="Generando rúbrica con IA..." />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Rúbricas de Evaluación</h2>
          <p className="text-muted-foreground">Gestiona y genera rúbricas para evaluar el aprendizaje</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Nueva rúbrica
          </Button>
          <Button onClick={handleGenerate}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generar con IA
          </Button>
        </div>
      </div>

      {showSuggestion && (
        <AISuggestionCard
          title="Nueva rúbrica generada"
          description="Se ha generado una rúbrica para 'Examen Parcial' basada en las competencias del curso"
          confidence={0.91}
          content="Rúbrica de 4 criterios: Conocimiento Teórico (30%), Aplicación Práctica (40%), Análisis y Resolución (20%), Claridad de Respuestas (10%). Cada criterio incluye 4 niveles de desempeño con descriptores específicos."
          onAccept={() => {
            console.log("[v0] Accepted rubric")
            setShowSuggestion(false)
          }}
          onEdit={() => {
            console.log("[v0] Editing rubric")
          }}
          onDiscard={() => {
            console.log("[v0] Discarded rubric")
            setShowSuggestion(false)
          }}
        />
      )}

      <div className="space-y-6">
        {rubrics.map((rubric) => (
          <Card key={rubric.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{rubric.title}</CardTitle>
                    <AIProvenanceTag source={rubric.source} />
                  </div>
                  <p className="text-sm text-muted-foreground">{rubric.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Creada: {rubric.createdAt}</p>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rubric.criteria.map((criterion) => (
                  <div key={criterion.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{criterion.name}</h4>
                      <Badge variant="secondary" className="bg-primary text-white">
                        {criterion.weight}%
                      </Badge>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                      {criterion.levels.map((level, idx) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-foreground">{level.level}</span>
                            <span className="text-sm font-bold text-primary">{level.points} pts</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{level.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Total: {rubric.criteria.reduce((sum, c) => sum + c.weight, 0)} puntos
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      Duplicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
