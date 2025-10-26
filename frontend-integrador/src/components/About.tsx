import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-orange-950 mb-8">Sobre EduTwinIA</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-800">Nuestra Misión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              En EduTwinIA, nuestra misión es conectar educadores de todo el mundo, fomentando la colaboración y el
              intercambio de ideas innovadoras. Buscamos transformar la educación a través de la tecnología y la
              cooperación internacional.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-800">Nuestra Visión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Imaginamos un futuro donde las fronteras no limiten el aprendizaje, donde cada aula esté conectada
              globalmente, y donde la inteligencia artificial potencie la creatividad y el pensamiento crítico de
              estudiantes y docentes por igual.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-800">Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Innovación en la educación</li>
              <li>Colaboración global</li>
              <li>Inclusividad y diversidad</li>
              <li>Aprendizaje continuo</li>
              <li>Ética en el uso de la tecnología</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-800">Nuestro Impacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Desde nuestro lanzamiento, EduTwinIA ha conectado a más de 1000 educadores de 10 países diferentes,
              facilitando más de 100 proyectos colaborativos internacionales y mejorando la experiencia educativa de
              más de 1000 estudiantes en todo el mundo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
