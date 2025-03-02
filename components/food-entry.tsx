import { Card, CardContent } from "@/components/ui/card"

interface FoodEntryProps {
  entry: {
    name: string
    carbs: number
    protein: number
    fat: number
    calories: number
    timestamp: string
  }
}

export function FoodEntry({ entry }: FoodEntryProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{entry.name}</h3>
            <p className="text-sm text-muted-foreground">{entry.timestamp}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">
              <span className="font-medium">{entry.calories}</span> kcal
            </p>
            <p className="text-xs text-muted-foreground">
              C: {entry.carbs}g | P: {entry.protein}g | G: {entry.fat}g
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

