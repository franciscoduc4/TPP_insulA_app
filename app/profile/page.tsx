"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Edit2, Link as LinkIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BackButton } from "@/components/back-button"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "María García",
    email: "maria.garcia@example.com",
    phone: "+34 123 456 789",
    birthdate: "1985-03-15",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile data:", profileData)
    setIsEditing(false)
  }

  const handleConnectDevice = () => {
    // Here you would implement the logic to connect to diabetes management systems
    console.log("Connecting to diabetes management system")
  }

  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión (limpiar tokens, etc.)
    console.log("Cerrando sesión...")
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton />
          <div className="flex items-center space-x-2">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? "Cancelar" : "Editar Perfil"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Perfil de Usuario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img src="/placeholder.svg" alt="Profile" className="rounded-full w-32 h-32 object-cover" />
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={() => console.log("Change profile picture")}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  value={profileData.birthdate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <Button className="w-full" onClick={handleSave}>
                Guardar Cambios
              </Button>
            )}

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Dispositivos Conectados</h3>
              <Button variant="outline" className="w-full" onClick={handleConnectDevice}>
                <LinkIcon className="mr-2 h-4 w-4" />
                Conectar Dispositivo de Diabetes
              </Button>
            </div>

            <Separator />

            <div className="flex justify-center">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full"
              >
                Cerrar Sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

