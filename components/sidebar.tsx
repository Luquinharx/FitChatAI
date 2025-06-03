"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, MessageCircle, Info, Menu, X, Bot, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true) // Começar fechado
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [showTip, setShowTip] = useState(true)
  const pathname = usePathname()

  // Esconder dica após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const navigation = [
    {
      name: "Início",
      href: "/",
      icon: Home,
      description: "Página inicial",
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
      description: "Conversar com IA",
    },
    {
      name: "Sobre",
      href: "/about",
      icon: Info,
      description: "Como funciona",
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    setShowTip(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl z-50 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        onClick={toggleSidebar}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {isCollapsed ? (
                // Logo compacta quando fechado
                <div className="relative mx-auto">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg blur opacity-20"></div>
                </div>
              ) : (
                // Logo completa quando aberto
                <>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl blur opacity-20"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      FitChat <span className="text-purple-600 dark:text-purple-400">AI</span>
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Personal Trainer Virtual</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4" onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                        active
                          ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          active
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        } ${isCollapsed ? "mx-auto" : ""}`}
                      />
                      {!isCollapsed && (
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Theme Toggle and Collapse Button */}
          <div
            className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Theme Toggle */}
            {!isCollapsed && (
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            )}

            {/* Collapse Button - Desktop Only */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="w-full justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 relative"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Tooltip para abrir menu */}
        {isCollapsed && showTip && (
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-60 animate-pulse hidden md:block">
            Clique para abrir o menu
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
          </div>
        )}
      </aside>

      {/* Theme Toggle for collapsed sidebar */}
      {isCollapsed && (
        <div className="fixed left-4 bottom-4 z-50 hidden md:block">
          <ThemeToggle />
        </div>
      )}

      {/* Main Content Spacer */}
      <div className={`hidden md:block transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />
    </>
  )
}
