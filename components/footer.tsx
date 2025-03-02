"use client"

import { usePathname, useRouter } from "next/navigation"
import { Activity, Calendar, Home, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[calc(4rem+env(safe-area-inset-bottom))] border-t bg-background flex items-center justify-around px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]">
      <Button
        variant={isActive("/") ? "default" : "ghost"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={() => router.push("/")}
      >
        <Home className="h-5 w-5" />
        <span className="sr-only">Inicio</span>
      </Button>
      <Button
        variant={isActive("/history") ? "default" : "ghost"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={() => router.push("/history")}
      >
        <Calendar className="h-5 w-5" />
        <span className="sr-only">Historial</span>
      </Button>
      <Button
        variant={isActive("/trends") ? "default" : "ghost"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={() => router.push("/trends")}
      >
        <Activity className="h-5 w-5" />
        <span className="sr-only">Tendencias</span>
      </Button>
      <Button
        variant={isActive("/settings") ? "default" : "ghost"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={() => router.push("/settings")}
      >
        <Settings className="h-5 w-5" />
        <span className="sr-only">Configuración</span>
      </Button>
    </div>
  )
}

