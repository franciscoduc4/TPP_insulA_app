"use client"

import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigationHistory } from "@/hooks/useNavigationHistory"

export function BackButton() {
  const router = useRouter()
  const pathname = usePathname()
  const { canGoBack, getPreviousPath } = useNavigationHistory()

  // Hide the button on the dashboard
  if (pathname === "/") return null

  const handleBack = () => {
    if (canGoBack) {
      const previousPath = getPreviousPath()
      // Si la página anterior es el login, no hacer nada
      if (previousPath === "/login") return
      router.push(previousPath)
    } else {
      // Si no hay página anterior, ir al dashboard
      router.push("/dashboard")
    }
  }

  return (
    <Button variant="ghost" onClick={handleBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
    </Button>
  )
}

