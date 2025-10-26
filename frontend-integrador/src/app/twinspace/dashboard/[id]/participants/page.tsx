import { Footer } from "../../../../../components/Footer"
import { ParticipantsManagement } from "../../../../../components/twinspace/ParticipantsManagement"

interface PageProps {
  params: {
    id: string
  }
}

export default function TwinSpaceDashboardPage({ params }: PageProps) {
  const idProyecto = Number(params.id)
   if (isNaN(idProyecto)) {
    return <p>ID de proyecto inválido</p>
  }
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <ParticipantsManagement idProyecto={idProyecto}/>
      </main>
      <Footer />
    </div>
  )
}