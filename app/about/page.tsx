"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Zap,
  Shield,
  Users,
  Code,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Lightbulb,
  Target,
  Heart,
  Bot,
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const technologies = [
    {
      name: "Google Gemini 2.0",
      description: "IA de última geração para compreensão natural e respostas precisas",
      icon: Brain,
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Next.js 14",
      description: "Framework React moderno para performance e experiência otimizada",
      icon: Code,
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "Tailwind CSS",
      description: "Design system responsivo e acessível",
      icon: Sparkles,
      color: "from-cyan-500 to-cyan-700",
    },
    {
      name: "TypeScript",
      description: "Código seguro e confiável para melhor experiência",
      icon: Shield,
      color: "from-blue-600 to-blue-800",
    },
  ]

  const features = [
    {
      title: "Inteligência Artificial Avançada",
      description:
        "Utilizamos o Google Gemini 2.0, uma das IAs mais avançadas do mundo, treinada especificamente para fitness e exercícios.",
      icon: Brain,
    },
    {
      title: "Conhecimento Especializado",
      description:
        "Nossa IA foi treinada com conhecimento de personal trainers certificados, anatomia e fisiologia do exercício.",
      icon: Target,
    },
    {
      title: "Segurança em Primeiro Lugar",
      description: "Priorizamos a prevenção de lesões com foco na técnica correta e progressão gradual.",
      icon: Shield,
    },
    {
      title: "Disponibilidade Total",
      description: "Seu personal trainer virtual está disponível 24/7, sempre pronto para te ajudar.",
      icon: Zap,
    },
    {
      title: "Personalização Inteligente",
      description: "Adaptamos as recomendações ao seu nível, objetivos e limitações específicas.",
      icon: Users,
    },
    {
      title: "Evolução Constante",
      description: "Nossa IA aprende e se atualiza constantemente para oferecer as melhores orientações.",
      icon: Lightbulb,
    },
  ]

  const timeline = [
    {
      phase: "Concepção",
      title: "A Ideia Nasceu",
      description: "Identificamos a necessidade de democratizar o acesso a orientação fitness de qualidade.",
      icon: Lightbulb,
    },
    {
      phase: "Desenvolvimento",
      title: "Construção da IA",
      description: "Integramos o Google Gemini com conhecimento especializado em fitness e exercícios.",
      icon: Code,
    },
    {
      phase: "Testes",
      title: "Validação com Especialistas",
      description: "Personal trainers certificados validaram nossas respostas e metodologias.",
      icon: CheckCircle,
    },
    {
      phase: "Lançamento",
      title: "Disponível para Todos",
      description: "Lançamos o FitChat AI para ajudar pessoas em sua jornada fitness.",
      icon: Heart,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-colors duration-300">
      <Sidebar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Conheça nossa história
            </div>

            {/* Bot animado */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl blur opacity-20 animate-pulse"></div>

                {/* Partículas ao redor do bot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute top-0 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute -top-4 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{ animationDelay: "1.5s" }}
                ></div>

                {/* Ondas de energia */}
                <div className="absolute inset-0 rounded-3xl border-2 border-purple-300 animate-ping opacity-30"></div>
                <div
                  className="absolute inset-0 rounded-3xl border-2 border-purple-400 animate-ping opacity-20"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Como o FitChat AI{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                funciona
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Descubra a tecnologia e o conhecimento por trás do seu personal trainer virtual, criado para democratizar
              o acesso a orientação fitness de qualidade.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Nossa Missão</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  Acreditamos que todos merecem acesso a orientação fitness de qualidade, independente de localização,
                  horário ou orçamento. O FitChat AI foi criado para quebrar essas barreiras.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Combinamos inteligência artificial de ponta com conhecimento especializado para oferecer uma
                  experiência personalizada, segura e eficaz para sua jornada fitness.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Acessível</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Seguro</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Personalizado</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="text-center z-10">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
                        <Heart className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center animate-bounce">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-purple-700 dark:text-purple-300 font-medium">Missão e Valores</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800/50 dark:to-purple-900/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Como Funciona</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Entenda a tecnologia e metodologia por trás do FitChat AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tecnologias Utilizadas</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Construído com as melhores tecnologias para garantir performance, segurança e experiência excepcional
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => {
                const Icon = tech.icon
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tech.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{tech.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800/50 dark:to-purple-900/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nossa Jornada</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Do conceito à realidade: como criamos o FitChat AI
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                            {item.phase}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Experimente o FitChat AI</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Agora que você conhece nossa história e tecnologia, que tal experimentar seu personal trainer virtual?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 group">
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
