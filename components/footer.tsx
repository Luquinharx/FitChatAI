import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 text-gray-700 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              FitChat <span className="text-purple-600 dark:text-purple-400">AI</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Seu assistente pessoal de fitness</p>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chat"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Orientação de Exercícios
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Recomendações de Peso
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Demonstrações em Vídeo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-current" /> pelo Time FitChat AI
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">© 2025 FitChat AI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
