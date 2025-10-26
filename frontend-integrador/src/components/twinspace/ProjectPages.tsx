"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Eye, Trash2, FileText, ImageIcon, Video } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Static data for project pages
const projectPages = [
  {
    id: 1,
    title: "Introducción al Proyecto",
    description: "Página de bienvenida con los objetivos y la metodología del proyecto.",
    type: "texto",
    author: "Laura Sánchez",
    lastUpdated: "2023-10-15",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Clima en Europa",
    description: "Análisis de los diferentes climas europeos y su impacto en la vida cotidiana.",
    type: "texto",
    author: "Carlos Rodríguez",
    lastUpdated: "2023-10-12",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Galería de Fotos: Nuestro Entorno",
    description: "Colección de fotografías del entorno natural de cada escuela participante.",
    type: "galería",
    author: "Ana Martínez",
    lastUpdated: "2023-10-10",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Video: Entrevistas sobre el Cambio Climático",
    description: "Entrevistas a expertos locales sobre el impacto del cambio climático.",
    type: "video",
    author: "Miguel Torres",
    lastUpdated: "2023-10-08",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Datos Meteorológicos Comparativos",
    description: "Tablas y gráficos comparando datos meteorológicos de diferentes regiones.",
    type: "texto",
    author: "Sofía López",
    lastUpdated: "2023-10-05",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Propuestas de Acción Climática",
    description: "Ideas y propuestas para combatir el cambio climático desde las escuelas.",
    type: "texto",
    author: "Juan Pérez",
    lastUpdated: "2023-10-03",
    preview: "/placeholder.svg?height=200&width=300",
  },
]

export function ProjectPages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<number | null>(null)

  const filteredPages = projectPages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPageTypeIcon = (type: string) => {
    switch (type) {
      case "texto":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "galería":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getPageTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      texto: "bg-blue-100 text-blue-800",
      galería: "bg-green-100 text-green-800",
      video: "bg-red-100 text-red-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const handleDeletePage = (id: number) => {
    // In a real app, this would delete the page
    console.log("Eliminando página con ID:", id)
    setShowDeleteDialog(false)
    setPageToDelete(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-orange-50 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-orange-950">Páginas del Proyecto</CardTitle>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Crear Nueva Página
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar páginas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <Card key={page.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={page.preview || "/placeholder.svg"}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-2 right-2 ${getPageTypeBadge(page.type)}`}>
                    <span className="flex items-center">
                      {getPageTypeIcon(page.type)}
                      <span className="ml-1 capitalize">{page.type}</span>
                    </span>
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{page.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{page.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>Por: {page.author}</span>
                    <span>Actualizado: {new Date(page.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-1 h-4 w-4" /> Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="mr-1 h-4 w-4" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setPageToDelete(page.id)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron páginas con esos criterios de búsqueda.</p>
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Crear Nueva Página
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro de que deseas eliminar esta página? Esta acción no se puede deshacer.</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => pageToDelete !== null && handleDeletePage(pageToDelete)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
