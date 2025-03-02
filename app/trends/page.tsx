"use client"

import { useState } from "react"
import { MessageCircle, LineChart, TrendingUp, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlucoseTrendsChart } from "@/components/glucose-trends-chart"
import { PredictedDose } from "@/components/predicted-dose"
import { ChatInterface } from "@/components/chat-interface"
import { BackButton } from "@/components/back-button"

// Mock data for the chart
const mockTrendsData = [
  { time: "00:00", glucose: 120 },
  { time: "03:00", glucose: 110 },
  { time: "06:00", glucose: 95 },
  { time: "09:00", glucose: 140 },
  { time: "12:00", glucose: 130 },
  { time: "15:00", glucose: 115 },
  { time: "18:00", glucose: 125 },
  { time: "21:00", glucose: 135 },
]

export default function TrendsPage() {
  const [timeRange, setTimeRange] = useState("day")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [predictedDose, setPredictedDose] = useState(6)

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col items-center gap-4 relative">
          <div className="absolute left-0">
            <BackButton />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Tendencias</h1>
          </div>
        </div>

        {/* Glucose Trends Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                <CardTitle>Tendencias de Glucosa</CardTitle>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Día</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <GlucoseTrendsChart data={mockTrendsData} timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Insulin Prediction Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <Syringe className="h-5 w-5" />
              <CardTitle>Predicción de Dosis de Insulina</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <PredictedDose dose={predictedDose} />
            <div className="mt-4">
              <Button onClick={() => setIsChatOpen(true)} className="w-full" variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chatear con IA para ajustes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

