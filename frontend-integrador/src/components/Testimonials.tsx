"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Profesora de Primaria",
    content:
      "EduTwinIA ha transformado mi forma de enseñar. Los proyectos colaborativos han abierto un mundo de posibilidades para mis alumnos.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Profesor de Secundaria",
    content:
      "El asistente de IA para la planificación docente me ha ahorrado horas de trabajo. ¡Es una herramienta increíble!",
  },
  {
    name: "Ana Martínez",
    role: "Directora de Escuela",
    content:
      "Nuestra escuela ha visto un aumento significativo en la participación de los estudiantes desde que comenzamos a usar EduTwinIA.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-orange-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros docentes</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-xl italic mb-4">"{testimonials[currentIndex].content}"</p>
            <p className="font-semibold">{testimonials[currentIndex].name}</p>
            <p className="text-orange-300">{testimonials[currentIndex].role}</p>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-800 p-2 rounded-full hover:bg-orange-700 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-800 p-2 rounded-full hover:bg-orange-700 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}