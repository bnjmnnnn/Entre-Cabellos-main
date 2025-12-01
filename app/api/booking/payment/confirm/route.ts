import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"
import { sendBookingConfirmation } from "@/lib/email"

// Helpers para mapear IDs a nombres
const SERVICES = {
  corte: "Corte de Cabello",
  barba: "Arreglo de Barba",
  "corte-barba": "Corte + Barba",
  tinte: "Tintura",
  tratamiento: "Tratamiento Capilar",
}

const BARBERS = {
  carlos: "Carlos Martínez",
  pedro: "Pedro González",
  juan: "Juan Ramírez",
}

function getServiceName(id: string): string {
  return SERVICES[id as keyof typeof SERVICES] || id
}

function getBarberName(id: string): string {
  return BARBERS[id as keyof typeof BARBERS] || id
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("es-CL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const WEBPAY_URL = process.env.WEBPAY_URL || "https://webpay3gint.transbank.cl"
const COMMERCE_CODE = process.env.WEBPAY_COMMERCE_CODE || "597055555532"
const API_KEY =
  process.env.WEBPAY_API_KEY ||
  "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token_ws")

  if (!token) {
    console.error("[Booking Confirm] No token provided")
    redirect("/booking/payment/error")
  }

  console.log("[Booking Confirm] Confirming transaction with token:", token.substring(0, 20) + "...")

  try {
    // Confirmar transacción en WebPay
    const response = await fetch(
      `${WEBPAY_URL}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
      {
        method: "PUT",
        headers: {
          "Tbk-Api-Key-Id": COMMERCE_CODE,
          "Tbk-Api-Key-Secret": API_KEY,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Booking Confirm] WebPay confirmation error:", errorText)
      redirect("/booking/payment/error")
    }

    const data = await response.json()

    console.log("[Booking Confirm] Transaction confirmed:", {
      buyOrder: data.buy_order,
      status: data.status,
      amount: data.amount,
      sessionId: data.session_id,
    })

    // Verificar que el pago fue aprobado
    if (data.status !== "AUTHORIZED") {
      console.error("[Booking Confirm] Payment not authorized:", data.status)
      redirect(`/booking/payment/error?status=${data.status}`)
    }

    // Extraer bookingId del session_id (formato: BOOKING-BK-xxx-yyy-timestamp)
    const sessionId = data.session_id || ""
    const bookingId = sessionId.replace("BOOKING-", "").split("-").slice(0, -1).join("-") || "unknown"

    console.log("[Booking Confirm] Redirecting to success with bookingId:", bookingId)

    // Obtener datos de la reserva para el email
    try {
      const bookingsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bookings`)
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        const booking = bookingsData.bookings?.find((b: any) => b.id === bookingId)
        
        if (booking) {
          // Enviar email de confirmación
          await sendBookingConfirmation({
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            serviceName: getServiceName(booking.serviceId),
            barberName: getBarberName(booking.barberId),
            date: formatDate(booking.date),
            time: booking.time,
            amount: data.amount,
            bookingId: bookingId,
          })
        }
      }
    } catch (emailError) {
      console.error('[Booking Confirm] Error sending email:', emailError)
      // No detener el flujo si falla el email
    }

    // Redirigir a página de éxito con los detalles
    redirect(
      `/booking/payment/success?bookingId=${bookingId}&order=${data.buy_order}&amount=${data.amount}`
    )
  } catch (error: any) {
    // No capturar errores de redirect de Next.js
    if (error?.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
    console.error("[Booking Confirm] Error:", error)
    redirect("/booking/payment/error")
  }
}

export async function POST(request: NextRequest) {
  // Mismo manejo para POST (por si WebPay envía POST en lugar de GET)
  return GET(request)
}
