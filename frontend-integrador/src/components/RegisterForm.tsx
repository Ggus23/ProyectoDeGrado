"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, GraduationCap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ColegioInfo } from "@/types/types";

export default function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  // --- LÓGICA DEL PRIMER COMPONENTE ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    career: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState<string[]>([]);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "El nombre completo es requerido";
    if (!formData.email.trim()) newErrors.email = "El correo institucional es requerido";
    else if (!formData.email.includes("@") || !formData.email.includes(".edu"))
      newErrors.email = "Debe ser un correo institucional válido (.edu)";
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.career) newErrors.career = "Debe seleccionar una carrera";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    setErrorGlobal([]);

    // Registro en el backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: formData.fullName,
        email: formData.email,
        contrasena: formData.password,
        carrera: formData.career,
      }),
    });

    const responseAPI = await res.json();
    if (!res.ok) {
      setErrorGlobal([typeof responseAPI.message === "string" ? responseAPI.message : "Error desconocido"]);
      setIsLoading(false);
      return;
    }

    // Login automático con NextAuth
    const responseNextAuth = await signIn("credentials", {
      email: formData.email,
      contrasena: formData.password,
      redirect: false,
    });
    if (responseNextAuth?.error) {
      setErrorGlobal([responseNextAuth.error]);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    setIsLoading(false);
  };

  // --- RETURN DEL SEGUNDO COMPONENTE (DISEÑO) ---
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-[#B6B9F2] rounded-full flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-[#0D0D0D]">Crear Cuenta</CardTitle>
        <CardDescription className="text-gray-600">
          Regístrate para comenzar a usar el asistente pedagógico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`pl-10 ${errors.fullName ? "border-red-500" : ""}`}
              />
            </div>
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Institucional</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="career">Carrera</Label>
            <Select value={formData.career} onValueChange={(v) => handleInputChange("career", v)}>
              <SelectTrigger className={errors.career ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona tu carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ingenieria-sistemas">Ingeniería de Sistemas</SelectItem>
                <SelectItem value="ingenieria-software">Ingeniería de Software</SelectItem>
                <SelectItem value="ciencias-computacion">Ciencias de la Computación</SelectItem>
              </SelectContent>
            </Select>
            {errors.career && <p className="text-sm text-red-500">{errors.career}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
              />
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Repetir Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {errorGlobal.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>{errorGlobal.join(", ")}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#B6B9F2] hover:bg-[#a5a8f0] text-white font-medium py-2.5 transition-colors"
          >
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#B6B9F2] hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
