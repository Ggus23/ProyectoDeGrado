"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus } from "lucide-react"

export function SearchAndConnect() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "María González", role: "Profesora de Ciencias", location: "La Paz, Bolivia" },
    { id: 2, name: "Carlos Rodríguez", role: "Director de Escuela", location: "Santa Cruz, Bolivia" },
    { id: 3, name: "Ana Sánchez", role: "Bibliotecaria", location: "Cochabamba, Bolivia" },
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para buscar usuarios
    console.log("Buscando:", searchTerm)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Búsqueda y Conexión</h2>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Buscar educadores, escuelas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="role">Rol</SelectItem>
            <SelectItem value="location">Ubicación</SelectItem>
            <SelectItem value="specialty">Especialidad</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center space-x-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/placeholder-user-${user.id}.jpg`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-100">{user.role}</p>
                <p className="text-sm text-gray-100">{user.location}</p>
              </div>
              <Button size="sm" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" /> Conectar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

