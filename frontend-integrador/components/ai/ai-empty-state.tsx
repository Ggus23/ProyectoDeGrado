"use client"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Sparkles } from "lucide-react"

interface AIEmptyStateProps {
  title?: string
  description?: string
  onRequestAssistance?: () => void
}

export function AIEmptyState({
  title = "Sin asesoramiento IA disponible",
  description = "Solicita asesoramiento de IA para obtener sugerencias personalizadas para tu PGF.",
  onRequestAssistance,
}: AIEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Sparkles className="h-12 w-12 text-primary" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onRequestAssistance}>
          <Sparkles className="mr-2 h-4 w-4" />
          Solicitar asesoramiento IA
        </Button>
      </EmptyContent>
    </Empty>
  )
}
