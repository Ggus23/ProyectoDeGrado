import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Chat } from "../../components/chat/Chat"

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-orange-950 mb-8">Chat de InkEduca</h1>
        <Chat />
      </main>
      <Footer />
    </div>
  )
}
