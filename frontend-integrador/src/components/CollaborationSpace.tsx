import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"

export function CollaborationSpace() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Espacio de Colaboración</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Proyecto
        </Button>
      </div>
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="forums">Foros</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="meetings">Reuniones</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Mis Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Proyecto de Matemáticas Interactivas</span>
                  <Button size="sm">Ver detalles</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Colaboración Internacional en Literatura</span>
                  <Button size="sm">Ver detalles</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Ciencias del Medio Ambiente: Estudio Global</span>
                  <Button size="sm">Ver detalles</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Other TabsContent components for forums, resources, and meetings */}
      </Tabs>
    </div>
  )
}

