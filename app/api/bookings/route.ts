import { NextRequest, NextResponse } from "next/server"

// En producción real, esto debería estar en una base de datos
// Por ahora usamos una variable global (se perderá al reiniciar el servidor)
let bookings: any[] = []

export async function GET(request: NextRequest) {
  try {
    console.log(`[Bookings API] GET - Total bookings: ${bookings.length}`)
    return NextResponse.json({ success: true, bookings })
  } catch (error) {
    console.error("[Bookings API] GET Error:", error)
    return NextResponse.json({ success: false, error: "Error al obtener reservas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json()
    
    // Validar que no exista ya una reserva para ese horario
    const exists = bookings.some(
      (b) =>
        b.barberId === booking.barberId &&
        b.date === booking.date &&
        b.time === booking.time &&
        (b.status === "confirmed" || b.status === "pending") &&
        b.paymentStatus !== "failed"
    )

    if (exists) {
      return NextResponse.json(
        { success: false, error: "Este horario ya está reservado" },
        { status: 409 }
      )
    }

    bookings.push(booking)
    console.log(`[Bookings API] POST - New booking: ${booking.id}`)
    
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("[Bookings API] POST Error:", error)
    return NextResponse.json({ success: false, error: "Error al crear reserva" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status, paymentStatus } = await request.json()
    
    const bookingIndex = bookings.findIndex((b) => b.id === id)
    
    if (bookingIndex === -1) {
      return NextResponse.json({ success: false, error: "Reserva no encontrada" }, { status: 404 })
    }

    if (status !== undefined) {
      bookings[bookingIndex].status = status
    }
    if (paymentStatus !== undefined) {
      bookings[bookingIndex].paymentStatus = paymentStatus
    }

    console.log(`[Bookings API] PUT - Updated booking: ${id}`)
    
    return NextResponse.json({ success: true, booking: bookings[bookingIndex] })
  } catch (error) {
    console.error("[Bookings API] PUT Error:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar reserva" }, { status: 500 })
  }
}
