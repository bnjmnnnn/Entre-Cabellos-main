import { NextRequest, NextResponse } from "next/server"

const WEBPAY_URL = process.env.WEBPAY_URL || "https://webpay3gint.transbank.cl"
const COMMERCE_CODE = process.env.WEBPAY_COMMERCE_CODE || "597055555532"
const API_KEY = process.env.WEBPAY_API_KEY || "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token no proporcionado" },
        { status: 400 }
      )
    }

    // Confirmar transacción con Transbank
    const response = await fetch(`${WEBPAY_URL}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
      method: "PUT",
      headers: {
        "Tbk-Api-Key-Id": COMMERCE_CODE,
        "Tbk-Api-Key-Secret": API_KEY,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error_message || "Error al confirmar transacción")
    }

    const commitResponse = await response.json()

    // Verificar si el pago fue aprobado
    if (commitResponse.response_code === 0) {
      return NextResponse.json({
        success: true,
        status: "approved",
        amount: commitResponse.amount,
        buyOrder: commitResponse.buy_order,
        authorizationCode: commitResponse.authorization_code,
        transactionDate: commitResponse.transaction_date,
      })
    } else {
      return NextResponse.json({
        success: false,
        status: "rejected",
        responseCode: commitResponse.response_code,
      })
    }
  } catch (error: any) {
    console.error("Error confirming WebPay transaction:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error al confirmar la transacción",
      },
      { status: 500 }
    )
  }
}

// Manejo de GET para el retorno de WebPay
export async function GET(request: NextRequest) {
  console.log("[WebPay Confirm] Recibiendo retorno desde WebPay...")
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token_ws")

  console.log("[WebPay Confirm] Token recibido:", token)

  if (!token) {
    console.error("[WebPay Confirm] No se recibió token")
    return NextResponse.redirect(new URL("/payment/error", request.url))
  }

  try {
    console.log("[WebPay Confirm] Confirmando transacción con Transbank...")
    const response = await fetch(`${WEBPAY_URL}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
      method: "PUT",
      headers: {
        "Tbk-Api-Key-Id": COMMERCE_CODE,
        "Tbk-Api-Key-Secret": API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log("[WebPay Confirm] Status de respuesta:", response.status)

    if (!response.ok) {
      console.error("[WebPay Confirm] Error HTTP:", response.status)
      return NextResponse.redirect(new URL("/payment/error", request.url))
    }

    const commitResponse = await response.json()
    console.log("[WebPay Confirm] Respuesta de Transbank:", commitResponse)

    if (commitResponse.response_code === 0) {
      console.log("[WebPay Confirm] Pago aprobado exitosamente")
      return NextResponse.redirect(
        new URL(`/payment/success?order=${commitResponse.buy_order}&amount=${commitResponse.amount}`, request.url)
      )
    } else {
      console.log("[WebPay Confirm] Pago rechazado, código:", commitResponse.response_code)
      return NextResponse.redirect(new URL("/payment/error", request.url))
    }
  } catch (error: any) {
    console.error("[WebPay Confirm] Error fatal:", error.message)
    console.error("Error in payment confirmation:", error)
    return NextResponse.redirect(new URL("/payment/error", request.url))
  }
}
