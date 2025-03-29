"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    glucoseState: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    glucoseState: "",
  })

  // Función para validar el primer paso
  const validateStep1 = () => {
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
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
      valid = false
    } else {
      newErrors.password = ""
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
      valid = false
    } else {
      newErrors.confirmPassword = ""
    }

    setErrors(newErrors)
    return valid
  }

  // Función para validar el segundo paso
  const validateStep2 = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.glucoseState) {
      newErrors.glucoseState = "Por favor selecciona una opción"
      valid = false
    } else {
      newErrors.glucoseState = ""
    }

    setErrors(newErrors)
    return valid
  }

  // Función para manejar el cambio de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Función para manejar el cambio en el RadioGroup
  const handleGlucoseStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, glucoseState: value }))
  }

  // Función para avanzar al siguiente paso
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  // Función para enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      handleNextStep()
    } else if (step === 2 && validateStep2()) {
      // Aquí iría la lógica para enviar los datos al backend
      console.log("Datos enviados:", formData)

      // Redirigir al login después de un registro exitoso
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light p-4">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Crear cuenta</CardTitle>
            <CardDescription className="text-center">
              {step === 1 ? "Ingresa tus datos para crear una cuenta" : "Información sobre tu estado de salud"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
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
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="font-medium text-gray-700">¿Cuál es tu estado glucémico habitual?</h3>
                    <p className="text-sm text-gray-500 mt-1">Esta información nos ayudará a personalizar tu experiencia</p>
                  </div>

                  <RadioGroup value={formData.glucoseState} onValueChange={handleGlucoseStateChange} className="space-y-3">
                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="hyperglycemic" id="hyperglycemic" />
                      <Label htmlFor="hyperglycemic" className="flex-1 cursor-pointer">
                        Hiperglucémico (niveles altos de azúcar)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="hypoglycemic" id="hypoglycemic" />
                      <Label htmlFor="hypoglycemic" className="flex-1 cursor-pointer">
                        Hipoglucémico (niveles bajos de azúcar)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                        Estado intermedio (niveles controlados)
                      </Label>
                    </div>
                  </RadioGroup>

                  {errors.glucoseState && <p className="text-red-500 text-sm">{errors.glucoseState}</p>}
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                {step === 1 ? "Continuar" : "Crear cuenta"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              {step === 1 ? (
                <p>
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Iniciar sesión
                  </Link>
                </p>
              ) : (
                <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700">
                  Volver atrás
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

