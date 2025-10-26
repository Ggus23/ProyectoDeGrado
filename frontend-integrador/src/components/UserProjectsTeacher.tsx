'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Project {
  id_usuario: number;
  id_proyecto: number;
  nombre: string;
  descripcion: string;
  categoria: {
    id_categoria: number
    nombre: string
  }
}

export function UserProjectsTeacher() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();


  useEffect(() => {
  const fetchProjects = async () => {
    if (!session?.user?.id_usuario) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/usuario/${session.user.id_usuario}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("No se pudo cargar los proyectos");
      }
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      console.error("Error al obtener proyectos:", err);
      setError(err.message);
    }
  };

  fetchProjects();
}, [session]);

  const handleRegisterStudent = () => {
    router.push("/registerestudent");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-orange-950">Mis Proyectos</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id_proyecto}>
            <CardHeader>
              <CardTitle>{project.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{project.descripcion}</p>
              <p className="mb-4">{project.categoria?.nombre}</p>
              <div className="flex gap-5">
                <Button onClick={() => router.push(`/twinspace/dashboard/${project.id_proyecto}`)}>
                  Ver detalles
                </Button>
                <Button onClick={handleRegisterStudent}>Registrar Estudiante</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <br />
    </div>
  );
}