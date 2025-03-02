import { Syringe } from "lucide-react"

interface PredictedDoseProps {
  dose: number
}

export function PredictedDose({ dose }: PredictedDoseProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Syringe className="h-8 w-8 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Dosis sugerida</p>
        <p className="text-3xl font-bold">{dose}U</p>
      </div>
    </div>
  )
}

