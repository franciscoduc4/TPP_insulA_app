"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, MessageCircle, TrendingDown, TrendingUp, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ChatInterface } from "@/components/chat-interface"
import { BackButton } from "@/components/back-button"

// Componente para mostrar el nivel de glucosa con indicador de tendencia
const GlucoseLevel = ({
  value,
  trend,
}: {
  value: number
  trend: "up" | "down" | "stable"
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-6 w-6 text-red-500" />
      case "down":
        return <TrendingDown className="h-6 w-6 text-amber-500" />
      default:
        return <span className="h-6 w-6 inline-flex items-center justify-center text-green-500">→</span>
    }
  }

  const getStatusColor = () => {
    if (value < 70) return "text-red-500"
    if (value > 180) return "text-red-500"
    if (value > 140 || value < 80) return "text-amber-500"
    return "text-green-500"
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn("text-5xl font-bold", getStatusColor())}>{value}</span>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">mg/dL</span>
        {getTrendIcon()}
      </div>
    </div>
  )
}

// Componente para el gráfico de tendencia
const GlucoseTrendChart = () => {
  // Datos simulados para el gráfico
  const data = [120, 135, 128, 110, 105, 118, 125, 132]
  const max = Math.max(...data) + 20
  const min = Math.min(...data) - 20

  return (
    <div className="h-24 w-full">
      <div className="flex h-full items-end gap-1">
        {data.map((value, index) => {
          const height = ((value - min) / (max - min)) * 100
          return (
            <div key={index} className="flex-1 relative">
              <div
                className={cn(
                  "rounded-t-sm w-full",
                  value < 70 || value > 180
                    ? "bg-red-400"
                    : value < 80 || value > 140
                      ? "bg-amber-400"
                      : "bg-green-400",
                )}
                style={{ height: `${height}%` }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>-3h</span>
        <span>-2h</span>
        <span>-1h</span>
        <span>Ahora</span>
      </div>
    </div>
  )
}

// Componente principal del Dashboard
export default function DiabetesDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <BackButton />
            <div>
              <h1 className="text-xl font-bold">Hola, María</h1>
              <p className="text-sm text-muted-foreground">Lunes, 2 de marzo</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/profile")}>
              <User className="h-6 w-6" />
              <span className="sr-only">Perfil</span>
            </Button>
          </div>

          {/* Tarjeta de nivel de glucosa */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nivel de glucosa</CardTitle>
              <CardDescription>Actualizado hace 3 min</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GlucoseLevel value={118} trend="stable" />
              <GlucoseTrendChart />
            </CardContent>
          </Card>

          {/* Tarjeta de actividad física */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actividad física</CardTitle>
              <CardDescription>Hoy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-medium">6,540 pasos</span>
                </div>
                <span className="text-sm text-muted-foreground">Meta: 10,000</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>10,000</span>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta de predicción de insulina */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Predicción de insulina</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  Detalles
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Basado en patrones y comidas recientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Próxima dosis sugerida</p>
                  <p className="text-3xl font-bold">4.5 U</p>
                  <p className="text-sm text-muted-foreground">Para la comida (~60g carbs)</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <span className="text-primary text-sm font-medium">En 30 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botón flotante para chatear con IA */}
      <Button
        className="rounded-full h-14 w-14 shadow-lg fixed bottom-20 right-4 flex items-center justify-center"
        size="icon"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chatear con IA</span>
      </Button>

      {/* Add the ChatInterface component */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
} 