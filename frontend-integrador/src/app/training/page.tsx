import { Footer } from "../../components/Footer";
import { TeacherResources } from "../../components/TeacherResources";

export default function TrainingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <TeacherResources />
      </main>
      <Footer />
    </div>
  );
}