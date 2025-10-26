import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, School, ClipboardList } from "lucide-react";

export function Training() {
  const trainings = [
    {
      title: "Material Didáctico",
      icon: Book,
      description: "Recursos educativos para distintas materias y niveles escolares.",
    },
    {
      title: "Planificación Escolar",
      icon: ClipboardList,
      description: "Estrategias y herramientas para organizar clases de manera efectiva.",
    },
    {
      title: "Gestión de Instituciones",
      icon: School,
      description: "Soluciones para mejorar la administración y coordinación en colegios.",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-orange-950">Recursos Educativos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainings.map((training, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <training.icon className="mr-2" />
                {training.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{training.description}</p>
              <Button>Ver Más</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
