"use client"

export const dynamic = "force-dynamic"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Clock } from "lucide-react"
import { useBooking } from "@/contexts/BookingContext"

function BookingPaymentSuccessContent() {
  const searchParams = useSearchParams()
  const { updatePaymentStatus, updateBookingStatus } = useBooking()
  
  const bookingId = searchParams.get("bookingId") || ""
  const order = searchParams.get("order") || ""
  const amount = searchParams.get("amount") || ""

  useEffect(() => {
    // Actualizar estado de la reserva cuando el pago es exitoso
    if (bookingId) {
      console.log("[Success Page] Updating booking:", bookingId)
      updatePaymentStatus(bookingId, "paid")
      updateBookingStatus(bookingId, "confirmed")
    }
  }, [bookingId, updatePaymentStatus, updateBookingStatus])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <CardTitle className="text-2xl">¡Reserva Confirmada!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Tu pago ha sido procesado y tu reserva está confirmada
          </p>
          
          {bookingId && (
            <div className="bg-secondary p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID de Reserva:</span>
                <span className="font-semibold">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orden de Pago:</span>
                <span className="font-semibold">{order}</span>
              </div>
              {amount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto:</span>
                  <span className="font-semibold text-primary text-lg">
                    ${Number(amount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-primary" />
              <span>Te enviaremos un email de confirmación</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-primary" />
              <span>Recuerda llegar 5 minutos antes de tu cita</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Volver al Inicio
              </Button>
            </Link>
            <Link href="/#reserva">
              <Button variant="outline" className="w-full">
                Hacer otra Reserva
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Si tienes alguna pregunta, contáctanos por WhatsApp o email
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookingPaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <BookingPaymentSuccessContent />
    </Suspense>
  )
}
