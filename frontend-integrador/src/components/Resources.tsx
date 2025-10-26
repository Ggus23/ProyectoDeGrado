import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, Headphones } from "lucide-react"

export function Resources() {
  const resources = [
    {
      title: "Guías de Estudio",
      icon: FileText,
      description: "Colección de guías de estudio para diferentes materias.",
    },
    { title: "Videotutoriales", icon: Video, description: "Videos explicativos sobre temas complejos." },
    { title: "Podcasts Educativos", icon: Headphones, description: "Podcasts sobre diversos temas educativos." },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-orange-950">Recursos Educativos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <resource.icon className="mr-2" />
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{resource.description}</p>
              <Button>Explorar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
