import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-orange-950 text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">EduTwinIA</h3>
            <p className="text-orange-300">Conectando docentes, creando futuro.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-orange-300 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-orange-300 transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-orange-300 transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-300 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-orange-300 transition-colors">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-300 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-orange-300 transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-300 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-orange-300 transition-colors">
                <Twitter />
              </a>
              <a href="#" className="hover:text-orange-300 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-orange-300 transition-colors">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-900 text-center">
          <p>&copy; 2023 EduTwinIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


