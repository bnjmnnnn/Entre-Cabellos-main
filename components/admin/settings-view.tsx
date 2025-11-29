import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Settings, Bell, Lock, User } from "lucide-react"

export function SettingsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif mb-2">Configuración</h1>
        <p className="text-muted-foreground">Ajusta las preferencias del sistema</p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* General Settings */}
        <Card className="bg-card border-2 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Settings size={20} className="mr-2 text-primary" />
              Configuración General
            </CardTitle>
            <CardDescription className="text-muted-foreground">Información básica de la barbería</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shop-name" className="text-foreground">
                  Nombre de la Barbería
                </Label>
                <input
                  id="shop-name"
                  type="text"
                  defaultValue="Entre Cabellos"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-phone" className="text-foreground">
                  Teléfono
                </Label>
                <input
                  id="shop-phone"
                  type="tel"
                  defaultValue="+56 9 1234 5678"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-email" className="text-foreground">
                  Email
                </Label>
                <input
                  id="shop-email"
                  type="email"
                  defaultValue="info@entrecabellos.cl"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-address" className="text-foreground">
                  Dirección
                </Label>
                <input
                  id="shop-address"
                  type="text"
                  defaultValue="Av. Providencia 1234"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Guardar Cambios</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card border-2 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Bell size={20} className="mr-2 text-primary" />
              Notificaciones
            </CardTitle>
            <CardDescription className="text-muted-foreground">Gestiona las notificaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email de nuevas reservas</p>
                <p className="text-sm text-muted-foreground">Recibe notificaciones por email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificaciones de pedidos</p>
                <p className="text-sm text-muted-foreground">Alertas de nuevos pedidos de productos</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Stock bajo</p>
                <p className="text-sm text-muted-foreground">Avisar cuando el stock esté bajo</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-card border-2 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <User size={20} className="mr-2 text-primary" />
              Gestión de Usuarios
            </CardTitle>
            <CardDescription className="text-muted-foreground">Administra permisos y accesos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-foreground">
                Email Administrador
              </Label>
              <input
                id="admin-email"
                type="email"
                defaultValue="admin@entrecabellos.cl"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              />
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Agregar Barbero
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card border-2 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Lock size={20} className="mr-2 text-primary" />
              Seguridad
            </CardTitle>
            <CardDescription className="text-muted-foreground">Opciones de seguridad y contraseña</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Cambiar Contraseña
            </Button>
            <Button variant="outline" className="border-border text-muted-foreground hover:bg-secondary bg-transparent">
              Habilitar Autenticación 2FA
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
