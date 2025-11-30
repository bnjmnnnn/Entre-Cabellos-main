import { NextRequest, NextResponse } from "next/server"

const WEBPAY_URL = process.env.WEBPAY_URL || "https://webpay3gint.transbank.cl"
const COMMERCE_CODE = process.env.WEBPAY_COMMERCE_CODE || "597055555532"
const API_KEY =
  process.env.WEBPAY_API_KEY ||
  "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, amount, customerEmail, serviceDetails } = body

    console.log("[Booking Payment] Creating transaction:", {
      bookingId,
      amount,
      customerEmail,
    })

    // Generar session ID y buy order únicos para la reserva
    const sessionId = `BOOKING-${bookingId}-${Date.now()}`
    const buyOrder = `BK-${Date.now()}`

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const returnUrl = `${baseUrl}/api/booking/payment/confirm`

    // Crear transacción en WebPay
    const response = await fetch(`${WEBPAY_URL}/rswebpaytransaction/api/webpay/v1.2/transactions`, {
      method: "POST",
      headers: {
        "Tbk-Api-Key-Id": COMMERCE_CODE,
        "Tbk-Api-Key-Secret": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buy_order: buyOrder,
        session_id: sessionId,
        amount: amount,
        return_url: returnUrl,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Booking Payment] WebPay API Error:", errorText)
      return NextResponse.json(
        { success: false, error: "Error al crear transacción en WebPay" },
        { status: 500 }
      )
    }

    const data = await response.json()

    console.log("[Booking Payment] Transaction created successfully:", {
      token: data.token?.substring(0, 20) + "...",
      url: data.url,
    })

    return NextResponse.json({
      success: true,
      token: data.token,
      url: data.url,
      sessionId,
      buyOrder,
    })
  } catch (error) {
    console.error("[Booking Payment] Error:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
