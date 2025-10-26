"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Save, Moon, Sun, User, Bell, Shield, Sparkles, Download, Upload, Globe, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/components/theme-provider"

export function SettingsContent() {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [autoApprove, setAutoApprove] = useState(false)
  const [confidenceThreshold, setConfidenceThreshold] = useState([85])
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas exitosamente.",
    })
  }

  const handleExport = () => {
    toast({
      title: "Exportación iniciada",
      description: "Tu PGF se está descargando...",
    })
  }

  const handleImport = () => {
    toast({
      title: "Importación exitosa",
      description: "El PGF ha sido importado correctamente.",
    })
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Configuración</h2>
        <p className="text-muted-foreground">Administra tu perfil, preferencias y configuración de IA</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Preferencias</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">IA</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Datos</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Seguridad</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
              <CardDescription>Actualiza tus datos personales y de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" defaultValue="Juan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" defaultValue="Pérez" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="juan.perez@unifranz.edu.bo" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input id="department" defaultValue="Ingeniería de Sistemas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Input id="specialty" defaultValue="Programación" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Input id="bio" placeholder="Cuéntanos sobre ti..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode" className="text-base">
                    Modo Oscuro
                  </Label>
                  <p className="text-sm text-muted-foreground">Activa el tema oscuro para reducir la fatiga visual</p>
                </div>
                <div className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Sun className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Switch id="darkMode" checked={theme === "dark"} onCheckedChange={toggleTheme} />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave" className="text-base">
                    Guardado Automático
                  </Label>
                  <p className="text-sm text-muted-foreground">Guarda automáticamente tus cambios mientras trabajas</p>
                </div>
                <Switch id="autoSave" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Idioma y Región</CardTitle>
              <CardDescription>Configura tu idioma y formato regional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="language">
                    <Globe className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select defaultValue="america-la-paz">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-la-paz">América/La Paz (GMT-4)</SelectItem>
                    <SelectItem value="america-buenos-aires">América/Buenos Aires (GMT-3)</SelectItem>
                    <SelectItem value="america-santiago">América/Santiago (GMT-3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings Tab */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asistencia de IA</CardTitle>
              <CardDescription>Configura cómo la IA te ayuda en la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="aiSuggestions" className="text-base">
                    Sugerencias Automáticas
                  </Label>
                  <p className="text-sm text-muted-foreground">Recibe sugerencias de IA mientras trabajas en tu PGF</p>
                </div>
                <Switch id="aiSuggestions" checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoApprove" className="text-base">
                    Aprobación Automática
                  </Label>
                  <p className="text-sm text-muted-foreground">Acepta automáticamente sugerencias con alta confianza</p>
                </div>
                <Switch id="autoApprove" checked={autoApprove} onCheckedChange={setAutoApprove} />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="confidence" className="text-base">
                      Umbral de Confianza
                    </Label>
                    <span className="text-sm font-semibold text-primary">{confidenceThreshold[0]}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nivel mínimo de confianza para mostrar sugerencias de IA
                  </p>
                </div>
                <Slider
                  id="confidence"
                  min={50}
                  max={100}
                  step={5}
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>50% (Más sugerencias)</span>
                  <span>100% (Solo alta confianza)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modelo de IA</CardTitle>
              <CardDescription>Selecciona el modelo de IA para generar contenido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiModel">Modelo</Label>
                <Select defaultValue="gpt4">
                  <SelectTrigger id="aiModel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4 (Recomendado)</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5 (Más rápido)</SelectItem>
                    <SelectItem value="claude">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="creativity">Nivel de Creatividad</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger id="creativity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservador</SelectItem>
                    <SelectItem value="balanced">Balanceado</SelectItem>
                    <SelectItem value="creative">Creativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Gestiona cómo y cuándo recibes notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="text-base">
                    Notificaciones Generales
                  </Label>
                  <p className="text-sm text-muted-foreground">Activa o desactiva todas las notificaciones</p>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotif" className="text-base">
                    Notificaciones por Email
                  </Label>
                  <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
                </div>
                <Switch id="emailNotif" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="aiNotif" className="text-base">
                    Sugerencias de IA
                  </Label>
                  <p className="text-sm text-muted-foreground">Notificaciones cuando la IA genera sugerencias</p>
                </div>
                <Switch id="aiNotif" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deadlineNotif" className="text-base">
                    Recordatorios de Plazos
                  </Label>
                  <p className="text-sm text-muted-foreground">Alertas sobre fechas límite importantes</p>
                </div>
                <Switch id="deadlineNotif" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exportar Datos</CardTitle>
              <CardDescription>Descarga tu PGF y recursos generados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exportFormat">Formato de Exportación</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="exportFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">Word (DOCX)</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleExport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar PGF Completo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importar Datos</CardTitle>
              <CardDescription>Carga un PGF existente desde un archivo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="importFile">Seleccionar Archivo</Label>
                <Input id="importFile" type="file" accept=".pdf,.docx,.json" />
              </div>

              <Button onClick={handleImport} variant="outline" className="w-full bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Importar PGF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Respaldo Automático</CardTitle>
              <CardDescription>Configura copias de seguridad automáticas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup" className="text-base">
                    Respaldo Automático
                  </Label>
                  <p className="text-sm text-muted-foreground">Crea copias de seguridad periódicas</p>
                </div>
                <Switch id="autoBackup" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Frecuencia</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backupFrequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Cada hora</SelectItem>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Actualizar Contraseña
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticación de Dos Factores</CardTitle>
              <CardDescription>Añade una capa extra de seguridad a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactor" className="text-base">
                    Activar 2FA
                  </Label>
                  <p className="text-sm text-muted-foreground">Requiere código de verificación al iniciar sesión</p>
                </div>
                <Switch id="twoFactor" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>Gestiona los dispositivos donde has iniciado sesión</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Windows - Chrome</p>
                    <p className="text-xs text-muted-foreground">Última actividad: Hace 5 minutos</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary text-white">
                    Actual
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">iPhone - Safari</p>
                    <p className="text-xs text-muted-foreground">Última actividad: Hace 2 horas</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Cerrar sesión
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Cerrar todas las sesiones
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
