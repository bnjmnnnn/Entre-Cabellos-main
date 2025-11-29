import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Users, UserCheck, TrendingUp } from "lucide-react"

const mockClients = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "+56 9 1234 5678",
    lastVisit: "2025-01-10",
    totalVisits: 24,
    totalSpent: 432000,
    status: "vip",
  },
  {
    id: 2,
    name: "Miguel Torres",
    email: "miguel@email.com",
    phone: "+56 9 2345 6789",
    lastVisit: "2025-01-12",
    totalVisits: 18,
    totalSpent: 324000,
    status: "regular",
  },
  {
    id: 3,
    name: "Diego Fernández",
    email: "diego@email.com",
    phone: "+56 9 3456 7890",
    lastVisit: "2025-01-14",
    totalVisits: 15,
    totalSpent: 270000,
    status: "regular",
  },
  {
    id: 4,
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+56 9 4567 8901",
    lastVisit: "2025-01-15",
    totalVisits: 3,
    totalSpent: 54000,
    status: "nuevo",
  },
]

export function ClientsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-primary text-primary-foreground"
      case "regular":
        return "bg-secondary text-secondary-foreground"
      case "nuevo":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif mb-2">Gestión de Clientes</h1>
        <p className="text-muted-foreground">Base de datos de clientes y su historial</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
                <p className="text-3xl font-bold text-primary font-serif">328</p>
              </div>
              <Users size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activos Este Mes</p>
                <p className="text-3xl font-bold text-primary font-serif">156</p>
              </div>
              <UserCheck size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nuevos Este Mes</p>
                <p className="text-3xl font-bold text-primary font-serif">+42</p>
              </div>
              <TrendingUp size={32} className="text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="bg-card border-2 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Base de Clientes</CardTitle>
          <CardDescription className="text-muted-foreground">
            Información completa de todos los clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Teléfono</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Última Visita</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Visitas</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Total Gastado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockClients.map((client) => (
                  <tr key={client.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-foreground">#{client.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{client.phone}</td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(client.lastVisit).toLocaleDateString("es-CL")}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{client.totalVisits}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">
                      ${client.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
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
