"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";

export function UserProfile() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState({
    id_usuario: "",
    nombre: "",
    email: "",
    rol: "",
  });

  // Realizamos una solicitud para obtener el perfil actualizado cada vez que la sesión cambie
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session.user.id_usuario}`);
        
        if (response.ok) {
          const updatedProfile = await response.json();
          setProfile({
            id_usuario: updatedProfile.id_usuario.toString(),
            nombre: updatedProfile.nombre,
            email: updatedProfile.email,
            rol: updatedProfile.rol,
          });
        } else {
          console.error("Error al obtener el perfil");
        }
      }
    };

    fetchProfile();
  }, [session?.user]); // Vuelve a ejecutar la solicitud si cambia la sesión

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${profile.id_usuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: profile.id_usuario,
          nombre: profile.nombre,
          email: profile.email,
          rol: profile.rol,
        }),
      });

      if (response.ok) {
        console.log("Perfil actualizado con éxito");

        const updatedProfile = await response.json();
        setProfile({
          id_usuario: updatedProfile.id_usuario.toString(),
          nombre: updatedProfile.nombre,
          email: updatedProfile.email,
          rol: updatedProfile.rol,
        });

        // Actualiza la sesión con los nuevos datos
        await update({
          id_usuario: updatedProfile.id_usuario,
          nombre: updatedProfile.nombre,
          email: updatedProfile.email,
          rol: updatedProfile.rol,
        });

        console.log("Sesión actualizada con éxito");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el perfil", errorData);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  if (!session) {
    return <div>Cargando...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" alt={profile.nombre} />
              <AvatarFallback>{profile.nombre.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button type="button">Cambiar foto</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" value={profile.nombre} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="rol">Rol</Label>
              <Input id="rol" name="rol" value={profile.rol} onChange={handleChange} disabled />
            </div>
          </div>
          <Button type="submit">Guardar cambios</Button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline" className="flex items-center">
            <NextLink href="/projectsselect" className="flex items-center text-sm font-medium">
             Seleccionar un Proyecto
            </NextLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
