"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter, GitBranch, Eye } from "lucide-react"
import { mockHistory } from "@/lib/mock"
import { AIProvenanceTag } from "@/components/ai/ai-provenance-tag"
import { AIDiffDialog } from "@/components/ai/ai-diff-dialog"

export function HistoryContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDiffDialog, setShowDiffDialog] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<(typeof mockHistory)[0] | null>(null)

  const filteredData = mockHistory.filter((item) => {
    const matchesSearch =
      item.changes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleViewDiff = (version: (typeof mockHistory)[0]) => {
    setSelectedVersion(version)
    setShowDiffDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-primary text-white"
      case "reviewing":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprobado"
      case "reviewing":
        return "En revisión"
      case "draft":
        return "Borrador"
      default:
        return status
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Historial de Versiones</h2>
        <p className="text-muted-foreground">Control de versiones y trazabilidad de cambios en el PGF</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Versiones del PGF
          </CardTitle>
          <CardDescription>Total de {mockHistory.length} versiones registradas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cambios o autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="approved">Aprobados</SelectItem>
                <SelectItem value="reviewing">En revisión</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredData.length > 0 ? (
              filteredData.map((version, index) => (
                <div
                  key={version.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      v{version.version}
                    </div>
                    {index < filteredData.length - 1 && <div className="w-0.5 h-8 bg-border" />}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">Versión {version.version}</h4>
                          <AIProvenanceTag source={version.source} />
                          <Badge className={getStatusColor(version.status)} variant="secondary">
                            {getStatusLabel(version.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground">{version.changes}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {version.author} • {version.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => handleViewDiff(version)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver cambios
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No se encontraron versiones</div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedVersion && (
        <AIDiffDialog
          open={showDiffDialog}
          onOpenChange={setShowDiffDialog}
          title={`Versión ${selectedVersion.version} - ${selectedVersion.changes}`}
          originalContent="Contenido original de la sección del PGF antes de los cambios realizados en esta versión."
          suggestedContent={`Contenido modificado:\n\n${selectedVersion.changes}\n\nAutor: ${selectedVersion.author}\nFecha: ${selectedVersion.date}\nFuente: ${selectedVersion.source === "human" ? "Humano" : selectedVersion.source === "ai" ? "IA" : "Híbrido"}`}
          onAccept={() => {
            console.log("[v0] Accepted version", selectedVersion.version)
            setShowDiffDialog(false)
          }}
          onReject={() => {
            console.log("[v0] Rejected version", selectedVersion.version)
            setShowDiffDialog(false)
          }}
        />
      )}
    </div>
  )
}
