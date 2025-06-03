"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function FitnessAnimation() {
  const [weightCount, setWeightCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Mostrar animação apenas em telas maiores
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    // Incrementar contador de pesos a cada ciclo (12 segundos)
    const interval = setInterval(() => {
      setWeightCount((prev) => (prev < 8 ? prev + 1 : prev))
    }, 12000)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
      clearInterval(interval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10 overflow-hidden">
      {/* Personagem animado */}
      <div className="character-container">
        <svg width="60" height="80" viewBox="0 0 60 80" className="character" xmlns="http://www.w3.org/2000/svg">
          {/* Cabeça */}
          <circle
            cx="30"
            cy="15"
            r="8"
            fill={theme === "dark" ? "#fbbf24" : "#fbbf24"}
            stroke={theme === "dark" ? "#f59e0b" : "#f59e0b"}
            strokeWidth="1"
          />

          {/* Olhos */}
          <circle cx="27" cy="13" r="1.5" fill={theme === "dark" ? "#e5e7eb" : "#1f2937"} />
          <circle cx="33" cy="13" r="1.5" fill={theme === "dark" ? "#e5e7eb" : "#1f2937"} />

          {/* Sorriso */}
          <path
            d="M 25 17 Q 30 20 35 17"
            stroke={theme === "dark" ? "#e5e7eb" : "#1f2937"}
            strokeWidth="1"
            fill="none"
          />

          {/* Corpo */}
          <rect x="25" y="23" width="10" height="20" rx="5" fill={theme === "dark" ? "#60a5fa" : "#3b82f6"} />

          {/* Braços */}
          <rect
            x="18"
            y="25"
            width="6"
            height="3"
            rx="1.5"
            fill={theme === "dark" ? "#fbbf24" : "#fbbf24"}
            className="arm-left"
          />
          <rect
            x="36"
            y="25"
            width="6"
            height="3"
            rx="1.5"
            fill={theme === "dark" ? "#fbbf24" : "#fbbf24"}
            className="arm-right"
          />

          {/* Pernas */}
          <rect
            x="27"
            y="43"
            width="3"
            height="15"
            rx="1.5"
            fill={theme === "dark" ? "#3b82f6" : "#1e40af"}
            className="leg-left"
          />
          <rect
            x="30"
            y="43"
            width="3"
            height="15"
            rx="1.5"
            fill={theme === "dark" ? "#3b82f6" : "#1e40af"}
            className="leg-right"
          />

          {/* Pés */}
          <ellipse cx="28.5" cy="60" rx="4" ry="2" fill={theme === "dark" ? "#6b7280" : "#374151"} />
          <ellipse cx="31.5" cy="60" rx="4" ry="2" fill={theme === "dark" ? "#6b7280" : "#374151"} />
        </svg>

        {/* Haltere */}
        <svg width="30" height="12" viewBox="0 0 30 12" className="dumbbell" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="4" height="8" rx="2" fill={theme === "dark" ? "#9ca3af" : "#6b7280"} />
          <rect x="6" y="4" width="18" height="4" rx="2" fill={theme === "dark" ? "#6b7280" : "#374151"} />
          <rect x="24" y="2" width="4" height="8" rx="2" fill={theme === "dark" ? "#9ca3af" : "#6b7280"} />
        </svg>
      </div>

      {/* Pilha de pesos no lado direito */}
      <div className="weight-stack">
        {Array.from({ length: weightCount }, (_, i) => (
          <svg
            key={i}
            width="40"
            height="20"
            viewBox="0 0 40 20"
            className="weight-plate"
            style={{ bottom: `${i * 15}px` }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="20" cy="10" rx="18" ry="8" fill={theme === "dark" ? "#6b7280" : "#4b5563"} />
            <ellipse cx="20" cy="10" rx="15" ry="6" fill={theme === "dark" ? "#9ca3af" : "#6b7280"} />
            <circle cx="20" cy="10" r="4" fill={theme === "dark" ? "#4b5563" : "#374151"} />
          </svg>
        ))}
      </div>

      <style jsx>{`
        .character-container {
          position: absolute;
          bottom: 20px;
          left: -80px;
          animation: walkCycle 12s infinite linear;
        }

        .character {
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
        }

        .dumbbell {
          position: absolute;
          top: 15px;
          left: 45px;
          opacity: 0;
          animation: dumbbellCycle 12s infinite linear;
        }

        .weight-stack {
          position: absolute;
          bottom: 20px;
          right: 50px;
        }

        .weight-plate {
          position: absolute;
          right: 0;
          filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
          animation: weightDrop 0.5s ease-out;
        }

        /* Animação de caminhada */
        @keyframes walkCycle {
          0% {
            left: -80px;
          }
          20% {
            left: -80px;
          }
          45% {
            left: calc(100vw - 120px);
          }
          55% {
            left: calc(100vw - 120px);
          }
          80% {
            left: -80px;
          }
          100% {
            left: -80px;
          }
        }

        /* Animação do haltere */
        @keyframes dumbbellCycle {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          15% {
            opacity: 1;
            transform: translateY(-5px);
          }
          20% {
            opacity: 1;
            transform: translateY(-5px);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
          55% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }

        /* Animação das pernas */
        .leg-left {
          animation: legWalk 1s infinite alternate;
        }

        .leg-right {
          animation: legWalk 1s infinite alternate-reverse;
        }

        @keyframes legWalk {
          0% {
            transform: rotate(-5deg);
            transform-origin: top center;
          }
          100% {
            transform: rotate(5deg);
            transform-origin: top center;
          }
        }

        /* Animação dos braços */
        .arm-left {
          animation: armSwing 1s infinite alternate;
        }

        .arm-right {
          animation: armSwing 1s infinite alternate-reverse;
        }

        @keyframes armSwing {
          0% {
            transform: rotate(-10deg);
            transform-origin: center right;
          }
          100% {
            transform: rotate(10deg);
            transform-origin: center right;
          }
        }

        /* Animação da queda do peso */
        @keyframes weightDrop {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Responsividade */
        @media (max-width: 1023px) {
          .character-container,
          .weight-stack {
            display: none;
          }
        }

        /* Pausar animação quando não está visível */
        @media (prefers-reduced-motion: reduce) {
          .character-container,
          .dumbbell,
          .weight-plate {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
