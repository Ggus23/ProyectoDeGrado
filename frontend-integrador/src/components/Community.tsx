import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Calendar } from "lucide-react"

export function Community() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Comunidad Educativa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Grupos de Estudio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Únete a grupos de estudio en tu área de interés.</p>
            <Button>Explorar grupos</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2" />
              Foros de Discusión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Participa en discusiones sobre temas educativos.</p>
            <Button>Ir a los foros</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Eventos Educativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Descubre y participa en eventos educativos.</p>
            <Button>Ver calendario</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}