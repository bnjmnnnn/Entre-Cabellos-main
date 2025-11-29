"use client"

import { useState } from "react"
import { AdminSidebar } from "../../components/admin/sidebar"
import { ReservationsView } from "../../components/admin/reservations-view"
import { OrdersView } from "../../components/admin/orders-view"
import { ClientsView } from "../../components/admin/clients-view"
import { ProductsView } from "../../components/admin/products-view"
import { SettingsView } from "../../components/admin/settings-view"

export default function AdminPage() {
  const [activeView, setActiveView] = useState("reservations")

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Main Content */}
        <main className="flex-1 p-8 ml-64">
          {activeView === "reservations" && <ReservationsView />}
          {activeView === "orders" && <OrdersView />}
          {activeView === "clients" && <ClientsView />}
          {activeView === "products" && <ProductsView />}
          {activeView === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  )
}
