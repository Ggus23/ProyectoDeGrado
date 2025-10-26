"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function UploadContent() {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "PGF cargado exitosamente",
        description: "El documento ha sido procesado y está listo para generar recursos.",
      })
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Cargar Plan Global de Formación</h2>
        <p className="text-muted-foreground">
          Sube tu documento PGF en formato PDF o Word para comenzar a generar recursos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del PGF</CardTitle>
          <CardDescription>Completa los datos del documento que vas a cargar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Materia</Label>
              <Input id="subject" placeholder="Ej: Programación Orientada a Objetos" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semestre</Label>
              <Input id="semester" placeholder="Ej: 3er Semestre" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea id="description" placeholder="Breve descripción del contenido del PGF..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Documento PGF</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                />
              </div>
              {fileName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 text-foreground" />
                  <span>{fileName}</span>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex gap-3">
                <Upload className="h-5 w-5 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Formatos aceptados</p>
                  <p className="text-xs text-muted-foreground">PDF, Word (.doc, .docx) - Tamaño máximo: 10MB</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando documento...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Cargar PGF
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
