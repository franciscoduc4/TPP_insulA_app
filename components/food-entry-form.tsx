"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FoodEntryFormProps {
  onSubmit: (entry: {
    name: string
    carbs: number
    protein: number
    fat: number
    calories: number
    timestamp: string
  }) => void
  onCancel: () => void
}

export function FoodEntryForm({ onSubmit, onCancel }: FoodEntryFormProps) {
  const [name, setName] = useState("")
  const [carbs, setCarbs] = useState("")
  const [protein, setProtein] = useState("")
  const [fat, setFat] = useState("")
  const [calories, setCalories] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      carbs: Number(carbs),
      protein: Number(protein),
      fat: Number(fat),
      calories: Number(calories),
      timestamp: new Date().toLocaleString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del Alimento</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="carbs">Carbohidratos (g)</Label>
          <Input id="carbs" type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="protein">Proteínas (g)</Label>
          <Input id="protein" type="number" value={protein} onChange={(e) => setProtein(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="fat">Grasas (g)</Label>
          <Input id="fat" type="number" value={fat} onChange={(e) => setFat(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="calories">Calorías</Label>
          <Input id="calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}

