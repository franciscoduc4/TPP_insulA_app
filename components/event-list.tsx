import { Activity, Droplet, Utensils } from "lucide-react"

interface Event {
  id: number
  type: string
  description: string
  timestamp: string
}

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "exercise":
        return <Activity className="h-5 w-5 text-green-500" />
      case "medication":
        return <Droplet className="h-5 w-5 text-blue-500" />
      case "glucose":
        return <Droplet className="h-5 w-5 text-red-500" />
      case "food":
        return <Utensils className="h-5 w-5 text-yellow-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start space-x-4">
          <div className="bg-muted p-2 rounded-full">{getEventIcon(event.type)}</div>
          <div className="flex-1">
            <p className="font-medium">{event.description}</p>
            <p className="text-sm text-muted-foreground">{event.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

