"use client"

import { createContext, useContext, useState, ReactNode } from "react"

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

export function BookingProvider({ children }: { children: ReactNode }) {
  // En producción, esto vendría de una base de datos
  const [bookings, setBookings] = useState<Booking[]>([])

  const addBooking = (booking: Omit<Booking, "id" | "createdAt">): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    )
  }

  const updatePaymentStatus = (id: string, paymentStatus: Booking["paymentStatus"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, paymentStatus } : booking))
    )
  }

  const isTimeSlotAvailable = (barberId: string, date: string, time: string): boolean => {
    return !bookings.some(
      (booking) =>
        booking.barberId === barberId &&
        booking.date === date &&
        booking.time === time &&
        (booking.status === "confirmed" || booking.status === "pending") &&
        booking.paymentStatus !== "failed"
    )
  }

  const getBookedSlots = (barberId: string, date: string): string[] => {
    return bookings
      .filter(
        (booking) =>
          booking.barberId === barberId &&
          booking.date === date &&
          (booking.status === "confirmed" || booking.status === "pending") &&
          booking.paymentStatus !== "failed"
      )
      .map((booking) => booking.time)
  }

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
