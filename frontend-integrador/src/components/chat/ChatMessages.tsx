"use client"

import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Conversation } from "./ChatList"

// Tipos para los mensajes
export interface Message {
  id: string
  conversationId: string
  sender: {
    id: string
    name: string
    avatar?: string
    initials: string
  }
  text: string
  timestamp: string
  status: "sent" | "delivered" | "read"
  isOwn: boolean
}

// Datos estáticos para los mensajes
const staticMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "101",
      conversationId: "1",
      sender: {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
      },
      text: "Hola, ¿cómo estás?",
      timestamp: "10:15",
      status: "read",
      isOwn: false,
    },
    {
      id: "102",
      conversationId: "1",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "¡Hola Laura! Todo bien, trabajando en el proyecto.",
      timestamp: "10:17",
      status: "read",
      isOwn: true,
    },
    {
      id: "103",
      conversationId: "1",
      sender: {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
      },
      text: "¿Cómo va el proyecto de clima?",
      timestamp: "10:20",
      status: "read",
      isOwn: false,
    },
    {
      id: "104",
      conversationId: "1",
      sender: {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
      },
      text: "Necesito saber si podemos tener una reunión mañana para discutir los avances.",
      timestamp: "10:30",
      status: "delivered",
      isOwn: false,
    },
  ],
  "2": [
    {
      id: "201",
      conversationId: "2",
      sender: {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
      },
      text: "Bienvenidos al equipo coordinador del proyecto.",
      timestamp: "Ayer, 09:00",
      status: "read",
      isOwn: false,
    },
    {
      id: "202",
      conversationId: "2",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "Gracias Laura. Estoy emocionado de formar parte de este equipo.",
      timestamp: "Ayer, 09:15",
      status: "read",
      isOwn: true,
    },
    {
      id: "203",
      conversationId: "2",
      sender: {
        id: "3",
        name: "Carlos Rodríguez",
        avatar: "/avatars/carlos.jpg",
        initials: "CR",
      },
      text: "Necesitamos revisar los avances para la próxima semana",
      timestamp: "Ayer, 15:30",
      status: "read",
      isOwn: false,
    },
  ],
  "3": [
    {
      id: "301",
      conversationId: "3",
      sender: {
        id: "5",
        name: "Miguel Torres",
        avatar: "/avatars/miguel.jpg",
        initials: "MT",
      },
      text: "Hola, ¿podrías enviarme los datos del clima de tu región?",
      timestamp: "Lunes, 14:00",
      status: "read",
      isOwn: false,
    },
    {
      id: "302",
      conversationId: "3",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "Claro, te los envío esta tarde.",
      timestamp: "Lunes, 14:30",
      status: "read",
      isOwn: true,
    },
    {
      id: "303",
      conversationId: "3",
      sender: {
        id: "5",
        name: "Miguel Torres",
        avatar: "/avatars/miguel.jpg",
        initials: "MT",
      },
      text: "Te envié los datos que solicitaste",
      timestamp: "Lunes, 17:45",
      status: "read",
      isOwn: false,
    },
  ],
  "4": [
    {
      id: "401",
      conversationId: "4",
      sender: {
        id: "2",
        name: "Laura Sánchez",
        avatar: "/avatars/laura.jpg",
        initials: "LS",
      },
      text: "Bienvenidos al grupo del Proyecto Clima Global.",
      timestamp: "Domingo, 10:00",
      status: "read",
      isOwn: false,
    },
    {
      id: "402",
      conversationId: "4",
      sender: {
        id: "3",
        name: "Carlos Rodríguez",
        avatar: "/avatars/carlos.jpg",
        initials: "CR",
      },
      text: "Hola a todos, estoy emocionado de trabajar en este proyecto.",
      timestamp: "Domingo, 10:15",
      status: "read",
      isOwn: false,
    },
    {
      id: "403",
      conversationId: "4",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "Yo también estoy muy entusiasmado. Tengo varias ideas para compartir.",
      timestamp: "Domingo, 10:30",
      status: "read",
      isOwn: true,
    },
    {
      id: "404",
      conversationId: "4",
      sender: {
        id: "4",
        name: "Ana Martínez",
        avatar: "/avatars/ana.jpg",
        initials: "AM",
      },
      text: "¿Alguien puede compartir los resultados de la encuesta?",
      timestamp: "Domingo, 15:45",
      status: "read",
      isOwn: false,
    },
  ],
  "5": [
    {
      id: "501",
      conversationId: "5",
      sender: {
        id: "6",
        name: "Sofía López",
        avatar: "/avatars/sofia.jpg",
        initials: "SL",
      },
      text: "Hola, ¿podrías ayudarme con la presentación para el proyecto?",
      timestamp: "Viernes, 11:00",
      status: "read",
      isOwn: false,
    },
    {
      id: "502",
      conversationId: "5",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "Claro, puedo ayudarte. ¿Qué necesitas específicamente?",
      timestamp: "Viernes, 11:15",
      status: "read",
      isOwn: true,
    },
    {
      id: "503",
      conversationId: "5",
      sender: {
        id: "6",
        name: "Sofía López",
        avatar: "/avatars/sofia.jpg",
        initials: "SL",
      },
      text: "Necesito ayuda con los gráficos de datos climáticos.",
      timestamp: "Viernes, 11:30",
      status: "read",
      isOwn: false,
    },
    {
      id: "504",
      conversationId: "5",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "Te enviaré algunos ejemplos y podemos trabajar juntos en ello.",
      timestamp: "Viernes, 12:00",
      status: "read",
      isOwn: true,
    },
    {
      id: "505",
      conversationId: "5",
      sender: {
        id: "1",
        name: "Tú",
        initials: "TÚ",
      },
      text: "Gracias por la ayuda con la presentación",
      timestamp: "Viernes, 17:30",
      status: "delivered",
      isOwn: true,
    },
  ],
}

interface ChatMessagesProps {
  conversation: Conversation
}

export function ChatMessages({ conversation }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messages = staticMessages[conversation.id] || []

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (timestamp: string) => {
    if (timestamp.includes(",")) {
      return timestamp
    }
    return timestamp
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"} items-end space-x-2`}>
          {!message.isOwn && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
              <AvatarFallback>{message.sender.initials}</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.isOwn ? "bg-orange-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            {!message.isOwn && conversation.type === "group" && (
              <p className="text-xs font-medium mb-1">{message.sender.name}</p>
            )}
            <p>{message.text}</p>
            <div className={`text-xs mt-1 ${message.isOwn ? "text-orange-100" : "text-gray-500"} text-right`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
