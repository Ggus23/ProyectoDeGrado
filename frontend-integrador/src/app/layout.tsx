
import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { AuthProvider } from "@/components/auth-context"
import SessionAuthProvider from "@/contexts/SessionAuthProvider" // Ajusta la ruta al alias @ si lo configuras
import "./globals.css"
// Configuración de fuentes
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

// Metadata (puedes adaptar los valores del código 1 si prefieres)
export const metadata: Metadata = {
  title: "Asistente Pedagógico IA", // o "EduTwinIA" si prefieres el del código 1
  description: "Plataforma de asistencia pedagógica con inteligencia artificial para docentes universitarios",
  generator: "v0.app", // o "v0.dev"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className={inter.className}>
        <SessionAuthProvider>
          <AuthProvider>{children}</AuthProvider>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
