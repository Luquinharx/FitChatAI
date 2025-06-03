"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Play, Target, Zap, TrendingUp, ArrowRight, CheckCircle, Bot, Cpu, Sparkles } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const features = [
    {
      icon: Target,
      title: "Orientação Personalizada",
      description: "Receba instruções detalhadas adaptadas ao seu nível e objetivos específicos.",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: TrendingUp,
      title: "Progressão Inteligente",
      description: "Acompanhe sua evolução com recomendações que crescem junto com você.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Play,
      title: "Demonstrações Visuais",
      description: "Acesse vídeos e tutoriais para executar cada movimento com perfeição.",
      color: "from-green-500 to-green-700",
    },
  ]

  const benefits = [
    "Disponível 24 horas por dia, 7 dias por semana",
    "Respostas baseadas em ciência do exercício",
    "Adaptação automática ao seu nível de condicionamento",
    "Demonstrações em vídeo para cada exercício",
    "Prevenção de lesões com foco na técnica correta",
    "Progressão gradual e segura",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-colors duration-300">
      <Sidebar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    Powered by Google Gemini AI
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    Seu Personal Trainer{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                      Virtual
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                    Transforme seu treino com orientações personalizadas, técnicas corretas e demonstrações em tempo
                    real. Sua jornada fitness começa aqui.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/chat">
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 group">
                      <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                      Começar Treino Agora
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="px-8 py-4 text-lg rounded-2xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600"
                    >
                      Como Funciona
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online agora</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Grátis para usar</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden border dark:border-gray-700">
                  <div className="text-center z-10">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                        <Bot className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl blur opacity-20 animate-pulse"></div>
                    </div>
                    <p className="text-purple-700 dark:text-purple-300 font-medium">Seu Personal Trainer Virtual</p>
                  </div>
                  {/* Partículas animadas */}
                  <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute top-20 right-16 w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce"></div>
                    <div
                      className="absolute bottom-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800/50 dark:to-purple-900/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Como o FitChat AI te ajuda</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Tecnologia avançada combinada com conhecimento especializado em fitness
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Por que escolher o FitChat AI?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Desenvolvido com tecnologia de ponta e conhecimento especializado, o FitChat AI oferece uma
                  experiência única de personal training virtual.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="text-center z-10">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
                        <Cpu className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 font-medium">IA Avançada em Ação</p>
                    <div className="mt-4 flex justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                  {/* Circuitos animados */}
                  <div className="absolute inset-0">
                    <div className="absolute top-8 left-8 w-16 h-0.5 bg-gradient-to-r from-blue-300 to-transparent animate-pulse"></div>
                    <div
                      className="absolute top-16 right-8 w-12 h-0.5 bg-gradient-to-l from-purple-300 to-transparent animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-16 left-12 w-20 h-0.5 bg-gradient-to-r from-green-300 to-transparent animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-8 right-12 w-14 h-0.5 bg-gradient-to-l from-blue-300 to-transparent animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Pronto para transformar seus treinos?</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já descobriram uma nova forma de se exercitar com segurança e
              eficiência.
            </p>
            <Link href="/chat">
              <Button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Começar Agora - É Grátis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Mobile CTA Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Link href="/chat">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
            <MessageCircle className="w-5 h-5 mr-2" />
            Iniciar Agora
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  )
}
