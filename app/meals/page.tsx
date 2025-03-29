"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Utensils } from "lucide-react"
import { BackButton } from "@/components/back-button"

interface Meal {
  id: string
  name: string
  type: string
  macros: {
    carbs: number
    protein: number
    fat: number
  }
  timestamp: Date
  imageUrl?: string
}

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    carbs: "",
    protein: "",
    fat: "",
    imageUrl: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      macros: {
        carbs: Number(formData.carbs),
        protein: Number(formData.protein),
        fat: Number(formData.fat),
      },
      timestamp: new Date(),
      imageUrl: formData.imageUrl || undefined,
    }

    setMeals([newMeal, ...meals])
    setFormData({
      name: "",
      type: "",
      carbs: "",
      protein: "",
      fat: "",
      imageUrl: "",
    })
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} minutos`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `hace ${days} ${days === 1 ? 'día' : 'días'}`
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex items-center space-x-2">
          <Utensils className="h-8 w-8 text-apple-green" />
          <h1 className="text-3xl font-bold text-text-primary">Comidas</h1>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registrar Comida</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la comida</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de comida</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desayuno">Desayuno</SelectItem>
                  <SelectItem value="almuerzo">Almuerzo</SelectItem>
                  <SelectItem value="cena">Cena</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbohidratos (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={formData.carbs}
                  onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Proteínas (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={formData.protein}
                  onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Grasas (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  value={formData.fat}
                  onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Foto de la comida</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  type="text"
                  placeholder="URL de la imagen"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
                <Button type="button" variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Guardar Comida
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Comidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                {meal.imageUrl && (
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{meal.type}</p>
                  <div className="mt-2 text-sm">
                    <p>Carbohidratos: {meal.macros.carbs}g</p>
                    <p>Proteínas: {meal.macros.protein}g</p>
                    <p>Grasas: {meal.macros.fat}g</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatTimeAgo(meal.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {meals.length === 0 && (
              <p className="text-center text-muted-foreground">
                No hay comidas registradas aún
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 