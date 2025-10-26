import { Book, Video, MessageSquare, Brain } from "lucide-react"

const benefits = [
  {
    icon: <Book className="h-12 w-12 text-orange-500" />,
    title: "Proyectos Colaborativos",
    description: "Crea y participa en proyectos educativos innovadores con colegas de todo el mundo.",
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-orange-500" />,
    title: "TwinSpace",
    description: "Comparte recursos, experiencias y mejores prácticas en un espacio virtual dedicado.",
  },
  {
    icon: <Video className="h-12 w-12 text-orange-500" />,
    title: "Videoconferencias",
    description: "Conecta en tiempo real con otros educadores a través de nuestras herramientas de videoconferencia.",
  },
  {
    icon: <Brain className="h-12 w-12 text-orange-500" />,
    title: "Asistente IA",
    description: "Optimiza tu planificación docente con nuestro asistente de inteligencia artificial.",
  },
]

export function Benefits() {
  return (
    <section className="py-16 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-950">Beneficios de Nuestra Plataforma</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-900 text-center">{benefit.title}</h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}