import { About } from "../../components/About"
import { Footer } from "../../components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  )
}