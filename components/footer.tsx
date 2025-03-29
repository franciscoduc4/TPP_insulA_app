"use client"

import { usePathname, useRouter } from "next/navigation"
import { Activity, Calendar, Home, Settings, Utensils, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[calc(4rem+env(safe-area-inset-bottom))] border-t bg-background flex items-center justify-around px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex flex-col items-center">
        <Button
          variant={isActive("/dashboard") ? "default" : "ghost"}
          size="icon"
          className="h-10 w-12 rounded-full"
          onClick={() => router.push("/dashboard")}
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Inicio</span>
        </Button>
        <span className="text-xs mt-0">Inicio</span>
      </div>
      <div className="flex flex-col items-center">
        <Button
          variant={isActive("/meals") ? "default" : "ghost"}
          size="icon"
          className="h-10 w-12 rounded-full"
          onClick={() => router.push("/meals")}
        >
          <Utensils className="h-5 w-5" />
          <span className="sr-only">Comidas</span>
        </Button>
        <span className="text-xs mt-0">Comidas</span>
      </div>
      <div className="flex flex-col items-center">
        <Button
          variant={isActive("/history") ? "default" : "ghost"}
          size="icon"
          className="h-10 w-12 rounded-full"
          onClick={() => router.push("/history")}
        >
          <Calendar className="h-5 w-5" />
          <span className="sr-only">Historial</span>
        </Button>
        <span className="text-xs mt-0">Historial</span>
      </div>
      <div className="flex flex-col items-center">
        <Button
          variant={isActive("/trends") ? "default" : "ghost"}
          size="icon"
          className="h-10 w-12 rounded-full"
          onClick={() => router.push("/trends")}
        >
          <Activity className="h-5 w-5" />
          <span className="sr-only">Tendencias</span>
        </Button>
        <span className="text-xs mt-0">Tendencias</span>
      </div>
      <div className="flex flex-col items-center">
        <Button
          variant={isActive("/profile") ? "default" : "ghost"}
          size="icon"
          className="h-10 w-12 rounded-full"
          onClick={() => router.push("/profile")}
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Perfil</span>
        </Button>
        <span className="text-xs mt-0">Perfil</span>
      </div>
    </div>
  )
}

