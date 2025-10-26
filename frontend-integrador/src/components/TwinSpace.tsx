"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ProjectOverview } from "../components/twinspace/ProjectOverview"
import { ParticipantsManagement } from "../components/twinspace/ParticipantsManagement"
import { ProjectPages } from "../components/twinspace/ProjectPages"

export function TwinSpace() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-orange-950 mb-8">TwinSpace: Exploradores del Clima Global</h1>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Inicio del Proyecto</TabsTrigger>
          <TabsTrigger value="participants">Gestión de Participantes</TabsTrigger>
          <TabsTrigger value="pages">Constructor de Contenidos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="participants">
          <ParticipantsManagement />
        </TabsContent>

        <TabsContent value="pages">
          <ProjectPages />
        </TabsContent>
      </Tabs>
    </div>
  )
}
