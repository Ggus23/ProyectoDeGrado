import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

type AIStatus = "analyzing" | "ready" | "reviewing" | "no-match" | "completed"

interface AIStatusChipProps {
  status: AIStatus
  className?: string
}

export function AIStatusChip({ status, className }: AIStatusChipProps) {
  const statusConfig = {
    analyzing: {
      label: "Analizando...",
      icon: <Spinner className="mr-1 h-3 w-3" />,
      variant: "secondary" as const,
      className: "bg-muted text-foreground",
    },
    ready: {
      label: "Sugerencia lista",
      icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
      variant: "default" as const,
      className: "bg-primary text-white",
    },
    reviewing: {
      label: "En revisión",
      icon: <Clock className="mr-1 h-3 w-3" />,
      variant: "secondary" as const,
      className: "bg-secondary text-foreground",
    },
    "no-match": {
      label: "Sin coincidencias",
      icon: <XCircle className="mr-1 h-3 w-3" />,
      variant: "outline" as const,
      className: "border-destructive text-destructive",
    },
    completed: {
      label: "Completado",
      icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
      variant: "default" as const,
      className: "bg-primary text-white",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={`${config.className} ${className}`}>
      {config.icon}
      {config.label}
    </Badge>
  )
}
