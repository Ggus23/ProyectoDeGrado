import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function TermsOfUse() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-orange-950">Términos de Uso</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-orange">
        <h2>1. Aceptación de los términos</h2>
        <p>
          Al acceder y utilizar EduTwinIA, usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con
          alguna parte de estos términos, no podrá utilizar nuestros servicios.
        </p>

        <h2>2. Cambios en los términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Su uso continuado de la plataforma
          después de dichos cambios constituye su aceptación de los nuevos términos.
        </p>

        <h2>3. Uso de la plataforma</h2>
        <p>
          Usted se compromete a utilizar EduTwinIA solo para fines legales y de una manera que no infrinja los derechos
          de otros usuarios o restrinja su uso de la plataforma.
        </p>

        <h2>4. Cuentas de usuario</h2>
        <p>
          Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Notifíquenos inmediatamente si
          sospecha cualquier uso no autorizado de su cuenta.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todo el contenido publicado en EduTwinIA está protegido por derechos de autor. No puede utilizar este
          contenido sin el permiso expreso del propietario.
        </p>
      </CardContent>
    </Card>
  )
}