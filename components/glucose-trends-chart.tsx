"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

interface GlucoseTrendsChartProps {
  data: Array<{ time: string; glucose: number }>
  timeRange: string
}

export function GlucoseTrendsChart({ data, timeRange }: GlucoseTrendsChartProps) {
  const formatXAxis = (tickItem: string) => {
    const date = new Date(`2023-01-01 ${tickItem}`)
    switch (timeRange) {
      case "day":
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      case "week":
        return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][date.getDay()]
      case "month":
        return date.getDate().toString()
      default:
        return tickItem
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatXAxis} />
        <YAxis domain={[60, 200]} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <Card className="p-2">
                  <p className="font-bold">{formatXAxis(data.time)}</p>
                  <p>{`Glucosa: ${data.glucose} mg/dL`}</p>
                </Card>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="glucose" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

