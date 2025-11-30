"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

export interface Booking {
  id: string
  serviceId: string
  barberId: string
  date: string // ISO date string
  time: string
  customerName: string
  customerEmail: string
  customerPhone: string
  status: "pending" | "confirmed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  amount: number
  createdAt: string
}

interface BookingContextType {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking
  updateBookingStatus: (id: string, status: Booking["status"]) => void
  updatePaymentStatus: (id: string, paymentStatus: Booking["paymentStatus"]) => void
  isTimeSlotAvailable: (barberId: string, date: string, time: string) => boolean
  getBookedSlots: (barberId: string, date: string) => string[]
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

const STORAGE_KEY = "entre-cabellos-bookings"

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar reservas desde localStorage al iniciar
  useEffect(() => {
    const loadBookings = async () => {
      try {
        // Primero intentar cargar desde la API
        const response = await fetch("/api/bookings")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.bookings) {
            setBookings(data.bookings)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.bookings))
            setIsLoaded(true)
            return
          }
        }
      } catch (error) {
        console.log("API not available, loading from localStorage")
      }

      // Si la API falla, cargar desde localStorage como fallback
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setBookings(parsed)
        }
      } catch (error) {
        console.error("Error loading bookings from localStorage:", error)
      }
      setIsLoaded(true)
    }

    loadBookings()
  }, [])

  // Guardar reservas en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
      } catch (error) {
        console.error("Error saving bookings to localStorage:", error)
      }
    }
  }, [bookings, isLoaded])

  // Limpiar reservas pendientes antiguas (más de 15 minutos)
  useEffect(() => {
    if (!isLoaded) return

    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      const fifteenMinutes = 15 * 60 * 1000

      setBookings((prev) =>
        prev.filter((booking) => {
          if (booking.status === "pending" && booking.paymentStatus === "pending") {
            const bookingTime = new Date(booking.createdAt).getTime()
            const isExpired = now - bookingTime > fifteenMinutes
            if (isExpired) {
              console.log(`Cleaning up expired booking: ${booking.id}`)
            }
            return !isExpired
          }
          return true
        })
      )
    }, 60000) // Verificar cada minuto

    return () => clearInterval(cleanupInterval)
  }, [isLoaded])

  // Recargar reservas desde la API periódicamente para sincronizar
  useEffect(() => {
    if (!isLoaded) return

    const syncInterval = setInterval(async () => {
      try {
        const response = await fetch("/api/bookings")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.bookings) {
            setBookings(data.bookings)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.bookings))
          }
        }
      } catch (error) {
        console.error("Error syncing bookings from API:", error)
      }
    }, 30000) // Sincronizar cada 30 segundos

    return () => clearInterval(syncInterval)
  }, [isLoaded])

  const addBooking = useCallback((booking: Omit<Booking, "id" | "createdAt">): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    
    // Actualizar estado local inmediatamente
    setBookings((prev) => [...prev, newBooking])
    
    // Sincronizar con la API en segundo plano
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    }).catch((error) => {
      console.error("Error syncing booking to API:", error)
    })
    
    return newBooking
  }, [])

  const updateBookingStatus = useCallback((id: string, status: Booking["status"]) => {
    console.log(`[BookingContext] Updating status for ${id} to ${status}`)
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    )
    
    // Sincronizar con la API
    fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch((error) => {
      console.error("Error syncing status to API:", error)
    })
  }, [])

  const updatePaymentStatus = useCallback((id: string, paymentStatus: Booking["paymentStatus"]) => {
    console.log(`[BookingContext] Updating payment status for ${id} to ${paymentStatus}`)
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, paymentStatus } : booking))
    )
    
    // Sincronizar con la API
    fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, paymentStatus }),
    }).catch((error) => {
      console.error("Error syncing payment status to API:", error)
    })
  }, [])

  const isTimeSlotAvailable = useCallback((barberId: string, date: string, time: string): boolean => {
    return !bookings.some(
      (booking) =>
        booking.barberId === barberId &&
        booking.date === date &&
        booking.time === time &&
        (booking.status === "confirmed" || booking.status === "pending") &&
        booking.paymentStatus !== "failed"
    )
  }, [bookings])

  const getBookedSlots = useCallback((barberId: string, date: string): string[] => {
    return bookings
      .filter(
        (booking) =>
          booking.barberId === barberId &&
          booking.date === date &&
          (booking.status === "confirmed" || booking.status === "pending") &&
          booking.paymentStatus !== "failed"
      )
      .map((booking) => booking.time)
  }, [bookings])

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBookingStatus,
        updatePaymentStatus,
        isTimeSlotAvailable,
        getBookedSlots,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
