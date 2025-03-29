"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Calendar, Download } from 'lucide-react'
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { BackButton } from "@/components/back-button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

type DateRangeType = 'today' | 'week' | 'month' | '3months' | 'custom'

// Datos de ejemplo para los gráficos
const glucoseTrendData = [
  { time: '08:00', value: 120, targetMin: 80, targetMax: 140 },
  { time: '10:00', value: 130, targetMin: 80, targetMax: 140 },
  { time: '12:00', value: 140, targetMin: 80, targetMax: 140 },
  { time: '14:00', value: 125, targetMin: 80, targetMax: 140 },
  { time: '16:00', value: 135, targetMin: 80, targetMax: 140 },
  { time: '18:00', value: 145, targetMin: 80, targetMax: 140 },
  { time: '20:00', value: 130, targetMin: 80, targetMax: 140 },
]

const dailyPatternData = [
  { hour: '00:00', value: 125 },
  { hour: '03:00', value: 120 },
  { hour: '06:00', value: 115 },
  { hour: '09:00', value: 130 },
  { hour: '12:00', value: 140 },
  { hour: '15:00', value: 135 },
  { hour: '18:00', value: 145 },
  { hour: '21:00', value: 130 },
]

export default function HistoryPage() {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('today')
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(new Date()),
    to: endOfDay(new Date())
  })
  const [page, setPage] = useState(1)
  const pageSize = 10
  
  // Datos de ejemplo
  const mockData = [
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
  
  const handleDateRangeChange = (type: DateRangeType) => {
    const today = new Date()
    let from, to
    
    switch (type) {
      case 'today':
        from = startOfDay(today)
        to = endOfDay(today)
        break
      case 'week':
        from = startOfDay(subDays(today, 7))
        to = endOfDay(today)
        break
      case 'month':
        from = startOfDay(subDays(today, 30))
        to = endOfDay(today)
        break
      case '3months':
        from = startOfDay(subMonths(today, 3))
        to = endOfDay(today)
        break
      default:
        return
    }
    
    setDateRangeType(type)
    setDateRange({ from, to })
  }
  
  const handleCustomDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range.to) {
      setDateRangeType('custom')
      setDateRange({
        from: startOfDay(range.from),
        to: endOfDay(range.to)
      })
    }
  }
  
  // Simular carga de datos
  const isLoading = false
  const glucoseReadings = mockData
  
  // Calcular estadísticas
  const averageGlucose = glucoseReadings?.length 
    ? Math.round(glucoseReadings.reduce((acc, reading) => acc + reading.value, 0) / glucoseReadings.length)
    : 0
  
  const timeInRange = glucoseReadings?.length 
    ? Math.round((glucoseReadings.filter(reading => reading.value >= 80 && reading.value <= 140).length / glucoseReadings.length) * 100)
    : 0
  
  const standardDeviation = glucoseReadings?.length 
    ? Math.round(Math.sqrt(glucoseReadings.reduce((acc, reading) => acc + Math.pow(reading.value - averageGlucose, 2), 0) / glucoseReadings.length))
    : 0
  
  // Paginación
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedReadings = glucoseReadings 
    ? [...glucoseReadings].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(startIndex, endIndex) 
    : []
  
  const totalPages = glucoseReadings 
    ? Math.ceil(glucoseReadings.length / pageSize) 
    : 0

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-apple-green" />
          <h1 className="text-3xl font-bold text-text-primary">Historial</h1>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>
      
      {/* Date Range Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleDateRangeChange('today')}
                variant={dateRangeType === 'today' ? 'default' : 'outline'}
                size="sm"
              >
                Hoy
              </Button>
              <Button 
                onClick={() => handleDateRangeChange('week')}
                variant={dateRangeType === 'week' ? 'default' : 'outline'}
                size="sm"
              >
                Semana
              </Button>
              <Button 
                onClick={() => handleDateRangeChange('month')}
                variant={dateRangeType === 'month' ? 'default' : 'outline'}
                size="sm"
              >
                Mes
              </Button>
              <Button 
                onClick={() => handleDateRangeChange('3months')}
                variant={dateRangeType === '3months' ? 'default' : 'outline'}
                size="sm"
              >
                3 Meses
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <DateRangePicker 
                date={dateRange} 
                onDateChange={handleCustomDateRangeChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-apple-green" />
        </div>
      ) : (
        <>
          {/* Main Glucose Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tendencias de Glucosa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={glucoseTrendData} margin={{ top: 15, right: 20, left: 30, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Hora del día', position: 'bottom', offset: 0 }}
                    />
                    <YAxis 
                      domain={[60, 160]} 
                      label={{ value: 'Glucosa (mg/dL)', angle: -90, position: 'insideLeft', offset: 0 }}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: "#22c55e", strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="targetMin" 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="targetMax" 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">Promedio</p>
                <p className="text-lg font-bold text-text-primary">{averageGlucose} mg/dL</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">Tiempo en Rango</p>
                <p className="text-lg font-bold text-apple-green">{timeInRange}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">Desviación Estándar</p>
                <p className="text-lg font-bold text-text-primary">{standardDeviation} mg/dL</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Daily Pattern Analysis */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patrón Diario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyPatternData} margin={{ top: 15, right: 20, left: 30, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="hour" 
                      label={{ value: 'Hora del día', position: 'bottom', offset: 0 }}
                    />
                    <YAxis 
                      domain={[60, 160]} 
                      label={{ value: 'Glucosa (mg/dL)', angle: -90, position: 'insideLeft', offset: 0 }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Detailed Logs Table */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Registros Detallados</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Exportar Datos
              </Button>
            </CardHeader>
            <CardContent>
              {glucoseReadings && glucoseReadings.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha y Hora</TableHead>
                          <TableHead>Glucosa</TableHead>
                          <TableHead>Notas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedReadings.map((reading) => (
                          <TableRow key={reading.id}>
                            <TableCell>{format(new Date(reading.timestamp), 'PPp')}</TableCell>
                            <TableCell className="font-medium">{reading.value} mg/dL</TableCell>
                            <TableCell className="text-muted-foreground">{reading.notes || 'Sin notas'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setPage(p => Math.max(1, p - 1))}
                              isActive={page > 1}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink 
                                onClick={() => setPage(i + 1)}
                                isActive={page === i + 1}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          
                          {totalPages > 3 && (
                            <>
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink 
                                  onClick={() => setPage(totalPages)}
                                  isActive={page === totalPages}
                                >
                                  {totalPages}
                                </PaginationLink>
                              </PaginationItem>
                            </>
                          )}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                              isActive={page < totalPages}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No se encontraron registros de glucosa para el rango de fechas seleccionado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

