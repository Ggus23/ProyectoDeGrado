import { Contact } from "../../components/Contact"
import { Footer } from "../../components/Footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-100">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Contact />
      </main>
      <Footer />
    </div>
  )
}