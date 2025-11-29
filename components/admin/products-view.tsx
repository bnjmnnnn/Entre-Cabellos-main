"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Package, AlertTriangle, TrendingUp } from "lucide-react"
import { Label } from "../ui/label"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  active: boolean
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pomada Clásica Premium",
    category: "Pomadas",
    price: 15000,
    stock: 24,
    active: true,
  },
  {
    id: 2,
    name: "Cera Mate Profesional",
    category: "Ceras",
    price: 18000,
    stock: 18,
    active: true,
  },
  {
    id: 3,
    name: "Aceite para Barba",
    category: "Cuidado",
    price: 12000,
    stock: 32,
    active: true,
  },
  {
    id: 4,
    name: "Shampoo Anticaída",
    category: "Cuidado",
    price: 14000,
    stock: 15,
    active: true,
  },
  {
    id: 5,
    name: "Gel Fijador Fuerte",
    category: "Geles",
    price: 10000,
    stock: 0,
    active: false,
  },
  {
    id: 6,
    name: "Balm para Barba",
    category: "Cuidado",
    price: 13000,
    stock: 28,
    active: true,
  },
]

export function ProductsView() {
  const [products] = useState<Product[]>(mockProducts)
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif mb-2">Gestión de Productos</h1>
          <p className="text-muted-foreground">Administra el inventario de productos</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Agregar Producto
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="bg-card border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-foreground">Nuevo Producto</CardTitle>
            <CardDescription className="text-muted-foreground">Completa los datos del producto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name" className="text-foreground">
                  Nombre
                </Label>
                <input
                  id="product-name"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category" className="text-foreground">
                  Categoría
                </Label>
                <input
                  id="product-category"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price" className="text-foreground">
                  Precio
                </Label>
                <input
                  id="product-price"
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-stock" className="text-foreground">
                  Stock
                </Label>
                <input
                  id="product-stock"
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Guardar</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Productos</p>
                <p className="text-3xl font-bold text-primary font-serif">{products.length}</p>
              </div>
              <Package size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stock Bajo</p>
                <p className="text-3xl font-bold text-primary font-serif">
                  {products.filter((p) => p.stock < 20 && p.stock > 0).length}
                </p>
              </div>
              <AlertTriangle size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Más Vendidos</p>
                <p className="text-3xl font-bold text-primary font-serif">8</p>
              </div>
              <TrendingUp size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="bg-card border-2 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Inventario</CardTitle>
          <CardDescription className="text-muted-foreground">Lista completa de productos disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Producto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Categoría</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Precio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-foreground">#{product.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{product.category}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">${product.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      <span
                        className={product.stock === 0 ? "text-destructive" : product.stock < 20 ? "text-primary" : ""}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          product.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }
                      >
                        {product.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Editar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
