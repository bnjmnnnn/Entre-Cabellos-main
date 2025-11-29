"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

export function Products() {
  const { addToCart } = useCart()

  return (
    <section id="productos" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Productos Premium</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Cuida tu estilo en casa con productos profesionales seleccionados
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-2 border-border hover:border-primary transition-all duration-300 group overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-secondary/30">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!product.inStock && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">Agotado</Badge>
                )}
                {product.inStock && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Disponible</Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2 text-primary border-primary">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-xl text-foreground">{product.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground text-pretty">{product.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary font-serif">${product.price.toLocaleString()}</span>
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus size={16} className="mr-1" />
                    Agregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">Todos nuestros productos son de grado profesional</p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Ver catálogo completo →
          </Button>
        </div>
      </div>
    </section>
  )
}
