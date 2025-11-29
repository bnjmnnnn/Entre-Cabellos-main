"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Pomada Clásica Premium",
    description: "Fijación fuerte con acabado natural. Ideal para estilos clásicos.",
    price: 15000,
    image: "/placeholder.svg?key=pbdyi",
    category: "Pomadas",
    inStock: true,
  },
  {
    id: 2,
    name: "Cera Mate Profesional",
    description: "Cera de acabado mate con fijación media. Perfecta para looks despeinados.",
    price: 18000,
    image: "/placeholder.svg?key=zqoew",
    category: "Ceras",
    inStock: true,
  },
  {
    id: 3,
    name: "Aceite para Barba",
    description: "Aceite natural que suaviza e hidrata. Con aroma de madera de cedro.",
    price: 12000,
    image: "/placeholder.svg?key=gnmct",
    category: "Cuidado",
    inStock: true,
  },
  {
    id: 4,
    name: "Shampoo Anticaída",
    description: "Fortalece el cabello y previene la caída. Con biotina y keratina.",
    price: 14000,
    image: "/placeholder.svg?key=clzts",
    category: "Cuidado",
    inStock: true,
  },
  {
    id: 5,
    name: "Gel Fijador Fuerte",
    description: "Fijación extrema todo el día. No deja residuos blancos.",
    price: 10000,
    image: "/placeholder.svg?key=zvdwf",
    category: "Geles",
    inStock: false,
  },
  {
    id: 6,
    name: "Balm para Barba",
    description: "Bálsamo acondicionador que doma y perfuma tu barba.",
    price: 13000,
    image: "/placeholder.svg?key=hvnkc",
    category: "Cuidado",
    inStock: true,
  },
]

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, getTotalItems, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const getCartItems = () => {
    return cart.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return { ...product, quantity: item.quantity }
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const handleCheckout = async () => {
    try {
      console.log("[Cart] Iniciando checkout...")
      // Generar orden de compra única
      const buyOrder = `ORDER-${Date.now()}`
      const sessionId = `SESSION-${Math.random().toString(36).substring(7)}`
      const totalAmount = getTotalPrice()

      console.log("[Cart] Datos del pedido:", { buyOrder, sessionId, totalAmount })

      // Llamar a la API para crear transacción en WebPay
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          sessionId: sessionId,
          buyOrder: buyOrder,
        }),
      })

      console.log("[Cart] Status de respuesta:", response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[Cart] Respuesta de API:", data)

      if (data.success) {
        console.log("[Cart] Redirigiendo a WebPay con token:", data.token)
        // Crear formulario para redirigir a WebPay
        const form = document.createElement("form")
        form.method = "POST"
        form.action = data.url
        
        const tokenInput = document.createElement("input")
        tokenInput.type = "hidden"
        tokenInput.name = "token_ws"
        tokenInput.value = data.token
        
        form.appendChild(tokenInput)
        document.body.appendChild(form)
        form.submit()
      } else {
        console.error("[Cart] Error en respuesta:", data.error)
        alert(`Error al procesar el pago: ${data.error}`)
      }
    } catch (error: any) {
      console.error("[Cart] Error fatal en checkout:", error)
      alert(`Error al procesar el pago: ${error.message || "Error desconocido"}`)
    }
  }

  if (getTotalItems() === 0) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent relative"
        >
          <ShoppingCart size={20} className="mr-2" />
          <span className="hidden sm:inline">Carrito</span>
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
            {getTotalItems()}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {getTotalItems()} producto(s) en tu carrito
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {getCartItems().map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border rounded-lg bg-card"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="text-primary font-bold mt-1">
                    ${item.price?.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item.id!)}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id!, -1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id!, 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">${getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío:</span>
              <span className="font-semibold">Gratis</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>

          <SheetFooter className="flex-col gap-2">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleCheckout}
            >
              Proceder al Pago
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Seguir Comprando
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
