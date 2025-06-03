import type React from "react"
import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Configuração das fontes mais humanas e acessíveis
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "FitChat AI - Seu Personal Trainer Virtual",
  description:
    "Personal trainer virtual com IA para orientação de exercícios, demonstrações em vídeo e recomendações personalizadas. Transforme seu treino com tecnologia de ponta.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${nunito.variable}`} suppressHydrationWarning>
      <body className="font-inter antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
