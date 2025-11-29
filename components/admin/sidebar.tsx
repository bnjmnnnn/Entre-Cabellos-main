"use client"

import Link from "next/link"
import { Calendar, ShoppingBag, Users, Package, Settings, Home } from "lucide-react"

interface AdminSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AdminSidebar({ activeView, setActiveView }: AdminSidebarProps) {
  const menuItems = [
    { id: "reservations", label: "Reservas", icon: Calendar },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "products", label: "Productos", icon: Package },
    { id: "settings", label: "Configuración", icon: Settings },
  ]

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-secondary border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold text-primary">Entre Cabellos</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Panel de Administración</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Home size={20} />
          <span>Volver al sitio</span>
        </Link>

        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
