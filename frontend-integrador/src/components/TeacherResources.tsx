import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText } from "lucide-react"

const resources = [
  {
    title: "Guía de Inicio Rápido",
    description: "Aprende los fundamentos para crear tu primer proyecto educativo.",
    icon: BookOpen,
    link: "/resources/quick-start-guide",
  },
  {
    title: "Seminarios Web",
    description: "Participa en nuestros seminarios web mensuales sobre innovación educativa.",
    icon: Video,
    link: "/resources/webinars",
  },
  {
    title: "Kit de Herramientas",
    description: "Descarga nuestro kit completo con plantillas y recursos para tus proyectos.",
    icon: FileText,
    link: "/resources/toolkit",
  },
]

export function TeacherResources() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-orange-950 mb-8">Recursos para Docentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-orange-950">
                  <resource.icon className="mr-2 h-6 w-6" />
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">{resource.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={resource.link}>Acceder</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
