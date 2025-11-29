import { NextRequest, NextResponse } from "next/server"

// Configuración de WebPay Plus (modo integración/pruebas)
const WEBPAY_URL = process.env.WEBPAY_URL || "https://webpay3gint.transbank.cl"
const COMMERCE_CODE = process.env.WEBPAY_COMMERCE_CODE || "597055555532"
const API_KEY = process.env.WEBPAY_API_KEY || "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"

export async function POST(request: NextRequest) {
  try {
    console.log("[WebPay] Iniciando creación de transacción...")
    
    const body = await request.json()
    const { amount, sessionId, buyOrder } = body

    console.log("[WebPay] Datos recibidos:", { amount, sessionId, buyOrder })

    if (!amount || !sessionId || !buyOrder) {
      console.error("[WebPay] Faltan parámetros requeridos")
      return NextResponse.json(
        { success: false, error: "Faltan parámetros requeridos" },
        { status: 400 }
      )
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/confirm`
    console.log("[WebPay] URL de retorno:", returnUrl)

    // Crear transacción en Transbank
    const requestBody = {
      buy_order: buyOrder,
      session_id: sessionId,
      amount: amount,
      return_url: returnUrl,
    }

    console.log("[WebPay] Enviando a Transbank:", requestBody)

    const response = await fetch(`${WEBPAY_URL}/rswebpaytransaction/api/webpay/v1.2/transactions`, {
      method: "POST",
      headers: {
        "Tbk-Api-Key-Id": COMMERCE_CODE,
        "Tbk-Api-Key-Secret": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    console.log("[WebPay] Status de respuesta:", response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[WebPay] Error de Transbank:", errorData)
      throw new Error(errorData.error_message || `Error HTTP ${response.status}`)
    }

    const data = await response.json()
    console.log("[WebPay] Transacción creada exitosamente:", { token: data.token })

    return NextResponse.json({
      success: true,
      token: data.token,
      url: data.url,
    })
  } catch (error: any) {
    console.error("[WebPay] Error fatal:", error.message)
    console.error("[WebPay] Stack trace:", error.stack)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error al crear la transacción",
      },
      { status: 500 }
    )
  }
}
