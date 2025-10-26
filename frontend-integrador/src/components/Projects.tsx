'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
  id_proyecto: number;
  nombre: string;
  descripcion: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
        if (!res.ok) {
          throw new Error("No se pudo cargar los proyectos");
        }
        const data = await res.json();
        console.log(data); // <-- revisa esto
        setProjects(data);
      } catch (err: any) {
        console.error("Error al obtener proyectos:", err);
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  const handleVerDetalles = () => {
    router.push("/registerestudent");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-orange-950">Proyectos</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id_proyecto}>
            <CardHeader>
              <CardTitle>{project.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{project.descripcion}</p>
              <Button onClick={handleVerDetalles}>Ver detalles</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
