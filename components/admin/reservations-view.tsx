import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Calendar, Clock, User } from "lucide-react"

const mockReservations = [
  {
    id: 1,
    date: "2025-12-02",
    time: "12:00",
    service: "Corte + Barba",
    barber: "Carlos Muñoz",
    client: "Benjamín Fernández",
    clientEmail: "bfernandezt@utem.cl",
    status: "confirmada",
    price: 18000,
  }
]

export function ReservationsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-primary text-primary-foreground"
      case "pendiente":
        return "bg-secondary text-secondary-foreground"
      case "cancelada":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif mb-2">Gestión de Reservas</h1>
        <p className="text-muted-foreground">Administra y confirma las reservas de tus clientes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hoy</p>
                <p className="text-3xl font-bold text-primary font-serif">8</p>
              </div>
              <Calendar size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-3xl font-bold text-primary font-serif">3</p>
              </div>
              <Clock size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Esta Semana</p>
                <p className="text-3xl font-bold text-primary font-serif">24</p>
              </div>
              <User size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservations Table */}
      <Card className="bg-card border-2 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Reservas Recientes</CardTitle>
          <CardDescription className="text-muted-foreground">Lista de todas las reservas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Servicio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Barbero</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Hora</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Precio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-foreground">#{reservation.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{reservation.client}</p>
                        <p className="text-xs text-muted-foreground">{reservation.clientEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{reservation.service}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{reservation.barber}</td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(reservation.date).toLocaleDateString("es-CL")}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{reservation.time}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">
                      ${reservation.price.toLocaleString()}
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
