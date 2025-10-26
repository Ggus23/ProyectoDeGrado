'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Teacher {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: string;
}

export function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profesores`,
        {
          method: "GET",
        }
      );
      const data = await res.json()
        setTeachers(data)
      } catch (error) {
        console.error("Error al obtener los profesores:", error)
      }
    }

    fetchTeachers()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-orange-950 mb-8">Nuestros Docentes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id_usuario} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`/avatars/${teacher.id_usuario}.jpg`} alt={teacher.nombre} />
                  <AvatarFallback>{teacher.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-semibold text-orange-800">{teacher.nombre}</CardTitle>
                  <p className="text-sm text-gray-600">{teacher.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 mb-4">Docente registrado en la plataforma.</p>
              <Button variant="outline" className="w-full">
                Ver perfil
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}