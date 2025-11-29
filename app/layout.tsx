import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/CartContext"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Entre Cabellos - Barbería Profesional",
  description: "Transformamos tu estilo, cuidamos tu esencia",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/placeholder-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/placeholder-logo.png", sizes: "64x64", type: "image/png" },
    ],
    apple: { url: "/placeholder-logo.png", sizes: "180x180", type: "image/png" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
