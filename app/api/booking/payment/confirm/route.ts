import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"

const WEBPAY_URL = process.env.WEBPAY_URL || "https://webpay3gint.transbank.cl"
const COMMERCE_CODE = process.env.WEBPAY_COMMERCE_CODE || "597055555532"
const API_KEY =
  process.env.WEBPAY_API_KEY ||
  "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token_ws")

    if (!token) {
      console.error("[Booking Confirm] No token provided")
      redirect("/booking/payment/error")
    }

    console.log("[Booking Confirm] Confirming transaction with token:", token.substring(0, 20) + "...")

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
    })

    // Verificar que el pago fue aprobado
    if (data.status !== "AUTHORIZED") {
      console.error("[Booking Confirm] Payment not authorized:", data.status)
      redirect(`/booking/payment/error?status=${data.status}`)
    }

    // Extraer bookingId del session_id
    const bookingId = data.session_id?.split("-")[1] || "unknown"

    // Redirigir a página de éxito con los detalles
    redirect(
      `/booking/payment/success?bookingId=${bookingId}&order=${data.buy_order}&amount=${data.amount}`
    )
  } catch (error) {
    console.error("[Booking Confirm] Error:", error)
    redirect("/booking/payment/error")
  }
}

export async function POST(request: NextRequest) {
  // Mismo manejo para POST (por si WebPay envía POST en lugar de GET)
  return GET(request)
}
