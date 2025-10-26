"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, GraduationCap, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setIsLoading(true)

    const responseNextAuth = await signIn("credentials", {
      email,
      contrasena: password,
      redirect: false,
    })

    if (responseNextAuth?.error) {
      if (typeof responseNextAuth.error === "string") {
        setErrors(responseNextAuth.error.split(","))
      } else {
        setErrors(["Ocurrió un error al iniciar sesión"])
      }
      setIsLoading(false)
      return
    }

    await getSession()
    router.push("/UseProfileTeacher") // o "/dashboard" según tu flujo
    setIsLoading(false)
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-[#F28907] rounded-full flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-[#0D0D0D]">Asistente Pedagógico IA</CardTitle>
        <CardDescription className="text-gray-600">Inicia sesión para acceder a tu panel de control</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#0D0D0D] font-medium">
              Correo Electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu.correo@universidad.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 border-gray-200 focus:border-[#B6B9F2] focus:ring-[#B6B9F2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#0D0D0D] font-medium">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="contrasena"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 border-gray-200 focus:border-[#B6B9F2] focus:ring-[#B6B9F2]"
              />
            </div>
          </div>

          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>{errors.join(", ")}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-[#F28907] hover:bg-[#e07806] text-white font-medium py-2.5 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#F28907] hover:text-[#e07806] font-medium hover:underline transition-colors"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}