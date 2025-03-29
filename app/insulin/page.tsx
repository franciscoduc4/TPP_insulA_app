"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Calculator, Syringe } from 'lucide-react'
import { format } from 'date-fns'
import { BackButton } from "@/components/back-button"

export default function InsulinPage() {
  // Form state
  const [currentGlucose, setCurrentGlucose] = useState<string>('142')
  const [carbs, setCarbs] = useState<string>('45')
  const [activity, setActivity] = useState<string>('None')
  const [timeOfDay, setTimeOfDay] = useState<string>('Afternoon (11am-5pm)')
  
  // Result state
  const [recommendation, setRecommendation] = useState<{
    total: number;
    breakdown: { 
      correctionDose: number; 
      mealDose: number; 
      activityAdjustment: number;
      timeAdjustment: number;
    };
  } | null>(null)
  
  // Simular carga de datos
  const isLoading = false
  
  // Handle calculate button click
  const handleCalculate = () => {
    if (!currentGlucose || !carbs) return
    
    // Simular cálculo
    setRecommendation({
      total: 4.2,
      breakdown: {
        correctionDose: 1.2,
        mealDose: 2.5,
        activityAdjustment: -0.3,
        timeAdjustment: 0.8
      }
    })
  }
  
  // Handle log dose button click
  const handleLogDose = () => {
    if (!recommendation) return
    // Aquí iría la lógica para guardar la dosis
  }
  
  // Sample recent predictions for the UI
  const recentPredictions = [
    {
      mealType: 'Lunch',
      date: new Date(),
      carbs: 45,
      glucose: 142,
      units: 4.2,
      accuracy: 'Accurate'
    },
    {
      mealType: 'Breakfast',
      date: new Date(Date.now() - 7 * 60 * 60 * 1000),
      carbs: 22,
      glucose: 110,
      units: 2.5,
      accuracy: 'Accurate'
    },
    {
      mealType: 'Dinner',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      carbs: 60,
      glucose: 135,
      units: 5.8,
      accuracy: 'Slightly low'
    }
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-apple-green" />
          <h1 className="text-3xl font-bold text-text-primary">Insulina</h1>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>
      
      {/* Prediction Calculator */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Calculadora de Insulina</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="glucose">Nivel de Glucosa Actual</Label>
              <div className="flex">
                <Input
                  id="glucose"
                  type="number"
                  placeholder="Ingrese lectura de glucosa"
                  value={currentGlucose}
                  onChange={(e) => setCurrentGlucose(e.target.value)}
                  className="flex-1 rounded-r-none"
                />
                <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                  mg/dL
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="carbs">Carbohidratos a Consumir</Label>
              <div className="flex">
                <Input
                  id="carbs"
                  type="number"
                  placeholder="Ingrese carbohidratos"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="flex-1 rounded-r-none"
                />
                <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                  gramos
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="activity">Actividad Física Planificada</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione nivel de actividad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">Ninguna</SelectItem>
                  <SelectItem value="Light (30 min walk)">Ligera (30 min caminata)</SelectItem>
                  <SelectItem value="Moderate (30 min jog)">Moderada (30 min trote)</SelectItem>
                  <SelectItem value="Intense (1hr workout)">Intensa (1hr ejercicio)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="time">Hora del Día</Label>
              <Select value={timeOfDay} onValueChange={setTimeOfDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione hora del día" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning (6am-11am)">Mañana (6am-11am)</SelectItem>
                  <SelectItem value="Afternoon (11am-5pm)">Tarde (11am-5pm)</SelectItem>
                  <SelectItem value="Evening (5pm-10pm)">Noche (5pm-10pm)</SelectItem>
                  <SelectItem value="Night (10pm-6am)">Madrugada (10pm-6am)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={handleCalculate} 
                disabled={isLoading || !currentGlucose || !carbs}
                className="w-full py-6 bg-[#22c55e] hover:bg-[#22c55e]/90 text-white"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Calculator className="mr-2 h-4 w-4" />
                )}
                Calcular Dosis de Insulina
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Prediction Result */}
      {recommendation && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-3 bg-apple-green/10 rounded-full mr-4">
                <Syringe className="text-apple-green text-xl" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Dosis de Insulina Recomendada</h2>
                <div className="flex items-end mt-1">
                  <span className="text-3xl font-bold text-apple-green">{recommendation.total}</span>
                  <span className="ml-1 text-gray-600">unidades</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Basado en tu glucosa actual y la comida planificada</p>
              </div>
            </div>
            
            <div className="mt-5 pt-5 border-t border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2">Cómo se calculó:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Dosis de corrección (glucosa actual):</span>
                  <span className="font-medium">{recommendation.breakdown.correctionDose} unidades</span>
                </li>
                <li className="flex justify-between">
                  <span>Dosis para comida ({carbs}g carbohidratos):</span>
                  <span className="font-medium">{recommendation.breakdown.mealDose} unidades</span>
                </li>
                <li className="flex justify-between">
                  <span>Ajuste por actividad:</span>
                  <span className="font-medium">{recommendation.breakdown.activityAdjustment} unidades</span>
                </li>
                <li className="flex justify-between">
                  <span>Ajuste por hora del día:</span>
                  <span className="font-medium">{recommendation.breakdown.timeAdjustment} unidades</span>
                </li>
                <li className="flex justify-between text-apple-green font-medium">
                  <span>Dosis total recomendada:</span>
                  <span>{recommendation.total} unidades</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-5 pt-3">
              <Button 
                onClick={handleLogDose} 
                disabled={isLoading}
                variant="outline"
                className="w-full border-apple-green text-apple-green hover:bg-apple-green/10"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Syringe className="mr-2 h-4 w-4" />
                )}
                Registrar Esta Dosis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Prediction Accuracy & History */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento de Predicciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-500">Precisión de Predicciones</span>
              <div className="flex items-center">
                <span className="text-xl font-bold text-apple-green">92%</span>
                <span className="ml-2 text-xs bg-apple-green/10 text-apple-green px-2 py-0.5 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                    <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-xs bg-[#22c55e] text-white border border-[#22c55e] px-2 py-0.5 rounded-full flex items-center">
                    3% este mes
                  </span>
                </span>
              </div>
            </div>
            
            <div className="h-12 w-32 bg-gray-50 rounded-lg relative overflow-hidden">
              <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polyline 
                  points="0,60 20,55 40,45 60,42 80,35 100,30" 
                  fill="none" 
                  stroke="#22c55e" 
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            El modelo está aprendiendo continuamente de tus respuestas glucémicas y mejorando sus predicciones. 
            La precisión reciente ha aumentado a medida que el modelo se adapta a tus patrones.
          </p>
          
          <h3 className="font-medium text-gray-800 mb-2">Predicciones Recientes</h3>
          
          <div className="space-y-3">
            {recentPredictions.map((prediction, index) => (
              <div key={index} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">
                    {prediction.mealType} - {format(prediction.date, 'MMM dd, p')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {prediction.carbs}g carbohidratos, {prediction.glucose} mg/dL
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{prediction.units} unidades</p>
                  <p className={`text-xs ${
                    prediction.accuracy === 'Accurate' 
                      ? 'text-apple-green font-medium' 
                      : prediction.accuracy === 'Slightly low' 
                        ? 'text-amber-600' 
                        : 'text-red-600'
                  }`}>
                    {prediction.accuracy === 'Accurate' ? 'Precisa' : 
                     prediction.accuracy === 'Slightly low' ? 'Ligeramente baja' : 'Baja'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              className="text-apple-green border border-[#22c55e] hover:bg-[#22c55e]/10"
            >
              Ver Todas las Predicciones
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 