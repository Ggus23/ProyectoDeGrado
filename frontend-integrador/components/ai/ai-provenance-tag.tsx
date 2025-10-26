import { Badge } from "@/components/ui/badge"
import { FileText, Sparkles, User } from "lucide-react"

type ProvenanceSource = "pgf" | "ai" | "manual"

interface AIProvenanceTagProps {
  source: ProvenanceSource
  className?: string
}

export function AIProvenanceTag({ source, className }: AIProvenanceTagProps) {
  const sourceConfig = {
    pgf: {
      label: "Fuente: PGF",
      icon: <FileText className="mr-1 h-3 w-3" />,
      className: "bg-muted text-foreground",
    },
    ai: {
      label: "Fuente: IA",
      icon: <Sparkles className="mr-1 h-3 w-3" />,
      className: "bg-primary text-white",
    },
    manual: {
      label: "Fuente: Manual",
      icon: <User className="mr-1 h-3 w-3" />,
      className: "bg-secondary text-foreground",
    },
  }

  const config = sourceConfig[source] || sourceConfig.manual

  return (
    <Badge variant="outline" className={`${config.className} ${className || ""}`}>
      {config.icon}
      {config.label}
    </Badge>
  )
}
