// components/FeaturedProjects.tsx
"use client";
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Proyecto {
  id_proyecto: number
  nombre: string
  descripcion: string
  categoria: {
    id_categoria: number
    nombre: string
  }
  usuario: {
    id_usuario: number
    nombre: string
  }
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Proyecto[]>([])

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/recientes`);
      const data = await res.json();
      console.log("Proyectos recibidos:", data);

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Respuesta inesperada del backend:", data);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      setProjects([]);
    }
  };

  fetchProjects();
}, []);

  return (
    <section className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-orange-950 mb-8">Proyectos Nuevos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id_proyecto}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-orange-950">
                  {project.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-100 mb-2">Creado por: {project.usuario?.nombre || 'Desconocido'}</p>
                <p className="text-gray-100 mb-2">Categoría: {project.categoria?.nombre || 'Sin categoría'}</p>
                <p className="text-orange-950 mb-4">{project.descripcion}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={`/twinspace/dashboard/${project.id_proyecto}`}>Más información</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}