import { CreateProject } from "../../components/CreateProject"
import { Footer } from "../../components/Footer"

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <CreateProject />
      </main>
      <Footer />
    </div>
  )
}