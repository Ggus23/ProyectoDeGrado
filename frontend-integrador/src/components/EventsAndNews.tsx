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
]

const news = [
  {
    title: "EduTwinIA lanza nueva función de colaboración en tiempo real",
    date: "1 de Agosto, 2023",
    description: "Nuestra plataforma ahora permite a los docentes colaborar en documentos en tiempo real.",
  },
  {
    title: "Estudio muestra mejora en resultados académicos con EduTwinIA",
    date: "15 de Julio, 2023",
    description:
      "Un estudio reciente revela que los estudiantes muestran una mejora significativa en sus calificaciones.",
  },
]

export function EventsAndNews() {
  return (
    <section className="py-16 bg-orange-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-950">Eventos y Noticias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-900">Próximos Eventos</h3>
            {events.map((event, index) => (
              <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
                <h4 className="text-xl font-semibold text-orange-800">{event.title}</h4>
                <p className="text-orange-600 mb-2">{event.date}</p>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <Button className="bg-orange-500 text-white hover:bg-orange-400">Registrarse</Button>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-900">Últimas Noticias</h3>
            {news.map((item, index) => (
              <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
                <h4 className="text-xl font-semibold text-orange-800">{item.title}</h4>
                <p className="text-orange-600 mb-2">{item.date}</p>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button variant="outline" className="bg-orange-500 text-white hover:bg-orange-400">
                  Leer más
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}