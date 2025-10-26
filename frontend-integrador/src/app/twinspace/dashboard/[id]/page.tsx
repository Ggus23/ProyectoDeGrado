import { Footer } from "../../../../components/Footer"
import { ProjectOverview } from "../../../../components/twinspace/ProjectOverview"

export default function TwinSpaceDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <ProjectOverview />
      </main>
      <Footer />
    </div>
  )
}
