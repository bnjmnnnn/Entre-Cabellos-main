"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="contacto" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Contáctanos</h2>
          <p className="text-lg text-muted-foreground text-balance">Estamos aquí para responder tus preguntas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card border-2 border-border">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-foreground">
                  Nombre Completo
                </Label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Tu nombre"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-foreground">
                  Email
                </Label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="tu@email.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-foreground">
                  Teléfono
                </Label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-foreground">
                  Mensaje
                </Label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>

              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Enviar Mensaje
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="bg-card border-2 border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Ubicación</h4>
                    <p className="text-sm text-muted-foreground">
                      Lincoln 2267
                      <br />
                      Lo Espejo, Santiago, Chile
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Teléfono</h4>
                    <p className="text-sm text-muted-foreground">+56 9 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">info@entrecabellos.cl</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horario</h4>
                    <p className="text-sm text-muted-foreground">
                      Lun - Vie: 09:00 - 20:00
                      <br />
                      Sábados: 10:00 - 18:00
                      <br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="bg-card border-2 border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.8!2d-70.6877!3d-33.5267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d0ef5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sLincoln%202267%2C%20Lo%20Espejo%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Entre Cabellos - Lincoln 2267, Lo Espejo"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
