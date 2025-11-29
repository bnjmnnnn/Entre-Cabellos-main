import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Sparkles, Droplets, Wind } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Corte Clásico",
    description: "Corte tradicional con técnicas modernas. Incluye lavado, corte y peinado profesional.",
    price: "$12.000",
  },
  {
    icon: Sparkles,
    title: "Corte + Barba",
    description: "Servicio completo de corte y arreglo de barba con productos premium.",
    price: "$18.000",
  },
  {
    icon: Droplets,
    title: "Afeitado Clásico",
    description: "Afeitado tradicional con toalla caliente y productos de alta calidad.",
    price: "$10.000",
  },
  {
    icon: Wind,
    title: "Tratamiento Capilar",
    description: "Tratamientos especializados para el cuidado y fortalecimiento del cabello.",
    price: "$15.000",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Servicios profesionales diseñados para realzar tu estilo personal
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="bg-card border-2 border-border hover:border-primary transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary font-serif">{service.price}</span>
                    <button className="text-sm text-primary hover:underline">Reservar →</button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Extra Services */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Buscas algo específico? Ofrecemos servicios personalizados
          </p>
          <button className="text-primary hover:underline font-medium">Ver todos los servicios →</button>
        </div>
      </div>
    </section>
  )
}
