import { Teachers } from "../../components/Teachers"
import { Footer } from "../../components/Footer"

export default function TeachersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <Teachers />
      </main>
      <Footer />
    </div>
  )
}