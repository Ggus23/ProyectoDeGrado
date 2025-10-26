"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail } from "lucide-react"

interface Usuario {
  id_usuario: number
  nombre: string
  email: string
  rol: string
}

interface Participant {
  id_usuario: number
  id_proyecto: number
  usuario: Usuario
  rol: string
}

export function ParticipantsManagement({ idProyecto }: { idProyecto: number }) {
  const [participants, setParticipants] = useState<Usuario[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Estudiante")

  useEffect(() => {
  const fetchParticipants = async () => {
    try {
      console.log('ID del proyecto:', idProyecto);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/participants/project/${idProyecto}`)
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${text}`);
      }
      const data = await response.json()

      if (Array.isArray(data)) {
        const usuarios = data.map((p: Participant) => p.usuario)
        setParticipants(usuarios)
      } else {
        console.error("La respuesta no es un array:", data)
        setParticipants([])
      }
    } catch (error) {
      console.error("Error al obtener participantes:", error)
      setParticipants([])
    }
  }

  fetchParticipants()
}, [idProyecto])
  const filteredParticipants = participants.filter((participant) =>
    participant.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      Coordinador: "bg-purple-100 text-purple-800",
      Profesor: "bg-blue-100 text-blue-800",
      Estudiante: "bg-green-100 text-green-800",
      Invitado: "bg-orange-100 text-orange-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Invitación enviada a:", inviteEmail, "con rol:", inviteRole)
    setInviteEmail("")
    setShowInviteForm(false)
  }

  const handleRoleChange = (participantId: number, newRole: string) => {
    console.log("Cambio de rol para usuario ID:", participantId, "Nuevo rol:", newRole)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-orange-50 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-orange-950">Participantes del Proyecto</CardTitle>
          <Button
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Agregar Participante
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {showInviteForm && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Invitar Nuevo Participante</h3>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="pl-10"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Profesor">Profesor</SelectItem>
                      <SelectItem value="Estudiante">Estudiante</SelectItem>
                      <SelectItem value="Invitado">Invitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Agregar
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar participantes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Participante</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Correo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id_usuario} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt={participant.nombre} />
                          <AvatarFallback>{participant.nombre.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.nombre}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{participant.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleBadgeColor(participant.rol)}>{participant.rol}</Badge>
                    </td>
            
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron participantes con esos criterios de búsqueda.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}