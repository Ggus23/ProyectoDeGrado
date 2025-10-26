import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function PrivacyPolicy() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-orange-950">Política de Privacidad</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-orange">
        <h2>1. Información que recopilamos</h2>
        <p>
          Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo
          electrónico y datos de perfil.
        </p>

        <h2>2. Cómo utilizamos su información</h2>
        <p>
          Utilizamos su información para proporcionar, mantener y mejorar nuestros servicios, así como para comunicarnos
          con usted sobre actualizaciones y nuevas características.
        </p>

        <h2>3. Compartir información</h2>
        <p>
          No vendemos ni compartimos su información personal con terceros, excepto según lo requerido por la ley o con
          su consentimiento explícito.
        </p>

        <h2>4. Seguridad de los datos</h2>
        <p>
          Implementamos medidas de seguridad diseñadas para proteger su información personal contra acceso no autorizado
          y uso indebido.
        </p>

        <h2>5. Sus derechos</h2>
        <p>
          Usted tiene derecho a acceder, corregir o eliminar su información personal. Contáctenos si desea ejercer estos
          derechos.
        </p>
      </CardContent>
    </Card>
  )
}