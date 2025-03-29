"use client"

import { Activity } from "lucide-react"
import { BackButton } from "@/components/back-button"

export default function TrendsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-apple-green" />
          <h1 className="text-3xl font-bold text-text-primary">Tendencias</h1>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="text-center text-muted-foreground">
        Próximamente: Análisis de tendencias
      </div>
    </div>
  )
}

