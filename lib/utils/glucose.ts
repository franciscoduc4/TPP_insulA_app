interface GlucoseReading {
  id: string
  value: number
  timestamp: string
  notes?: string
}

export function calculateAverageGlucose(readings: GlucoseReading[]): number {
  if (readings.length === 0) return 0
  const sum = readings.reduce((acc, reading) => acc + reading.value, 0)
  return Math.round(sum / readings.length)
}

export function calculateTimeInRange(
  readings: GlucoseReading[],
  min: number,
  max: number
): number {
  if (readings.length === 0) return 0
  const inRange = readings.filter(
    (reading) => reading.value >= min && reading.value <= max
  ).length
  return Math.round((inRange / readings.length) * 100)
}

export function calculateStandardDeviation(readings: GlucoseReading[]): number {
  if (readings.length === 0) return 0
  const mean = calculateAverageGlucose(readings)
  const squareDiffs = readings.map((reading) => {
    const diff = reading.value - mean
    return diff * diff
  })
  const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / readings.length
  return Math.round(Math.sqrt(avgSquareDiff))
} 