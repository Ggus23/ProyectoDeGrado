import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function CookiePolicy() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-orange-950">Política de Cookies</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-orange">
        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web.
        </p>

        <h2>2. Cómo utilizamos las cookies</h2>
        <p>
          Utilizamos cookies para mejorar su experiencia de navegación, analizar el uso del sitio y personalizar el
          contenido.
        </p>

        <h2>3. Tipos de cookies que utilizamos</h2>
        <ul>
          <li>Cookies esenciales: Necesarias para el funcionamiento básico del sitio.</li>
          <li>Cookies de rendimiento: Nos ayudan a entender cómo interactúa con el sitio.</li>
          <li>Cookies de funcionalidad: Permiten recordar sus preferencias.</li>
        </ul>

        <h2>4. Control de cookies</h2>
        <p>
          Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su
          computadora y puede configurar la mayoría de los navegadores para que no las acepten.
        </p>

        <h2>5. Cambios en nuestra política de cookies</h2>
        <p>
          Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta página.
        </p>
      </CardContent>
    </Card>
  )
}