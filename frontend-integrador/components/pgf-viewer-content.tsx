"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, FileText } from "lucide-react"
import { mockPGFSections } from "@/lib/mock"
import { AIStatusChip } from "@/components/ai/ai-status-chip"
import { AIOverlay } from "@/components/ai/ai-overlay"
import { AISuggestionCard } from "@/components/ai/ai-suggestion-card"
import { AIDiffDialog } from "@/components/ai/ai-diff-dialog"
import { AIEmptyState } from "@/components/ai/ai-empty-state"

export function PGFViewerContent() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showDiffDialog, setShowDiffDialog] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const handleRequestAssistance = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
      setShowSuggestions(true)
    }, 2000)
  }

  const handleViewDiff = (sectionId: string) => {
    setSelectedSection(sectionId)
    setShowDiffDialog(true)
  }

  const sectionsWithSuggestions = mockPGFSections.filter(
    (section) => section.aiStatus === "ready" || section.aiStatus === "reviewing",
  )

  return (
    <div className="space-y-8">
      <AIOverlay visible={showOverlay} message="Analizando PGF..." />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Visor PGF</h2>
          <p className="text-muted-foreground">Revisa y gestiona las secciones de tu Plan General de Formación</p>
        </div>
        <Button onClick={handleRequestAssistance}>
          <Sparkles className="mr-2 h-4 w-4" />
          Solicitar análisis IA
        </Button>
      </div>

      <Tabs defaultValue="sections" className="w-full">
        <TabsList>
          <TabsTrigger value="sections">Secciones del PGF</TabsTrigger>
          <TabsTrigger value="suggestions">
            Sugerencias IA
            {sectionsWithSuggestions.length > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                {sectionsWithSuggestions.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4 mt-6">
          {mockPGFSections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </div>
                  {section.aiStatus && <AIStatusChip status={section.aiStatus} />}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground whitespace-pre-wrap">{section.content}</p>
                {(section.aiStatus === "ready" || section.aiStatus === "reviewing") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent"
                    onClick={() => handleViewDiff(section.id)}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ver sugerencia IA
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="suggestions" className="mt-6">
          {!showSuggestions ? (
            <AIEmptyState onRequestAssistance={handleRequestAssistance} />
          ) : sectionsWithSuggestions.length > 0 ? (
            <div className="space-y-4">
              {sectionsWithSuggestions.map((section) => (
                <AISuggestionCard
                  key={section.id}
                  title={`Sugerencia para: ${section.title}`}
                  description="El sistema IA ha analizado esta sección y generó una sugerencia de mejora"
                  confidence={0.92}
                  content={`Versión mejorada de "${section.title}" con mayor claridad y alineación con competencias. Se han agregado detalles específicos y se ha mejorado la estructura del contenido para facilitar su comprensión.`}
                  onAccept={() => {
                    console.log("[v0] Accepted suggestion for", section.id)
                  }}
                  onEdit={() => handleViewDiff(section.id)}
                  onDiscard={() => {
                    console.log("[v0] Discarded suggestion for", section.id)
                  }}
                />
              ))}
            </div>
          ) : (
            <AIEmptyState
              title="No hay sugerencias disponibles"
              description="Solicita un análisis IA para obtener sugerencias de mejora para tu PGF."
              onRequestAssistance={handleRequestAssistance}
            />
          )}
        </TabsContent>
      </Tabs>

      {selectedSection && (
        <AIDiffDialog
          open={showDiffDialog}
          onOpenChange={setShowDiffDialog}
          title={`Comparación: ${mockPGFSections.find((s) => s.id === selectedSection)?.title}`}
          originalContent={mockPGFSections.find((s) => s.id === selectedSection)?.content || ""}
          suggestedContent={`${mockPGFSections.find((s) => s.id === selectedSection)?.content}\n\nMEJORAS SUGERIDAS:\n- Mayor claridad en la redacción\n- Alineación con competencias específicas\n- Estructura mejorada para facilitar comprensión\n- Detalles adicionales sobre metodología aplicada`}
          onAccept={() => {
            console.log("[v0] Accepted diff for", selectedSection)
            setShowDiffDialog(false)
          }}
          onReject={() => {
            console.log("[v0] Rejected diff for", selectedSection)
            setShowDiffDialog(false)
          }}
        />
      )}
    </div>
  )
}
