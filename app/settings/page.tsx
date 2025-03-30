"use client"

import { useState } from "react"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Smartphone, Activity, Cloud, Plus, Settings, Laptop, UserCog } from "lucide-react"

export default function SettingsPage() {
  const [connections, setConnections] = useState({
    accuCheck: false,
    googleFit: false,
    appleHealth: false,
    nightscout: false,
  })

  const handleToggle = (key: keyof typeof connections) => {
    setConnections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleConnect = (service: string) => {
    console.log(`Connecting to ${service}...`)
    // Implement actual connection logic here
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton />
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Configuración
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <Tabs defaultValue="connections">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connections">Conexiones</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          </TabsList>
          <TabsContent value="connections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Dispositivos y Aplicaciones
                </CardTitle>
                <CardDescription className="text-center">
                  Conecta tus dispositivos y aplicaciones para sincronizar datos automáticamente.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="accu-check" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Accu-Check</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="accu-check"
                      checked={connections.accuCheck}
                      onCheckedChange={() => handleToggle("accuCheck")}
                    />
                    <Button size="sm" onClick={() => handleConnect("Accu-Check")}>
                      Conectar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="google-fit" className="flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Google Fit</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="google-fit"
                      checked={connections.googleFit}
                      onCheckedChange={() => handleToggle("googleFit")}
                    />
                    <Button size="sm" onClick={() => handleConnect("Google Fit")}>
                      Conectar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="apple-health" className="flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Apple Health</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="apple-health"
                      checked={connections.appleHealth}
                      onCheckedChange={() => handleToggle("appleHealth")}
                    />
                    <Button size="sm" onClick={() => handleConnect("Apple Health")}>
                      Conectar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="nightscout" className="flex items-center space-x-2">
                    <Cloud className="h-4 w-4" />
                    <span>Nightscout</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="nightscout"
                      checked={connections.nightscout}
                      onCheckedChange={() => handleToggle("nightscout")}
                    />
                    <Button size="sm" onClick={() => handleConnect("Nightscout")}>
                      Conectar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Otras Conexiones
                </CardTitle>
                <CardDescription className="text-center">
                  Agrega otras fuentes de datos para mejorar tu experiencia.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Nueva Conexión
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <UserCog className="h-5 w-5" />
                  Preferencias de Usuario
                </CardTitle>
                <CardDescription className="text-center">
                  Personaliza tu experiencia en la aplicación.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add user preferences here */}
                <p>Configuración de preferencias en desarrollo...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}