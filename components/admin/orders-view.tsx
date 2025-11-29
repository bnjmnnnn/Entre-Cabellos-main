import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

const mockOrders = [
  {
    id: 1,
    date: "2025-01-14",
    client: "Carlos Rodríguez",
    clientEmail: "carlos@email.com",
    products: ["Pomada Clásica Premium", "Aceite para Barba"],
    total: 27000,
    status: "pagado",
    delivery: "pendiente",
  },
  {
    id: 2,
    date: "2025-01-14",
    client: "Miguel Torres",
    clientEmail: "miguel@email.com",
    products: ["Cera Mate Profesional"],
    total: 18000,
    status: "pagado",
    delivery: "entregado",
  },
  {
    id: 3,
    date: "2025-01-15",
    client: "Diego Fernández",
    clientEmail: "diego@email.com",
    products: ["Shampoo Anticaída", "Balm para Barba"],
    total: 27000,
    status: "pendiente",
    delivery: "pendiente",
  },
  {
    id: 4,
    date: "2025-01-15",
    client: "Juan Pérez",
    clientEmail: "juan@email.com",
    products: ["Pomada Clásica Premium", "Cera Mate Profesional"],
    total: 33000,
    status: "pagado",
    delivery: "en-camino",
  },
]

export function OrdersView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pagado":
        return "bg-primary text-primary-foreground"
      case "pendiente":
        return "bg-secondary text-secondary-foreground"
      case "entregado":
        return "bg-primary text-primary-foreground"
      case "en-camino":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif mb-2">Gestión de Pedidos</h1>
        <p className="text-muted-foreground">Administra las ventas de productos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Ventas</p>
                <p className="text-3xl font-bold text-primary font-serif">$105K</p>
              </div>
              <DollarSign size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pedidos Hoy</p>
                <p className="text-3xl font-bold text-primary font-serif">12</p>
              </div>
              <ShoppingBag size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crecimiento</p>
                <p className="text-3xl font-bold text-primary font-serif">+24%</p>
              </div>
              <TrendingUp size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="bg-card border-2 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Pedidos Recientes</CardTitle>
          <CardDescription className="text-muted-foreground">Lista de todos los pedidos de productos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Productos</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Estado Pago</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Entrega</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-foreground">#{order.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.client}</p>
                        <p className="text-xs text-muted-foreground">{order.clientEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-foreground">{order.products.join(", ")}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(order.date).toLocaleDateString("es-CL")}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">${order.total.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(order.delivery)}>{order.delivery}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Ver
                      </Button>
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
