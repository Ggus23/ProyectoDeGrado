"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChatList, type Conversation } from "./ChatList"
import { ChatMessages } from "./ChatMessages"
import { ChatInput } from "./ChatInput"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Phone, Video, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Chat() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  const handleSendMessage = (message: string) => {
    console.log("Mensaje enviado:", message, "a la conversación:", selectedConversation?.id)
    // En una implementación real, aquí enviaríamos el mensaje a través de una API
    // y actualizaríamos el estado con el nuevo mensaje
  }

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
    <Card className="h-[calc(100vh-200px)] flex overflow-hidden">
      <div className="w-1/3 border-r">
        <ChatList onSelectConversation={setSelectedConversation} selectedConversationId={selectedConversation?.id} />
      </div>
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          <div className="p-3 border-b flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {selectedConversation.type === "individual" ? (
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={selectedConversation.participants[0].avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>{selectedConversation.participants[0].initials}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                      selectedConversation.participants[0].status,
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
              <div>
                <h3 className="font-medium">{selectedConversation.name}</h3>
                {selectedConversation.type === "individual" ? (
                  <p className="text-xs text-gray-500">
                    {selectedConversation.participants[0].status === "online"
                      ? "En línea"
                      : selectedConversation.participants[0].status === "away"
                        ? "Ausente"
                        : "Desconectado"}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">{selectedConversation.participants.length} participantes</p>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <Phone className="h-4 w-4 text-gray-500" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <Video className="h-4 w-4 text-gray-500" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
          <ChatMessages conversation={selectedConversation} />
          <ChatInput onSendMessage={handleSendMessage} conversationId={selectedConversation.id} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="mx-auto h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tus mensajes</h3>
            <p className="text-gray-500 max-w-md">
              Selecciona una conversación para ver los mensajes o inicia una nueva conversación con otros participantes
              del proyecto.
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}