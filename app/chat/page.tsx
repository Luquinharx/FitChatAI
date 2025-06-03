"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Send,
  Bot,
  User,
  Play,
  RotateCcw,
  Download,
  Target,
  AlertCircle,
  MessageSquarePlus,
  ExternalLink,
  Youtube,
} from "lucide-react"
import { findExercise, type Exercise } from "@/lib/exercises"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { FitnessAnimation } from "@/components/fitness-animation"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  exercise?: Exercise
  suggestions?: string[]
  error?: boolean
}

const quickSuggestions = [
  "Agachamento correto",
  "Exercícios para braços",
  "Forma correta do supino",
  "Treino para iniciantes",
  "Aquecimento básico",
  "Rosca bíceps",
  "Treino de pernas",
  "Fortalecer core",
]

// Componente para renderizar markdown simples com links clicáveis
const MarkdownText = ({ content }: { content: string }) => {
  const formatText = (text: string) => {
    const lines = text.split("\n")

    return lines.map((line, index) => {
      if (line.match(/^\*\*[^*]+\*\*:?\s*$/)) {
        const title = line.replace(/\*\*/g, "").replace(":", "")
        return (
          <h4 key={index} className="font-bold text-lg text-purple-700 dark:text-purple-400 mt-4 mb-2">
            {title}
          </h4>
        )
      }

      if (line.match(/^\s*-\s+/)) {
        const listItem = line.replace(/^\s*-\s+/, "")
        return (
          <li key={index} className="ml-4 mb-1 text-gray-700 dark:text-gray-300">
            • {formatInlineText(listItem)}
          </li>
        )
      }

      if (line.match(/^\s*\d+\.\s+/)) {
        const listItem = line.replace(/^\s*\d+\.\s+/, "")
        const number = line.match(/^\s*(\d+)\./)?.[1]
        return (
          <div key={index} className="ml-4 mb-2">
            <span className="font-bold text-purple-700 dark:text-purple-400">{number}. </span>
            <span className="text-gray-700 dark:text-gray-300">{formatInlineText(listItem)}</span>
          </div>
        )
      }

      if (line.trim() === "") {
        return <br key={index} />
      }

      return (
        <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          {formatInlineText(line)}
        </p>
      )
    })
  }

  const formatInlineText = (text: string) => {
    // Detectar links do YouTube e outros URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const youtubeRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+)/g

    // Detectar padrões de busca do YouTube
    const searchRegex = /Busque no YouTube:\s*["']([^"']+)["']/g

    // Primeiro, processar URLs diretos
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      // Se é uma URL
      if (part.match(urlRegex)) {
        const isYouTube = part.match(youtubeRegex)
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${
              isYouTube
                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 border border-red-300 dark:border-red-700"
                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 border border-blue-300 dark:border-blue-700"
            }`}
          >
            {isYouTube ? <Youtube className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
            <span className="font-medium">{isYouTube ? "Assistir no YouTube" : "Abrir Link"}</span>
          </a>
        )
      }

      // Processar texto normal com formatação
      const boldParts = part.split(/(\*\*[^*]+\*\*)/)

      return boldParts.map((boldPart, boldIndex) => {
        if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
          const boldText = boldPart.replace(/\*\*/g, "")
          return (
            <strong key={`${index}-${boldIndex}`} className="font-bold text-gray-900 dark:text-white">
              {boldText}
            </strong>
          )
        }

        // Detectar padrões de busca do YouTube
        if (boldPart.includes("Busque no YouTube:")) {
          const searchMatch = boldPart.match(/Busque no YouTube:\s*["']?([^"'\n]+)["']?/)
          if (searchMatch) {
            const searchTerm = searchMatch[1]
            const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`

            return (
              <span key={`${index}-${boldIndex}`}>
                {boldPart.substring(0, searchMatch.index)}
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 border border-red-300 dark:border-red-700 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Buscar: "{searchTerm}"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {boldPart.substring((searchMatch.index || 0) + searchMatch[0].length)}
              </span>
            )
          }
        }

        // Detectar canais específicos e criar links
        if (
          boldPart.includes("Athlean-X") ||
          boldPart.includes("FitnessBlender") ||
          boldPart.includes("Jeff Nippard")
        ) {
          const channelLinks: { [key: string]: string } = {
            "Athlean-X": "https://www.youtube.com/@athleanx",
            FitnessBlender: "https://www.youtube.com/@FitnessBlender",
            "Jeff Nippard": "https://www.youtube.com/@JeffNippard",
            "Calisthenia Movement": "https://www.youtube.com/@CalisthenicMovement",
          }

          let processedText = boldPart
          Object.entries(channelLinks).forEach(([channel, url]) => {
            if (processedText.includes(channel)) {
              const parts = processedText.split(channel)
              processedText = parts.join(`<CHANNEL_LINK>${channel}|${url}</CHANNEL_LINK>`)
            }
          })

          if (processedText.includes("<CHANNEL_LINK>")) {
            const channelParts = processedText.split(/(<CHANNEL_LINK>[^<]+<\/CHANNEL_LINK>)/)
            return (
              <span key={`${index}-${boldIndex}`}>
                {channelParts.map((channelPart, channelIndex) => {
                  if (channelPart.startsWith("<CHANNEL_LINK>")) {
                    const [channel, url] = channelPart
                      .replace("<CHANNEL_LINK>", "")
                      .replace("</CHANNEL_LINK>", "")
                      .split("|")
                    return (
                      <a
                        key={channelIndex}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 border border-purple-300 dark:border-purple-700 rounded-md transition-all duration-300 hover:scale-105 font-medium text-sm"
                      >
                        <Youtube className="w-3 h-3" />
                        {channel}
                      </a>
                    )
                  }
                  return channelPart
                })}
              </span>
            )
          }
        }

        if (
          boldPart.includes("✅") ||
          boldPart.includes("❌") ||
          boldPart.includes("🏋️") ||
          boldPart.includes("💪") ||
          boldPart.includes("📹")
        ) {
          return (
            <span key={`${index}-${boldIndex}`} className="text-lg">
              {boldPart}
            </span>
          )
        }

        return boldPart
      })
    })
  }

  return <div className="space-y-1">{formatText(content)}</div>
}

export default function ChatPage() {
  const [mounted, setMounted] = useState(false)
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "error">("online")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userMessage, setUserMessage] = useState("")

  useEffect(() => {
    setMounted(true)
    loadLocalMessages()
  }, [])

  useEffect(() => {
    if (!isTyping) {
      scrollToBottom()
    }
  }, [localMessages, isTyping])

  const loadLocalMessages = () => {
    try {
      const saved = localStorage.getItem("fitchat-messages")
      if (saved) {
        const parsedMessages = JSON.parse(saved).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setLocalMessages(parsedMessages)
        setMessageCount(parsedMessages.length)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const saveMessageToLocal = (message: ChatMessage) => {
    try {
      const existing = JSON.parse(localStorage.getItem("fitchat-messages") || "[]")
      const updated = [...existing, message]
      localStorage.setItem("fitchat-messages", JSON.stringify(updated))
    } catch (error) {
      console.error("Error saving message:", error)
    }
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isTyping) return

    setIsTyping(true)
    setConnectionStatus("online")

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    saveMessageToLocal(newUserMessage)
    setLocalMessages((prev) => [...prev, newUserMessage])
    setMessageCount((prev) => prev + 1)
    setUserMessage("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...localMessages, newUserMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Erro ao ler resposta")

      let responseContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split("\n\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === "text-delta") {
                const textDelta = data.textDelta.replace(/\\n/g, "\n").replace(/\\"/g, '"')
                responseContent += textDelta

                setLocalMessages((prev) => {
                  const filtered = prev.filter((m) => m.id !== "partial")
                  return [
                    ...filtered,
                    {
                      id: "partial",
                      role: "assistant" as const,
                      content: responseContent,
                      timestamp: new Date(),
                    },
                  ]
                })
              }
            } catch (e) {
              console.error("Erro ao processar chunk:", e)
            }
          }
        }
      }

      const finalMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
        exercise: findExercise(responseContent),
        suggestions: generateSuggestions(responseContent),
      }

      setLocalMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== "partial")
        return [...filtered, finalMessage]
      })

      saveMessageToLocal(finalMessage)
      setMessageCount((prev) => prev + 1)
      setConnectionStatus("online")
    } catch (error: any) {
      console.error("Erro ao enviar mensagem:", error)
      setConnectionStatus("error")

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: `❌ **Erro de Conexão**\n\n${error.message}\n\n**Dicas:**\n- Verifique sua conexão com a internet\n- Tente novamente em alguns segundos\n- Se o problema persistir, recarregue a página`,
        timestamp: new Date(),
        error: true,
      }

      setLocalMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== "partial")
        return [...filtered, errorMessage]
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(userMessage)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const startNewConversation = () => {
    if (localMessages.length > 0) {
      if (confirm("Tem certeza que deseja começar uma nova conversa? O histórico atual será perdido.")) {
        localStorage.removeItem("fitchat-messages")
        setLocalMessages([])
        setMessageCount(0)
        setConnectionStatus("online")
      }
    }
  }

  const generateSuggestions = (content: string): string[] => {
    return quickSuggestions.slice(0, 3)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <Sidebar />

      {/* Animação do personagem fitness */}
      <FitnessAnimation />

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Mensagens: {messageCount}</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "online"
                    ? "bg-green-500 animate-pulse"
                    : connectionStatus === "error"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-gray-600 dark:text-gray-400">
                {connectionStatus === "online"
                  ? "Conectado ao Gemini"
                  : connectionStatus === "error"
                    ? "Erro de Conexão"
                    : "Conectando..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-6xl mx-auto px-6 py-8 relative z-20">
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/30 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${
                      connectionStatus === "online"
                        ? "bg-green-500"
                        : connectionStatus === "error"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Trainer AI</h2>
                  <p className="text-gray-600 dark:text-gray-400">Powered by Google Gemini 2.0</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={startNewConversation}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 flex items-center gap-2"
                  title="Nova Conversa"
                >
                  <MessageSquarePlus className="w-5 h-5" />
                  <span className="hidden md:inline">Nova Conversa</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={startNewConversation}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300"
                  title="Limpar Histórico"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Quick Suggestions */}
            {localMessages.length === 0 && (
              <div className="p-6 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sugestões Rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {quickSuggestions.slice(0, 8).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="border-2 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white dark:hover:text-white hover:border-purple-600 dark:hover:border-purple-700 transition-all duration-300 text-xs sm:text-sm p-2 sm:p-3 h-auto hover:scale-105 text-left whitespace-normal leading-tight"
                      disabled={isTyping}
                    >
                      <span className="block w-full text-center">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="h-[55vh] overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              {localMessages.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Seu Personal Trainer Virtual
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Conectado ao Google Gemini 2.0 para respostas inteligentes sobre fitness!
                  </p>
                  <div className="bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-2xl p-4 max-w-lg mx-auto mb-8">
                    <div className="flex items-center gap-3 text-purple-700 dark:text-purple-300">
                      <Youtube className="w-5 h-5" />
                      <p className="text-sm">
                        <strong>Vídeos Interativos:</strong> Peça demonstrações e receba links clicáveis do YouTube!
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 max-w-lg mx-auto mb-8">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <MessageSquarePlus className="w-5 h-5" />
                      <p className="text-sm">
                        <strong>Nova Conversa:</strong> Use o botão no canto superior direito para começar do zero!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {localMessages.map((message, index) => (
                <div
                  key={`${message.id}-${index}`}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  {message.role === "assistant" && (
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.error ? "bg-red-500" : "bg-gradient-to-br from-purple-600 to-purple-800"
                      }`}
                    >
                      {message.error ? (
                        <AlertCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                  )}

                  <div className={`max-w-[75%] ${message.role === "user" ? "order-1" : ""}`}>
                    <div
                      className={`p-6 rounded-3xl shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-purple-600 to-purple-800 text-white"
                          : message.error
                            ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {message.role === "user" ? (
                        <p className="leading-relaxed">{message.content}</p>
                      ) : (
                        <MarkdownText content={message.content} />
                      )}

                      {message.exercise && message.role === "assistant" && !message.error && (
                        <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-inner">
                          <div className="flex items-center gap-3 mb-4">
                            <Play className="w-6 h-6 text-purple-700 dark:text-purple-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {message.exercise.name}
                            </span>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                              {message.exercise.difficulty}
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-2">
                                MÚSCULOS TRABALHADOS:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {message.exercise.muscleGroups.map((muscle, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300"
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-2">
                                EQUIPAMENTOS:
                              </h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {message.exercise.equipment.join(", ")}
                              </p>
                            </div>

                            <div className="bg-gray-200 dark:bg-gray-600 rounded-2xl p-4 text-center border border-gray-300 dark:border-gray-500">
                              <Play className="w-10 h-10 text-purple-700 dark:text-purple-400 mx-auto mb-3" />
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">
                                Vídeo Demonstrativo Disponível
                              </p>
                              <div className="flex gap-3 justify-center">
                                <Button
                                  size="sm"
                                  className="bg-purple-700 hover:bg-purple-800 transition-all duration-300 hover:scale-105"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Assistir
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-700 hover:text-white transition-all duration-300"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Salvar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {message.suggestions && message.suggestions.length > 0 && !message.error && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-700 hover:text-white transition-all duration-300 text-xs hover:scale-105"
                            disabled={isTyping}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 justify-start animate-fadeIn">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-purple-700 dark:bg-purple-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-3 h-3 bg-purple-700 dark:bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-purple-700 dark:bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/30">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <Input
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Digite sua pergunta sobre exercícios..."
                  className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-600 dark:focus:border-purple-500 rounded-2xl p-4 shadow-inner"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  disabled={isTyping || !userMessage.trim()}
                  className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
