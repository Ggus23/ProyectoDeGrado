"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const competencies = [
  "Análisis y diseño de algoritmos",
  "Programación orientada a objetos",
  "Estructuras de datos",
  "Bases de datos relacionales",
  "Desarrollo web frontend",
  "Desarrollo web backend",
]

const resourceTypes = [
  { id: "activities", label: "Actividades detalladas" },
  { id: "rubrics", label: "Rúbricas de evaluación" },
  { id: "projects", label: "Proyectos prácticos" },
  { id: "gamification", label: "Recursos gamificados" },
]

export function GeneratorContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const { toast } = useToast()

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Recursos generados exitosamente",
        description: "Los materiales pedagógicos están listos para descargar.",
      })
    }, 3000)
  }

  const toggleResourceType = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Generar Recursos Pedagógicos</h2>
        <p className="text-muted-foreground">Selecciona las competencias y tipos de recursos que deseas generar</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Configuración de Generación</CardTitle>
            <CardDescription>Define los parámetros para crear tus materiales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pgf">Plan Global de Formación</Label>
              <Select>
                <SelectTrigger id="pgf">
                  <SelectValue placeholder="Selecciona un PGF cargado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pgf1">POO - 3er Semestre (15/01/2024)</SelectItem>
                  <SelectItem value="pgf2">Estructuras de Datos - 4to Semestre (10/01/2024)</SelectItem>
                  <SelectItem value="pgf3">Desarrollo Web - 5to Semestre (05/01/2024)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competency">Competencia a desarrollar</Label>
              <Select>
                <SelectTrigger id="competency">
                  <SelectValue placeholder="Selecciona una competencia" />
                </SelectTrigger>
                <SelectContent>
                  {competencies.map((comp) => (
                    <SelectItem key={comp} value={comp}>
                      {comp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Tipos de recursos a generar</Label>
              <div className="space-y-3">
                {resourceTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => toggleResourceType(type.id)}
                    />
                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || selectedTypes.length === 0} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-foreground" />
                  Generando recursos...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-foreground" />
                  Generar Recursos
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm font-medium">Recursos seleccionados</p>
              <p className="text-2xl font-bold text-primary">{selectedTypes.length}</p>
            </div>

            {selectedTypes.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Se generarán:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedTypes.map((typeId) => {
                    const type = resourceTypes.find((t) => t.id === typeId)
                    return <li key={typeId}>• {type?.label}</li>
                  })}
                </ul>
              </div>
            )}

            <Button variant="outline" className="w-full bg-transparent" disabled>
              <Download className="mr-2 h-4 w-4 text-foreground" />
              Descargar Todo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
