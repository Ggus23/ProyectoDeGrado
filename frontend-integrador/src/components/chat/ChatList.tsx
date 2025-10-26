"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users } from "lucide-react"

// Tipos para las conversaciones
interface User {
  id: string
  name: string
  avatar?: string
  initials: string
  status: "online" | "offline" | "away"
}

export interface Conversation {
  id: string
  type: "individual" | "group"
  name: string
  participants: User[]
  lastMessage: {
    text: string
    time: string
    sender: string
    read: boolean
  }
  unreadCount: number
}

// Datos estáticos para las conversaciones
const staticConversations: Conversation[] = [
  {
    id: "1",
    type: "individual",
    name: "Laura Sánchez",
    participants: [
      {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
        status: "online",
      },
    ],
    lastMessage: {
      text: "¿Cómo va el proyecto de clima?",
      time: "10:30",
      sender: "Laura Sánchez",
      read: false,
    },
    unreadCount: 2,
  },
  {
    id: "2",
    type: "group",
    name: "Equipo Coordinador",
    participants: [
      {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
        status: "online",
      },
      {
        id: "3",
        name: "Carlos Rodríguez",
        avatar: "/avatars/carlos.jpg",
        initials: "CR",
        status: "offline",
      },
      {
        id: "4",
        name: "Ana Martínez",
        avatar: "/avatars/ana.jpg",
        initials: "AM",
        status: "away",
      },
    ],
    lastMessage: {
      text: "Necesitamos revisar los avances para la próxima semana",
      time: "Ayer",
      sender: "Carlos Rodríguez",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "3",
    type: "individual",
    name: "Miguel Torres",
    participants: [
      {
        id: "5",
        name: "Miguel Torres",
        avatar: "/avatars/miguel.jpg",
        initials: "MT",
        status: "offline",
      },
    ],
    lastMessage: {
      text: "Te envié los datos que solicitaste",
      time: "Lun",
      sender: "Miguel Torres",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "4",
    type: "group",
    name: "Proyecto Clima Global",
    participants: [
      {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
        status: "online",
      },
      {
        id: "3",
        name: "Carlos Rodríguez",
        avatar: "/avatars/carlos.jpg",
        initials: "CR",
        status: "offline",
      },
      {
        id: "4",
        name: "Ana Martínez",
        avatar: "/avatars/ana.jpg",
        initials: "AM",
        status: "away",
      },
      {
        id: "5",
        name: "Miguel Torres",
        avatar: "/avatars/miguel.jpg",
        initials: "MT",
        status: "offline",
      },
      {
        id: "6",
        name: "Sofía López",
        avatar: "/avatars/sofia.jpg",
        initials: "SL",
        status: "online",
      },
    ],
    lastMessage: {
      text: "¿Alguien puede compartir los resultados de la encuesta?",
      time: "Dom",
      sender: "Ana Martínez",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "5",
    type: "individual",
    name: "Sofía López",
    participants: [
      {
        id: "6",
        name: "Sofía López",
        avatar: "/avatars/sofia.jpg",
        initials: "SL",
        status: "online",
      },
    ],
    lastMessage: {
      text: "Gracias por la ayuda con la presentación",
      time: "Vie",
      sender: "Tú",
      read: true,
    },
    unreadCount: 0,
  },
]

interface ChatListProps {
  onSelectConversation: (conversation: Conversation) => void
  selectedConversationId?: string
}

export function ChatList({ onSelectConversation, selectedConversationId }: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>(staticConversations)

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.participants.some((participant) =>
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Mensajes</h2>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Buscar conversaciones..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No se encontraron conversaciones</div>
        ) : (
          <ul>
            {filteredConversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`p-3 hover:bg-gray-100 cursor-pointer ${
                  selectedConversationId === conversation.id ? "bg-orange-50" : ""
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-center space-x-3">
                  {conversation.type === "individual" ? (
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.participants[0].avatar || "/placeholder.svg"}
                          alt={conversation.name}
                        />
                        <AvatarFallback>{conversation.participants[0].initials}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                          conversation.participants[0].status,
                        )}`}
                      ></span>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessage.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.sender !== "Tú" && `${conversation.lastMessage.sender}: `}
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-2 bg-orange-500">{conversation.unreadCount}</Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}