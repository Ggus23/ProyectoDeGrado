import { Events } from "../../components/Events"
import { Footer } from "../../components/Footer"

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Events />
      </main>
      <Footer />
    </div>
  )
}
