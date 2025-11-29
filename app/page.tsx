import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Hero } from "../components/sections/hero"
import { Services } from "../components/sections/services"
import { Products } from "../components/sections/products"
import { Booking } from "../components/sections/booking"
import { Testimonials } from "../components/sections/testimonials"
import { Contact } from "../components/sections/contact"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <Booking />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}