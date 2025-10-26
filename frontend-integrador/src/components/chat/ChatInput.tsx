"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Smile } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  conversationId: string
}

export function ChatInput({ onSendMessage, conversationId }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex items-end space-x-2">
        <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className="flex-1 min-h-[40px] resize-none"
          rows={1}
        />
        <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
          <Smile className="h-5 w-5 text-gray-500" />
        </Button>
        <Button
          type="submit"
          size="sm"
          className={`h-8 w-8 p-0 rounded-full ${
            message.trim() ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4 text-white" />
        </Button>
      </div>
    </form>
  )
}
