"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, MessageSquare } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl blur opacity-30"></div>
            </div>
            <h1 className="text-2xl font-bebas tracking-wider text-white neon-text">
              FITCHAT <span className="text-purple-400">AI</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-200 hover:text-purple-400 transition-all duration-300 font-medium flex items-center gap-2 hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span className="font-inter">Início</span>
            </Link>
            <Link
              href="/chat"
              className="text-gray-200 hover:text-purple-400 transition-all duration-300 font-medium flex items-center gap-2 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-inter">Chat</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-gray-800 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 animate-fadeIn">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-200 hover:text-purple-400 transition-all duration-300 font-medium flex items-center gap-3 py-2 hover:bg-gray-800 rounded-lg px-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span className="font-inter">Início</span>
              </Link>
              <Link
                href="/chat"
                className="text-gray-200 hover:text-purple-400 transition-all duration-300 font-medium flex items-center gap-3 py-2 hover:bg-gray-800 rounded-lg px-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-inter">Chat</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
