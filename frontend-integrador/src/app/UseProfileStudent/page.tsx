import { Footer } from "../../components/Footer"
import { UserProfile } from "../../components/UserProfileStudent"

export default function UserProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <UserProfile />
      </main>
      <Footer />
    </div>
  )
}