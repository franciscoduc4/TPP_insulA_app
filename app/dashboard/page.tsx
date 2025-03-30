"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ArrowUp, ArrowDown, Check, Utensils, Syringe, Droplet, Plus, MessageCircle, Activity, Settings } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BackButton } from "@/components/back-button"
import { ChatInterface } from "@/components/chat-interface"
import Link from 'next/link'

interface GlucoseReading {
  value: number
  timestamp: Date | null
}

interface Activity {
  type: 'glucose' | 'meal' | 'insulin'
  value?: number
  mealType?: string
  carbs?: number
  units?: number
  timestamp: Date | null
}

// Datos de ejemplo
const mockGlucoseReadings: GlucoseReading[] = [
  { value: 142, timestamp: null },
  { value: 135, timestamp: null },
  { value: 128, timestamp: null },
  { value: 145, timestamp: null },
  { value: 138, timestamp: null },
  { value: 132, timestamp: null }
]

const mockActivities: Activity[] = [
  {
    type: 'glucose',
    value: 142,
    timestamp: null
  },
  {
    type: 'meal',
    mealType: 'Almuerzo',
    carbs: 45,
    timestamp: null
  },
  {
    type: 'insulin',
    units: 4.2,
    timestamp: null
  },
  {
    type: 'glucose',
    value: 135,
    timestamp: null
  },
  {
    type: 'meal',
    mealType: 'Desayuno',
    carbs: 30,
    timestamp: null
  }
]

export default function DashboardPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [glucoseValue, setGlucoseValue] = useState('')
  const [notes, setNotes] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [readings, setReadings] = useState<GlucoseReading[]>(mockGlucoseReadings)
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  
  useEffect(() => {
    // Generar fechas solo en el cliente
    const now = new Date()
    const updatedReadings = mockGlucoseReadings.map((reading, index) => ({
      ...reading,
      timestamp: new Date(now.getTime() - index * 2 * 60 * 60 * 1000)
    }))
    
    const updatedActivities = mockActivities.map((activity, index) => ({
      ...activity,
      timestamp: new Date(now.getTime() - index * 60 * 60 * 1000)
    }))
    
    setReadings(updatedReadings)
    setActivities(updatedActivities)
  }, [])
  
  // Calcular estadísticas
  const currentGlucose = readings[0]?.value || 0
  const previousGlucose = readings[1]?.value || 0
  const glucoseDiff = currentGlucose - previousGlucose
  const lastUpdated = readings[0]?.timestamp 
    ? formatDistanceToNow(readings[0].timestamp, { addSuffix: true })
    : ''
  
  // Calcular promedio y tiempo en rango
  const averageGlucose = Math.round(
    readings.reduce((acc, reading) => acc + reading.value, 0) / readings.length
  )
  
  const timeInRange = Math.round(
    (readings.filter(reading => reading.value >= 80 && reading.value <= 140).length / readings.length) * 100
  )
  
  // Estado de glucosa
  const getGlucoseStatus = (value: number) => {
    if (value < 80) return 'Bajo'
    if (value > 140) return 'Alto'
    return 'Normal'
  }
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Bajo':
        return 'bg-red-100 text-red-700'
      case 'Alto':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-apple-green/10 text-apple-green'
    }
  }
  
  const glucoseStatus = getGlucoseStatus(currentGlucose)
  const statusClass = getStatusClass(glucoseStatus)
  
  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la lectura
    setOpenDialog(false)
    setGlucoseValue('')
    setNotes('')
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-apple-green" />
          <h1 className="text-3xl font-bold text-text-primary">Indicadores</h1>
        </div>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
        </Link>
      </div>

      {/* Status and Add Reading Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>
            {glucoseStatus}
          </span>
          <span className="text-sm text-gray-500">
            {currentGlucose >= 80 && currentGlucose <= 140 
              ? 'En rango saludable' 
              : 'Fuera de rango objetivo'}
          </span>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Lectura
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Lectura de Glucosa</DialogTitle>
              <DialogDescription>
                Ingresa tu lectura actual de glucosa para hacer seguimiento.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="glucose">Lectura de Glucosa (mg/dL)</Label>
                <Input
                  id="glucose"
                  type="number"
                  value={glucoseValue}
                  onChange={(e) => setGlucoseValue(e.target.value)}
                  placeholder="Ingresa tu lectura"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notas (opcional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Agrega comentarios sobre esta lectura"
                />
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white"
                >
                  Guardar Lectura
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Current Glucose Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Glucosa Actual</h2>
            <span className="text-xs text-gray-500">Actualizado {lastUpdated}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-4xl font-bold text-apple-green">{currentGlucose}</span>
              <span className="ml-1 text-gray-500">mg/dL</span>
              <div className="ml-3 flex items-center">
                {glucoseDiff < 0 ? (
                  <>
                    <ArrowDown className="text-apple-green" />
                    <span className="ml-1 text-sm text-apple-green">{Math.abs(glucoseDiff)} mg/dL</span>
                  </>
                ) : glucoseDiff > 0 ? (
                  <>
                    <ArrowUp className="text-orange-500" />
                    <span className="ml-1 text-sm text-orange-500">{glucoseDiff} mg/dL</span>
                  </>
                ) : (
                  <>
                    <Check className="text-apple-green" />
                    <span className="ml-1 text-sm text-apple-green">Estable</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-apple-green/10 rounded-full p-3">
              <Droplet className="text-apple-green" />
            </div>
          </div>
          
          <div className="mt-4 h-20 relative">
            <div className="absolute inset-0 overflow-hidden rounded-lg bg-gray-50">
              <div className="flex items-end h-full w-full justify-between px-2">
                {readings.slice(0, 6).reverse().map((reading, index) => {
                  const max = Math.max(...readings.map(r => r.value))
                  const min = Math.min(...readings.map(r => r.value))
                  const range = max - min || 1
                  const height = ((reading.value - min) / range) * 70 + 10
                  
                  return (
                    <div 
                      key={index} 
                      className={`w-4 rounded-t relative ${
                        reading.value >= 80 && reading.value <= 140 
                          ? 'bg-apple-green/20' 
                          : 'bg-orange-100'
                      }`} 
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-7 -left-2 text-xs text-gray-600">{reading.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Daily Average Card */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-gray-500 text-sm mb-1">Promedio Diario</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-apple-green">{averageGlucose}</span>
              <span className="ml-1 text-sm text-gray-500">mg/dL</span>
            </div>
            <div className="mt-2 text-xs text-apple-green flex items-center">
              <Check className="h-3 w-3 mr-1" /> 
              {averageGlucose >= 80 && averageGlucose <= 140 
                ? 'En rango objetivo' 
                : 'Fuera de rango'}
            </div>
          </CardContent>
        </Card>
        
        {/* Time in Range Card */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-gray-500 text-sm mb-1">Tiempo en Rango</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-apple-green">{timeInRange}%</span>
            </div>
            <div className="mt-2 text-xs text-apple-green flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> 4% desde ayer
            </div>
          </CardContent>
        </Card>
        
        {/* Insulin Card */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-gray-500 text-sm mb-1">Insulina Diaria</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-apple-green">32.5</span>
              <span className="ml-1 text-sm text-gray-500">unidades</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <Syringe className="h-3 w-3 mr-1" /> Última dosis: 4.2u
            </div>
          </CardContent>
        </Card>
        
        {/* Carbs Card */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-gray-500 text-sm mb-1">Carbohidratos Diarios</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-apple-green">186</span>
              <span className="ml-1 text-sm text-gray-500">g</span>
            </div>
            <div className="mt-2 text-xs text-apple-green flex items-center">
              <Utensils className="h-3 w-3 mr-1" /> Registrar comida
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Actividad Reciente</h2>
            <a href="/history" className="text-apple-green text-sm">Ver todo</a>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center">
                  {activity.type === 'glucose' && (
                    <div className="bg-apple-green/10 rounded-full p-2 mr-3">
                      <Droplet className="text-apple-green h-4 w-4" />
                    </div>
                  )}
                  {activity.type === 'meal' && (
                    <div className="bg-orange-100 rounded-full p-2 mr-3">
                      <Utensils className="text-orange-500 h-4 w-4" />
                    </div>
                  )}
                  {activity.type === 'insulin' && (
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <Syringe className="text-blue-500 h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">
                      {activity.type === 'glucose' && 'Lectura de glucosa'}
                      {activity.type === 'meal' && activity.mealType}
                      {activity.type === 'insulin' && 'Dosis de insulina'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp 
                        ? formatDistanceToNow(activity.timestamp, { addSuffix: true })
                        : ''}
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  {activity.type === 'glucose' && `${activity.value} mg/dL`}
                  {activity.type === 'meal' && `${activity.carbs}g carbohidratos`}
                  {activity.type === 'insulin' && `${activity.units} unidades`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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