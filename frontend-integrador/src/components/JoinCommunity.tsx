import { Button } from "@/components/ui/button"
import Link from "next/link"

export function JoinCommunity() {
  return (
    <section className="py-12 bg-orange-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-orange-950 mb-4">Únete a Nuestra Comunidad</h2>
        <p className="text-xl text-white mb-8">
          Conéctate con educadores de todo el mundo, comparte ideas y crea proyectos innovadores.
        </p>
        <div className="space-x-4">
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
            <Link href="/register">Registrarse</Link>
          </Button>
          <Button asChild variant="outline" className="bg-white text-orange-500 hover:bg-orange-50">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}