import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const events = [
  {
    title: "Conferencia Anual de Educación Digital",
    date: "15 de Septiembre, 2023",
    description: "Únete a expertos en educación digital para explorar las últimas tendencias y herramientas.",
  },
  {
    title: "Taller: Inteligencia Artificial en el Aula",
    date: "3 de Octubre, 2023",
    description: "Aprende cómo integrar la IA en tus clases para mejorar el aprendizaje de los estudiantes.",
  },
  {
    title: "Webinar: Educación Inclusiva",
    date: "20 de Octubre, 2023",
    description: "Descubre estrategias para crear un ambiente de aprendizaje inclusivo y accesible para todos.",
  },
]

export function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-orange-950 mb-8">Próximos Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-orange-100">
              <CardTitle className="text-xl font-semibold text-orange-950">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-orange-600 font-medium mb-2">{event.date}</p>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Más información</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
