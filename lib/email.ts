import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingEmailData {
  customerName: string
  customerEmail: string
  serviceName: string
  barberName: string
  date: string
  time: string
  amount: number
  bookingId: string
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Entre Cabellos <onboarding@resend.dev>', // Cambiar cuando tengas dominio
      to: [data.customerEmail],
      subject: '✅ Reserva Confirmada - Entre Cabellos',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #667eea; }
            .total { font-size: 1.2em; font-weight: bold; color: #667eea; margin-top: 15px; }
            .footer { text-align: center; color: #888; font-size: 0.9em; margin-top: 20px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🪒 Entre Cabellos</h1>
              <p>¡Tu reserva ha sido confirmada!</p>
            </div>
            <div class="content">
              <p>Hola <strong>${data.customerName}</strong>,</p>
              <p>Tu pago ha sido procesado exitosamente y tu reserva está confirmada.</p>
              
              <div class="details">
                <h2 style="color: #667eea; margin-top: 0;">Detalles de tu Reserva</h2>
                <div class="detail-row">
                  <span class="detail-label">Servicio:</span>
                  <span>${data.serviceName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Barbero:</span>
                  <span>${data.barberName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Fecha:</span>
                  <span>${data.date}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Hora:</span>
                  <span>${data.time}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ID de Reserva:</span>
                  <span>${data.bookingId}</span>
                </div>
                <div class="total">
                  Total pagado: $${data.amount.toLocaleString('es-CL')}
                </div>
              </div>
              
              <p><strong>📍 Dirección:</strong> Calle Ejemplo 123, Santiago</p>
              <p><strong>⏰ Importante:</strong> Por favor llega 5 minutos antes de tu hora reservada.</p>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}" class="button">Visitar nuestro sitio</a>
              </center>
              
              <div class="footer">
                <p>Si tienes alguna consulta, contáctanos:</p>
                <p>📧 info@entrecabellos.cl | 📱 +56 9 1234 5678</p>
                <p style="font-size: 0.8em; color: #999;">Este correo fue enviado porque realizaste una reserva en Entre Cabellos</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[Email] Error sending confirmation:', error)
      return { success: false, error }
    }

    console.log('[Email] Confirmation sent successfully:', emailData?.id)
    return { success: true, data: emailData }
  } catch (error) {
    console.error('[Email] Exception:', error)
    return { success: false, error }
  }
}
