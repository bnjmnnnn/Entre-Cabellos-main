import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Rodríguez",
    role: "Cliente Regular",
    image: "/professional-man-bw-portrait.png",
    rating: 5,
    text: "La mejor barbería de Santiago. El ambiente es increíble y los barberos son verdaderos artistas. Siempre salgo satisfecho.",
  },
  {
    name: "Miguel Ángel Torres",
    role: "Cliente VIP",
    image: "/businessman-portrait-black-and-white.jpg",
    rating: 5,
    text: "Profesionalismo de primer nivel. Llevan años cuidando mi imagen y nunca me han decepcionado. Totalmente recomendados.",
  },
  {
    name: "Diego Fernández",
    role: "Cliente Frecuente",
    image: "/young-man-portrait-black-and-white.jpg",
    rating: 5,
    text: "El servicio es excelente y la atención personalizada. Se nota que les apasiona lo que hacen. Mi barbería de confianza.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-2 border-border hover:border-primary transition-all duration-300"
            >
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground italic mb-6 text-pretty leading-relaxed">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
