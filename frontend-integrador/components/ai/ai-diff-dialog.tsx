"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface AIDiffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  originalContent: string
  suggestedContent: string
  onAccept?: () => void
  onReject?: () => void
}

export function AIDiffDialog({
  open,
  onOpenChange,
  title,
  originalContent,
  suggestedContent,
  onAccept,
  onReject,
}: AIDiffDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Compara el contenido original del PGF con la sugerencia generada por IA</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
            <TabsTrigger value="suggested">Sugerencia IA</TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="mt-4">
            <div className="rounded-md border bg-card p-4 max-h-96 overflow-y-auto">
              <Badge variant="outline" className="mb-3">
                Fuente: PGF
              </Badge>
              <p className="text-sm text-foreground whitespace-pre-wrap">{originalContent}</p>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              <div className="rounded-md border bg-card p-4">
                <Badge variant="outline" className="mb-3">
                  Original
                </Badge>
                <p className="text-sm text-foreground whitespace-pre-wrap">{originalContent}</p>
              </div>
              <div className="rounded-md border border-primary/20 bg-card p-4">
                <Badge className="mb-3 bg-primary text-white">Sugerencia IA</Badge>
                <p className="text-sm text-foreground whitespace-pre-wrap">{suggestedContent}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suggested" className="mt-4">
            <div className="rounded-md border border-primary/20 bg-card p-4 max-h-96 overflow-y-auto">
              <Badge className="mb-3 bg-primary text-white">Fuente: IA</Badge>
              <p className="text-sm text-foreground whitespace-pre-wrap">{suggestedContent}</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onReject}>
            <X className="mr-2 h-4 w-4" />
            Rechazar
          </Button>
          <Button onClick={onAccept}>
            <Check className="mr-2 h-4 w-4" />
            Aceptar sugerencia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
