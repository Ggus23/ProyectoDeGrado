"use client"

import type React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, User, Mail, Lock, School, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
import { ColegioInfo } from "@/types/types";

export default function RegisterStudent() {
  const [commandValue, setCommandValue] = useState("");
  const [filteredColegios, setFilteredColegios] = useState<ColegioInfo[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [colegio, setColegio] = useState<string>("");
  const [contrasena, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rol, setRol] = useState<string>("");
  const [colegiosCochabamba, setColegiosCochabamba] = useState<ColegioInfo[]>([]);
  const [distrito, setDistrito] = useState<string>("");
  const [zona, setZona] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();
  const [openCombobox, setOpenCombobox] = useState(false);
  const selectedColegio = colegiosCochabamba.find(c => c.id === colegio);

  const fetchColegios = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json', 
      },
    });
  
    try {
      if (!res.ok) {
        const errorData = await res.json(); // Intenta obtener detalles del error del servidor
        const errorMessage = errorData?.message || `Error fetching colegios: ${res.status}`;
        throw new Error(errorMessage);
      }
      const data: ColegioInfo[] = await res.json();
      const processedData = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setColegiosCochabamba(processedData);
      setFilteredColegios(processedData); // Inicialmente, mostrar todos
    } catch (err) {
      console.error("Error fetching colegios:", err);
      if (err instanceof Error) {
        setError([err.message || "Error al cargar los colegios."]);
      } else {
        setError(["Error al cargar los colegios."]);
      }
    }
  };
  
  useEffect(() => {
    fetchColegios();
  }, []);

  useEffect(() => {
    const filtered = colegiosCochabamba.filter((c) => {
      const distritoMatch = !distrito || (c.distrito && c.distrito.toLowerCase().includes(distrito.toLowerCase()));
      const zonaMatch = !zona || (c.zona && c.zona.toLowerCase().includes(zona.toLowerCase()));
      const nombreMatch = c.nombre.toLowerCase().includes(commandValue.toLowerCase());

      return distritoMatch && zonaMatch && nombreMatch;
    });
    setFilteredColegios(filtered);
  }, [commandValue, colegiosCochabamba, distrito, zona]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
        setIsLoading(true);
        setError([]);
    
        if (contrasena !== confirmPassword) {
          setError(["Las contraseñas no coinciden."]);
          setIsLoading(false);
          return;
        }
    
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
            {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: name,
              email: email,
              colegio: selectedColegio?.nombre, // Usamos el nombre del colegio seleccionado
              contrasena: contrasena,
              rol: rol,
           }),
           }
         );
    const responseAPI = await res.json();

    if (!res.ok) {
      if (typeof responseAPI?.message === 'string') {
        setError([responseAPI.message]);
      } else if (Array.isArray(responseAPI?.message)) {
        setError(responseAPI.message);
      } else {
        setError(["Ocurrió un error desconocido."]);
      }
      setIsLoading(false);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      contrasena,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      if (typeof responseNextAuth?.error === 'string') {
        setError(responseNextAuth.error.split(","));
      } else {
        setError(["Ocurrió un error al iniciar sesión."]);
      }
      setIsLoading(false);
      return;
    }

    router.push("/loginstudent");
    setIsLoading(false);
  };


  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-6">
        <CardTitle className="text-2xl font-bold flex items-center justify-center">
          <UserPlus className="mr-2" /> Registro de Usuario Estudiante
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre completo
            </Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="pl-10 w-full"
                placeholder="Nombre completo"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="pl-10 w-full"
                placeholder="Correo electrónico"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol" className="text-sm font-medium text-gray-700">
              Rol
            </Label>
            <Input
              id="rol"
              name="rol"
              type="text"
              value={rol}
              onChange={(event) => setRol(event.target.value)}
              required
              className="w-full"
              placeholder="rol"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="distrito" className="text-sm font-medium text-gray-700">
              Distrito
            </Label>
            <Input
              id="distrito"
              name="distrito"
              value={distrito}
              onChange={(event) => setDistrito(event.target.value)}
              className="w-full"
              placeholder="Ej: Distrito Norte"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zona" className="text-sm font-medium text-gray-700">
              Zona
            </Label>
            <Input
              id="zona"
              name="zona"
              value={zona}
              onChange={(event) => setZona(event.target.value)}
              className="w-full"
              placeholder="Ej: Zona Escolar 12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school" className="text-sm font-medium text-gray-700">
              Colegio
            </Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className={cn(
                    "w-full justify-between pl-10",
                    openCombobox && "ring-ring-foreground ring-2"
                  )}
                >
                  {selectedColegio?.nombre || "Selecciona un colegio..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput
                    placeholder="Buscar colegio..."
                    value={commandValue}
                    onValueChange={setCommandValue}
                    className="focus-visible:ring-ring-foreground"
                  />
                  <CommandEmpty>No se encontraron colegios.</CommandEmpty>
                  <CommandGroup>
                    {filteredColegios.map((colegioItem) => (
                      <CommandItem
                        key={colegioItem.id}
                        value={colegioItem.nombre}
                        onSelect={(currentValue) => {
                          setColegio(colegioItem.id);
                          setCommandValue("");
                          setOpenCombobox(false);
                        }}
                      >
                        <School className="mr-2 h-4 w-4" />
                        <span>{colegioItem.nombre}</span>
                        {colegio === colegioItem.id && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                value={contrasena}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="pl-10 w-full"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar contraseña
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="pl-10 w-full"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          {error.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>{error.join(", ")}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w--4 animate-spin" />
                Registrando...
              </div>
            ) : (
              "Registrarse"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link href="/loginstudent" className="text-orange-600 hover:text-orange-800 font-medium">Inicia sesión</Link>
        </p>
      </CardFooter>
    </Card>
  );
}