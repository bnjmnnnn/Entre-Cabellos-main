"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, AlertTriangle } from "lucide-react"

export default function BookingPaymentErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle size={64} className="text-destructive" />
          </div>
          <CardTitle className="text-2xl">Error en el Pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            No se pudo procesar tu pago para la reserva. Tu cita no ha sido confirmada.
          </p>
          
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle size={20} className="text-destructive mt-0.5 shrink-0" />
              <div className="text-sm space-y-1">
                <p className="font-semibold">Posibles causas:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Fondos insuficientes</li>
                  <li>Datos de tarjeta incorrectos</li>
                  <li>Transacción rechazada por el banco</li>
                  <li>Sesión expirada</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/#reserva">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Intentar Nuevamente
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Volver al Inicio
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              ¿Necesitas ayuda? Contáctanos:
            </p>
            <p className="text-sm font-medium">
              +56 9 1234 5678 • info@entrecabellos.cl
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
