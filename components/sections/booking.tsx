"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar } from "../ui/calendar"
import { Calendar as CalendarIcon, Clock, User, CreditCard, Check } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const services = [
  { id: "corte", name: "Corte Clásico", price: 12000 },
  { id: "corte-barba", name: "Corte + Barba", price: 18000 },
  { id: "afeitado", name: "Afeitado Clásico", price: 10000 },
  { id: "tratamiento", name: "Tratamiento Capilar", price: 15000 },
]

const barbers = [
  { id: "carlos", name: "Carlos Muñoz", specialty: "Cortes clásicos" },
  { id: "miguel", name: "Miguel Ángel", specialty: "Barbería y afeitado" },
  { id: "diego", name: "Diego Silva", specialty: "Estilos modernos" },
  { id: "juan", name: "Juan Pablo", specialty: "Tratamientos" },
]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

export function Booking() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedBarber, setSelectedBarber] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedBarberData = barbers.find((b) => b.id === selectedBarber)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedService("")
    setSelectedBarber("")
    setSelectedDate(undefined)
    setSelectedTime("")
    setCustomerName("")
    setCustomerEmail("")
    setCustomerPhone("")
  }

  const handleConfirmBooking = () => {
    // Aquí podrías integrar con tu backend
    alert("¡Reserva confirmada! Te enviaremos un email de confirmación.")
    resetBooking()
  }

  return (
    <section id="reserva" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Reserva tu Cita</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Agenda tu próxima visita en 3 simples pasos
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? <Check size={20} /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > stepNumber ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">Servicio</span>
            <span className="text-xs text-muted-foreground">Fecha y Hora</span>
            <span className="text-xs text-muted-foreground">Confirmar</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* STEP 1: Service and Barber Selection */}
          {step === 1 && (
            <Card className="bg-card border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Selecciona tu servicio y barbero</CardTitle>
                <CardDescription className="text-muted-foreground">Paso 1 de 3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-foreground font-semibold">
                    Servicio
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger id="service" className="bg-background">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Barber Selection */}
                <div className="space-y-2">
                  <Label htmlFor="barber" className="text-foreground font-semibold">
                    Barbero
                  </Label>
                  <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                    <SelectTrigger id="barber" className="bg-background">
                      <SelectValue placeholder="Selecciona un barbero" />
                    </SelectTrigger>
                    <SelectContent>
                      {barbers.map((barber) => (
                        <SelectItem key={barber.id} value={barber.id}>
                          {barber.name} - {barber.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Next Button */}
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!selectedService || !selectedBarber}
                  onClick={handleNextStep}
                >
                  Continuar a Fecha y Hora
                </Button>
              </CardContent>
            </Card>
          )}

          {/* STEP 2: Date and Time Selection with Calendar */}
          {step === 2 && (
            <Card className="bg-card border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Selecciona fecha y hora</CardTitle>
                <CardDescription className="text-muted-foreground">Paso 2 de 3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calendar */}
                <div className="space-y-2">
                  <Label className="text-foreground font-semibold flex items-center">
                    <CalendarIcon size={16} className="mr-2 text-primary" />
                    Fecha
                  </Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      locale={es}
                      className="rounded-md border"
                    />
                  </div>
                  {selectedDate && (
                    <p className="text-center text-sm text-muted-foreground">
                      Fecha seleccionada: {format(selectedDate, "PPPP", { locale: es })}
                    </p>
                  )}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold flex items-center">
                      <Clock size={16} className="mr-2 text-primary" />
                      Hora disponible
                    </Label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-primary/10"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handlePreviousStep}
                  >
                    Volver
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleNextStep}
                  >
                    Continuar a Confirmación
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 3: Confirmation and Customer Info */}
          {step === 3 && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Booking Summary */}
              <Card className="bg-card border-2 border-border h-fit">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Resumen de Reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Servicio:</span>
                    <span className="font-semibold text-foreground">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Barbero:</span>
                    <span className="font-semibold text-foreground">
                      {selectedBarberData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-semibold text-foreground">
                      {selectedDate ? format(selectedDate, "PP", { locale: es }) : ""}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Hora:</span>
                    <span className="font-semibold text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-4 text-lg">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="font-bold text-primary font-serif text-2xl">
                      ${selectedServiceData?.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card className="bg-card border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <User size={20} className="mr-2 text-primary" />
                    Tus Datos
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Completa tus datos para confirmar la reserva
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name" className="text-foreground">
                      Nombre Completo *
                    </Label>
                    <input
                      id="customer-name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-email" className="text-foreground">
                      Email *
                    </Label>
                    <input
                      id="customer-email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-phone" className="text-foreground">
                      Teléfono *
                    </Label>
                    <input
                      id="customer-phone"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={handlePreviousStep}
                    >
                      Volver
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={!customerName || !customerEmail || !customerPhone}
                      onClick={handleConfirmBooking}
                    >
                      Confirmar Reserva
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Te enviaremos una confirmación por email
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
