"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")

    // Aquí iría la lógica para enviar los datos al servidor
    console.log("Datos de solicitud de soporte:", formData)
    // Simulación de envío:
    setTimeout(() => {
      // Simular éxito (en una implementación real, esto dependería de la respuesta del servidor)
      setStatus("success")
      // Resetear el formulario después de un envío exitoso
      setFormData({ name: "", email: "", subject: "", category: "", message: "" })
    }, 1000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Solicitar Soporte</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Categoría</Label>
              <Select onValueChange={handleSelectChange} value={formData.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Problema técnico</SelectItem>
                  <SelectItem value="account">Cuenta de usuario</SelectItem>
                  <SelectItem value="billing">Facturación</SelectItem>
                  <SelectItem value="feature">Sugerencia de funcionalidad</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>
          </div>
          {status === "success" && (
            <Alert className="mt-4">
              <AlertDescription>
                Tu solicitud de soporte ha sido enviada con éxito. Te contactaremos pronto.
              </AlertDescription>
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4">
            Enviar Solicitud
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

