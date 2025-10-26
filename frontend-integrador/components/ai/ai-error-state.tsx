"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"

type ErrorType = "no-match" | "limit" | "unexpected"

interface AIErrorStateProps {
  type: ErrorType
  onRetry?: () => void
}

export function AIErrorState({ type, onRetry }: AIErrorStateProps) {
  const errorConfig = {
    "no-match": {
      title: "Sin coincidencias encontradas",
      description:
        "No se encontraron sugerencias relevantes para este contenido. Intenta con una descripción más detallada.",
    },
    limit: {
      title: "Límite de solicitudes alcanzado",
      description: "Has alcanzado el límite de solicitudes de IA por hoy. Intenta nuevamente mañana.",
    },
    unexpected: {
      title: "Error inesperado",
      description: "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
    },
  }

  const config = errorConfig[type]

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="mt-2">
        {config.description}
        {onRetry && (
          <Button variant="outline" size="sm" className="mt-3 bg-transparent" onClick={onRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
