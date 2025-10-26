import { Footer } from "../../components/Footer"
import { Projectsselect } from "../../components/Projectsselect"

export default function MyProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <Projectsselect />
      </main>
      <Footer />
    </div>
  )
}
