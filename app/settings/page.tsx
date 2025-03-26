"use client"

import { useState } from "react"
import { getAuth } from "firebase/auth"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Smartphone, Activity, Cloud, Plus, Settings, Laptop, UserCog } from "lucide-react"

export default function SettingsPage() {
  const auth = getAuth()
  const { toast } = useToast()
  const [connections, setConnections] = useState({
    accuCheck: false,
    googleFit: false,
    appleHealth: false,
    nightscout: false,
  })

  const handleToggle = (key: keyof typeof connections) => {
    setConnections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  /**
   * Conecta a un servicio de terceros.
   * @param {string} service - Nombre del servicio al que se quiere conectar.
   * @returns {void}
   */
  const handleConnect = async (service: string) => {
    console.log(`Connecting to ${service}...`)
    if (service === "Nightscout") {
      // URL y API Key de Nightscout
      const url = prompt("Ingresá la URL de tu Nightscout")
      const apiKey = prompt("Ingresá tu API Key de Nightscout")
      console.log(`URL: ${url}, API Key: ${apiKey}`)

      if (!url) return;

      try {
        // Llamada a la API para conectar la cuenta.
        const response = await fetch('/api/nightscout/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: auth?.currentUser?.uid,
            nightscoutUrl: url,
            apiKey: apiKey ?? '', 
          }),
        });
        
        if (response.ok) {
          // Actualizar el estado de la conexión.
          setConnections(prev => ({ ...prev, nightscout: true }));
          toast({
            title: "Conexión Exitosa",
            description: "Se ha conectado correctamente a Nightscout.",
          });
        } else {
          const errorData = await response.json();
          toast({
            title: "Conexión Fallida",
            description: errorData.error || "No se pudo conectar a Nightscout.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error connecting to Nightscout:", error);
        toast({
          title: "Connection Error",
          description: "An error occurred while trying to connect.",
          variant: "destructive",
        });
      }
    }
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

