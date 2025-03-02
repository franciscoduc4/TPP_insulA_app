"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

// Types for our chat messages
type MessageType = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  showSuggestions?: boolean
}

// Pre-written suggested questions
const suggestedQuestions = [
  "Control de niveles de glucosa",
  "Qué hacer si el azúcar está alto",
  "Rangos ideales de glucosa",
  "Ejercicios recomendados",
  "Ejercicio y niveles de glucosa",
  "Alimentos a evitar",
]

// Mock AI responses - in a real app, these would come from an AI service
const getAIResponse = (question: string): string => {
  const responses: Record<string, string> = {
    "Control de niveles de glucosa":
      "Para controlar mejor tus niveles de glucosa, es importante mantener una alimentación equilibrada, hacer ejercicio regularmente, tomar tus medicamentos según lo prescrito, y monitorear tus niveles de glucosa. También es útil llevar un registro de tus comidas y actividades para identificar patrones.",
    "Qué hacer si el azúcar está alto":
      "Si tu nivel de azúcar está muy alto (hiperglucemia), debes beber agua para mantenerte hidratado, hacer ejercicio ligero si es posible, y seguir tu plan de medicación. Si los niveles son extremadamente altos o persisten, contacta a tu médico inmediatamente.",
    "Rangos ideales de glucosa":
      "Los rangos ideales de glucosa varían según la persona, pero generalmente se recomienda entre 80-130 mg/dL antes de las comidas y menos de 180 mg/dL después de las comidas. Tu médico puede establecer rangos específicos para ti basados en tu situación particular.",
    "Ejercicios recomendados":
      "Los ejercicios aeróbicos como caminar, nadar, o andar en bicicleta son excelentes para personas con diabetes. También se recomienda incluir entrenamiento de fuerza 2-3 veces por semana. Siempre consulta con tu médico antes de comenzar un nuevo régimen de ejercicios.",
    "Ejercicio y niveles de glucosa":
      "El ejercicio generalmente disminuye los niveles de glucosa al aumentar la sensibilidad a la insulina. Sin embargo, el ejercicio intenso puede temporalmente aumentar la glucosa. Es importante monitorear tus niveles antes, durante y después del ejercicio, especialmente si usas insulina.",
    "Alimentos a evitar":
      "Es recomendable limitar alimentos con alto contenido de azúcares añadidos, carbohidratos refinados, grasas saturadas y sodio. Esto incluye bebidas azucaradas, dulces, pasteles, frituras y alimentos procesados. Consulta con un nutricionista para un plan personalizado.",
  }

  return (
    responses[question] ||
    "Lo siento, no tengo información específica sobre esa pregunta. ¿Podrías reformularla o preguntar algo más?"
  )
}

export function ChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: "Hola, soy tu asistente de salud. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date(),
      showSuggestions: true,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full sm:w-[400px] h-[600px] max-h-[80vh] bg-background rounded-t-lg sm:rounded-lg shadow-lg flex flex-col overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-semibold">Asistente de Salud</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>

            {/* Chat content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2",
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  {message.showSuggestions && (
                    <div className="grid grid-cols-1 gap-1.5 px-2">
                      {suggestedQuestions.map((question) => (
                        <Button
                          key={question}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-1.5 px-2.5 text-sm font-normal bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                          onClick={() => handleSendMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" size="icon" className="rounded-full">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

