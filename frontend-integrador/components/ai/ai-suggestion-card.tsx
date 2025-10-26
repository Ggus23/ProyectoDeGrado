"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Edit, X, Sparkles } from "lucide-react"

interface AISuggestionCardProps {
  title: string
  description: string
  confidence?: number
  content: string
  onAccept?: () => void
  onEdit?: () => void
  onDiscard?: () => void
}

export function AISuggestionCard({
  title,
  description,
  confidence,
  content,
  onAccept,
  onEdit,
  onDiscard,
}: AISuggestionCardProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {confidence && (
            <Badge variant="secondary" className="bg-accent/20 text-foreground">
              {Math.round(confidence * 100)}% confianza
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-4 text-sm text-foreground">{content}</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {onAccept && (
          <Button onClick={onAccept} size="sm">
            <Check className="mr-2 h-4 w-4" />
            Aceptar
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        )}
        {onDiscard && (
          <Button onClick={onDiscard} variant="ghost" size="sm">
            <X className="mr-2 h-4 w-4" />
            Descartar
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
