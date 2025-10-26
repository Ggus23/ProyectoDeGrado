import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-orange-950 to-orange-800 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Conectando Docentes, Creando Futuro</h1>
          <p className="text-xl mb-8">Únete a nuestra comunidad de educadores innovadores y transforma la enseñanza.</p>
          <Button className="bg-orange-500 text-white text-lg px-8 py-3 rounded-full hover:bg-orange-400 transition-colors">
            <Link href="/login">Unete Ahora</Link>
          </Button>
        </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                src="/placeholder.jpg"
                alt="Docentes colaborando"
                className="rounded-lg shadow-lg w-50 h-50 object-cover" // Tamaño de 8rem (128px) de ancho y alto
                />
            </div>
      </div>
    </section>
  )
}