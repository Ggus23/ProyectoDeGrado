"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Calendar, CheckSquare, Users } from "lucide-react"

export function ProjectManagement() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Matemáticas Interactivas", progress: 75 },
    { id: 2, name: "Ciencias del Medio Ambiente", progress: 30 },
    { id: 3, name: "Literatura Comparada", progress: 50 },
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Proyectos</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Proyecto
        </Button>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="team">Equipo</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progreso: {project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <Button className="w-full mt-4">Ver Detalles</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4" />
                    <span>Preparar material para Matemáticas Interactivas</span>
                  </div>
                  <Button size="sm">Completar</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4" />
                    <span>Revisar informes de Ciencias del Medio Ambiente</span>
                  </div>
                  <Button size="sm">Completar</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4" />
                    <span>Coordinar reunión para Literatura Comparada</span>
                  </div>
                  <Button size="sm">Completar</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Reunión de Equipo: Matemáticas Interactivas (Mañana, 10:00)</span>
                  </div>
                  <Button size="sm">Agendar</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Presentación: Ciencias del Medio Ambiente (Viernes, 14:00)</span>
                  </div>
                  <Button size="sm">Agendar</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Taller: Literatura Comparada (Próxima semana, Lunes 11:00)</span>
                  </div>
                  <Button size="sm">Agendar</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Miembros del Equipo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>María González (Líder de Proyecto)</span>
                  </div>
                  <Button size="sm">Mensaje</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Carlos Rodríguez (Desarrollador de Contenido)</span>
                  </div>
                  <Button size="sm">Mensaje</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Ana Sánchez (Diseñadora Instruccional)</span>
                  </div>
                  <Button size="sm">Mensaje</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

