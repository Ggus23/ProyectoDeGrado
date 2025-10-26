import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

interface AIProgressBannerProps {
  message?: string
  progress?: number
  indeterminate?: boolean
}

export function AIProgressBanner({
  message = "Analizando PGF...",
  progress,
  indeterminate = false,
}: AIProgressBannerProps) {
  return (
    <div className="rounded-lg border bg-accent/10 p-4">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
      <Progress value={indeterminate ? undefined : progress} className={indeterminate ? "animate-pulse" : ""} />
    </div>
  )
}
