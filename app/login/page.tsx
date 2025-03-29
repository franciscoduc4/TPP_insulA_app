"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Función para usar credenciales de demostración
  const useDemoCredentials = () => {
    setFormData({
      email: "demo@insula.com",
      password: "demo123",
      rememberMe: false,
    })
  }

  // Función para manejar el cambio de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  // Función para validar el formulario
  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Validar email
    if (!formData.email) {
      newErrors.email = "El email es requerido"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
      valid = false
    } else {
      newErrors.email = ""
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
      valid = false
    } else {
      newErrors.password = ""
    }

    setErrors(newErrors)
    return valid
  }

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      try {
        // Simulación de una llamada a la API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulamos un inicio de sesión exitoso
        console.log("Inicio de sesión exitoso:", formData)

        // Redirigir al dashboard después de un inicio de sesión exitoso
        router.push("/dashboard")
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general: "Credenciales inválidas. Por favor, inténtalo de nuevo.",
        }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary mr-2"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
          </svg>
          <h1 className="text-3xl font-bold text-primary">insulA</h1>
        </div>
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
            <CardDescription className="text-center">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-md text-sm">{errors.general}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                  Recordarme
                </Label>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">O</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={useDemoCredentials}
              >
                Usar credenciales de demostración
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              <p>
                ¿No tienes una cuenta?{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

