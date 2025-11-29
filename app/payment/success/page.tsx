"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState({ order: "", amount: "" })

  useEffect(() => {
    setOrderDetails({
      order: searchParams.get("order") || "",
      amount: searchParams.get("amount") || "",
    })
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <CardTitle className="text-2xl">¡Pago Exitoso!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Tu pago ha sido procesado correctamente
          </p>
          
          {orderDetails.order && (
            <div className="bg-secondary p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orden:</span>
                <span className="font-semibold">{orderDetails.order}</span>
              </div>
              {orderDetails.amount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto:</span>
                  <span className="font-semibold">${Number(orderDetails.amount).toLocaleString()}</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Volver al Inicio
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Recibirás un correo de confirmación con los detalles de tu compra
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
