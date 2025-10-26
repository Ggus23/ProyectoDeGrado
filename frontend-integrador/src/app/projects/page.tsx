import { Projects } from "../../components/Projects"
import { Footer } from "../../components/Footer"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Projects />
      </main>
      <Footer />
    </div>
  )
}