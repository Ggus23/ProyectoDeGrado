import { UserProjectsTeacher } from "../../components/UserProjectsTeacher"
import { Footer } from "../../components/Footer"

export default function MyProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <UserProjectsTeacher />
      </main>
      <Footer />
    </div>
  )
}
