import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "María González",
    role: "Profesora de Primaria, España",
    content:
      "EduTwinIA ha transformado mi forma de enseñar. Mis estudiantes ahora tienen amigos por todo el mundo y están más motivados que nunca.",
    avatar: "/maria.jpg",
  },
  {
    name: "John Smith",
    role: "Profesor de Ciencias, Reino Unido",
    content:
      "Los proyectos colaborativos internacionales han dado vida a mis clases de ciencias. Es increíble ver a los estudiantes trabajar juntos a pesar de las distancias.",
    avatar: "/john.jpg",
  },
  {
    name: "Sophie Dubois",
    role: "Profesora de Idiomas, Francia",
    content:
      "Gracias a EduTwinIA, mis estudiantes practican idiomas en situaciones reales con compañeros de otros países. El progreso ha sido asombroso.",
    avatar: "/sophie.jpg",
  },
]

export function TeacherTestimonials() {
  return (
    <section className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-orange-950 mb-8">Testimonios de Docentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-orange-800">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-900">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}