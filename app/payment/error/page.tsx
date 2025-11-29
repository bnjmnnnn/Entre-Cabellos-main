"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function PaymentErrorPage() {
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
            No se pudo procesar tu pago. Por favor, intenta nuevamente.
          </p>
          
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
            <p className="text-sm text-center">
              Si el problema persiste, contacta con nuestro equipo de soporte
            </p>
          </div>

          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Volver al Inicio
              </Button>
            </Link>
            <Link href="/#productos">
              <Button variant="outline" className="w-full">
                Intentar Nuevamente
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
