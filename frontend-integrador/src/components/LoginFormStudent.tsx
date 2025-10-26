"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, Mail, Lock, Loader2 } from "lucide-react"
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginFormStudent() {
    const [formData, setFormData] = useState({
        email: "",
        contrasena: "",
    });
    const [error, setError] = useState<string[]>([]); // Cambiado a string[]
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]); // Inicializa como un array vacío
        setIsLoading(true);

        const responseNextAuth = await signIn("credentials", {
            email: formData.email,
            contrasena: formData.contrasena,
            redirect: false,
        });
        console.log(responseNextAuth)
        if (responseNextAuth?.error) {
            if (typeof responseNextAuth?.error === 'string') {
                setError(responseNextAuth.error.split(","));
            } else {
                setError(["an error occurred during sign in"]);
            }
            setIsLoading(false);
            return;
        }
        const session = await getSession();
        console.log(session);
       /*  if (session?.accessToken) {
            localStorage.setItem("token", session.accessToken);
        } */

        router.push("/UseProfileStudent"); // Redirige a la página de perfil del profesor
        setIsLoading(false);
    };
    return (
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-6">
                <CardTitle className="text-2xl font-bold flex items-center justify-center">
                    <LogIn className="mr-2" /> Iniciar Sesión Estudiante
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Correo electrónico
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="pl-10 w-full"
                                placeholder="email"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contrasena_hasheada" className="text-sm font-medium text-gray-700">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="contrasena"
                                name="contrasena"
                                type="password"
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                                className="pl-10 w-full"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w--4 animate-spin" />
                                Iniciando sesión...
                            </div>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6 flex flex-col items-center space-y-2">
                <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-800">
                    ¿Olvidaste tu contraseña?
                </Link>
                <p className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/register" className="text-orange-600 hover:text-orange-800 font-medium">
                        Regístrate
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}