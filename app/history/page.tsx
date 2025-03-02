"use client"

import { useState } from "react"
import { Plus, History, Utensils, Calculator, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { FoodEntry } from "@/components/food-entry"
import { FoodEntryForm } from "@/components/food-entry-form"
import { EventList } from "@/components/event-list"

// Mock data for food entries
const initialFoodEntries = [
  { id: 1, name: "Avena con plátano", carbs: 30, protein: 5, fat: 3, calories: 170, timestamp: "2023-03-07 08:00" },
  { id: 2, name: "Ensalada de pollo", carbs: 15, protein: 25, fat: 10, calories: 250, timestamp: "2023-03-07 13:00" },
  {
    id: 3,
    name: "Yogur con frutos secos",
    carbs: 20,
    protein: 10,
    fat: 15,
    calories: 250,
    timestamp: "2023-03-07 16:00",
  },
]

// Mock data for significant events
const significantEvents = [
  { id: 1, type: "exercise", description: "30 min caminata", timestamp: "2023-03-07 07:30" },
  { id: 2, type: "medication", description: "Insulina de acción rápida - 4 unidades", timestamp: "2023-03-07 08:15" },
  { id: 3, type: "glucose", description: "Nivel de glucosa: 130 mg/dL", timestamp: "2023-03-07 10:00" },
  { id: 4, type: "exercise", description: "45 min natación", timestamp: "2023-03-07 18:00" },
]

export default function HistoryPage() {
  const [foodEntries, setFoodEntries] = useState(initialFoodEntries)
  const [isAddingFood, setIsAddingFood] = useState(false)

  const addFoodEntry = (newEntry) => {
    setFoodEntries([...foodEntries, { ...newEntry, id: Date.now() }])
    setIsAddingFood(false)
  }

  const calculateTotals = () => {
    return foodEntries.reduce(
      (acc, entry) => {
        acc.carbs += entry.carbs
        acc.protein += entry.protein
        acc.fat += entry.fat
        acc.calories += entry.calories
        return acc
      },
      { carbs: 0, protein: 0, fat: 0, calories: 0 },
    )
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col items-center gap-4 relative">
          <div className="absolute left-0">
            <BackButton />
          </div>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Historial</h1>
          </div>
        </div>

        {/* Food Registry Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <Utensils className="h-5 w-5" />
              <CardTitle>Registro de Alimentos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foodEntries.map((entry) => (
                <FoodEntry key={entry.id} entry={entry} />
              ))}
              {isAddingFood ? (
                <FoodEntryForm onSubmit={addFoodEntry} onCancel={() => setIsAddingFood(false)} />
              ) : (
                <Button onClick={() => setIsAddingFood(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Alimento
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Daily Totals Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <Calculator className="h-5 w-5" />
              <CardTitle>Totales del Día</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Carbohidratos</p>
                <p className="text-2xl font-bold">{totals.carbs}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proteínas</p>
                <p className="text-2xl font-bold">{totals.protein}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grasas</p>
                <p className="text-2xl font-bold">{totals.fat}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calorías</p>
                <p className="text-2xl font-bold">{totals.calories}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Significant Events Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <Activity className="h-5 w-5" />
              <CardTitle>Eventos Significativos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <EventList events={significantEvents} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

