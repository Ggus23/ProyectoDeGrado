import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface AIConfidenceMeterProps {
  confidence: number
}

export function AIConfidenceMeter({ confidence }: AIConfidenceMeterProps) {
  const percentage = Math.round(confidence * 100)

  const getConfidenceColor = () => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 75) return "bg-blue-500"
    if (percentage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getConfidenceLabel = () => {
    if (percentage >= 90) return "Muy Alta"
    if (percentage >= 75) return "Alta"
    if (percentage >= 60) return "Media"
    return "Baja"
  }

  const getConfidenceBadgeColor = () => {
    if (percentage >= 90) return "bg-green-100 text-green-800"
    if (percentage >= 75) return "bg-blue-100 text-blue-800"
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Confianza IA</span>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={getConfidenceBadgeColor()}>
            {getConfidenceLabel()}
          </Badge>
          <span className="font-semibold text-foreground">{percentage}%</span>
        </div>
      </div>
      <div className="relative">
        <Progress value={percentage} className="h-2" />
        <div
          className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getConfidenceColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
