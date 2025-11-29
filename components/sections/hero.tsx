import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/modern-barbershop-interior-warm-lighting-professio.jpg" alt="Entre Cabellos Barbershop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Decorative hippie pattern */}
      <div className="absolute inset-0 hippie-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Decorative Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 border-2 border-primary">
              <Scissors size={48} className="text-primary" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            Transformamos tu estilo, <span className="text-primary">cuidamos tu esencia</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Barbería profesional con más de 10 años de experiencia. Donde la tradición se encuentra con el estilo
            moderno.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#reserva">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Reservar Ahora
              </Button>
            </Link>
            <Link href="#servicios">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 bg-transparent"
              >
                Ver Servicios
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary font-serif">10+</p>
              <p className="text-sm text-muted-foreground">Años de experiencia</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary font-serif">5K+</p>
              <p className="text-sm text-muted-foreground">Clientes satisfechos</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary font-serif">4.9</p>
              <p className="text-sm text-muted-foreground">Calificación promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
