"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash, Users, Calendar } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para proyectos
const myProjects = [
  {
    id: "1",
    title: "Matemáticas Interactivas",
    description:
      "Un proyecto innovador para enseñar matemáticas de forma interactiva a través de juegos y actividades colaborativas.",
    category: "matematicas",
    role: "Creador",
    members: 12,
    status: "activo",
    lastUpdated: "2023-10-15",
  },
  {
    id: "2",
    title: "Ciencias del Medio Ambiente",
    description: "Estudio global sobre el cambio climático y sus efectos en diferentes regiones del mundo.",
    category: "ciencias",
    role: "Colaborador",
    members: 24,
    status: "activo",
    lastUpdated: "2023-09-28",
  },
  {
    id: "3",
    title: "Literatura Comparada",
    description: "Análisis comparativo de obras literarias de diferentes culturas y épocas.",
    category: "literatura",
    role: "Creador",
    members: 8,
    status: "completado",
    lastUpdated: "2023-06-10",
  },
]

const collaborationProjects = [
  {
    id: "4",
    title: "Historia Global",
    description: "Exploración de eventos históricos desde diferentes perspectivas culturales.",
    category: "historia",
    role: "Colaborador",
    members: 18,
    status: "activo",
    lastUpdated: "2023-10-05",
  },
  {
    id: "5",
    title: "Arte Digital Colaborativo",
    description: "Creación de obras de arte digitales en colaboración con estudiantes de todo el mundo.",
    category: "arte",
    role: "Colaborador",
    members: 15,
    status: "activo",
    lastUpdated: "2023-09-12",
  },
]

export function UserProjects() {
  const [activeTab, setActiveTab] = useState("created")

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      matematicas: "bg-blue-100 text-blue-800",
      ciencias: "bg-green-100 text-green-800",
      literatura: "bg-purple-100 text-purple-800",
      historia: "bg-amber-100 text-amber-800",
      arte: "bg-pink-100 text-pink-800",
      tecnologia: "bg-indigo-100 text-indigo-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      activo: "bg-green-100 text-green-800",
      completado: "bg-blue-100 text-blue-800",
      pausado: "bg-amber-100 text-amber-800",
      cancelado: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-orange-950 mb-8">Mis Proyectos</h1>

      <Tabs defaultValue="created" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="created">Proyectos Creados</TabsTrigger>
          <TabsTrigger value="collaborating">Colaboraciones</TabsTrigger>
        </TabsList>

        <TabsContent value="created">
          <div className="grid grid-cols-1 gap-6">
            {myProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="bg-orange-50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold text-orange-800">{project.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className={getCategoryColor(project.category)}>
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{project.members} miembros</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Actualizado: {new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {myProjects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Aún no has creado ningún proyecto.</p>
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/create-project">Crear mi primer proyecto</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="collaborating">
          <div className="grid grid-cols-1 gap-6">
            {collaborationProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="bg-orange-50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold text-orange-800">{project.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className={getCategoryColor(project.category)}>
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                        <Badge className="bg-orange-100 text-orange-800">{project.role}</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{project.members} miembros</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Actualizado: {new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {collaborationProjects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No estás colaborando en ningún proyecto actualmente.</p>
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/projects">Explorar proyectos</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}