import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Video } from "lucide-react"

export function ProfessionalDevelopment() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Desarrollo Profesional</h2>
      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Innovación Educativa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-100 mb-4">
                  Aprende sobre las últimas tendencias en innovación educativa y cómo implementarlas en tu aula.
                </p>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" /> Inscribirse
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tecnología en el Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-100 mb-4">
                  Descubre cómo integrar eficazmente la tecnología en tus clases para mejorar el aprendizaje.
                </p>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" /> Inscribirse
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Educación Inclusiva</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-100 mb-4">
                  Estrategias para crear un ambiente de aprendizaje inclusivo y accesible para todos los estudiantes.
                </p>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" /> Inscribirse
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="webinars">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Webinars</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Estrategias de Evaluación en Línea</span>
                  </div>
                  <Button size="sm">Registrarse</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Gamificación en la Educación</span>
                  </div>
                  <Button size="sm">Registrarse</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Mindfulness para Educadores</span>
                  </div>
                  <Button size="sm">Registrarse</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Recursos de Desarrollo Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Video: Mejores Prácticas en Educación a Distancia</span>
                  </div>
                  <Button size="sm">Ver</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>E-book: Guía del Educador Moderno</span>
                  </div>
                  <Button size="sm">Descargar</Button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Podcast: Innovadores en Educación</span>
                  </div>
                  <Button size="sm">Escuchar</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

