import { Spinner } from "@/components/ui/spinner"
import { Sparkles } from "lucide-react"

interface AIOverlayProps {
  message?: string
  visible: boolean
}

export function AIOverlay({ message = "Analizando PGF...", visible }: AIOverlayProps) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-8 shadow-lg">
        <div className="relative">
          <Sparkles className="h-12 w-12 text-primary" />
          <Spinner className="absolute -right-2 -top-2 h-6 w-6 text-primary" />
        </div>
        <p className="text-lg font-medium text-foreground">{message}</p>
      </div>
    </div>
  )
}
