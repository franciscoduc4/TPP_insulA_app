interface GlucoseReading {
  id: string
  value: number
  timestamp: string
  notes?: string
}

// Datos de ejemplo para desarrollo
const mockData: GlucoseReading[] = [
  {
    id: "1",
    value: 120,
    timestamp: "2024-03-29T08:00:00Z",
    notes: "Antes del desayuno"
  },
  {
    id: "2",
    value: 140,
    timestamp: "2024-03-29T12:00:00Z",
    notes: "Antes del almuerzo"
  },
  {
    id: "3",
    value: 130,
    timestamp: "2024-03-29T16:00:00Z",
    notes: "Antes de la merienda"
  },
  {
    id: "4",
    value: 110,
    timestamp: "2024-03-29T20:00:00Z",
    notes: "Antes de la cena"
  }
]

export async function fetchGlucoseByDateRange(
  from: Date,
  to: Date
): Promise<GlucoseReading[]> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Filtrar datos por rango de fechas
  return mockData.filter(reading => {
    const readingDate = new Date(reading.timestamp)
    return readingDate >= from && readingDate <= to
  })
} 