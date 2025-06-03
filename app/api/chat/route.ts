import { getChatResponse, detectExperienceLevel } from "@/lib/gemini"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Mensagens inválidas" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Detectar nível de experiência baseado na última mensagem
    const lastMessage = messages[messages.length - 1]
    const experienceLevel = detectExperienceLevel(lastMessage.content)

    console.log(`Processando mensagem para usuário ${experienceLevel}`)

    // Obter resposta do Gemini
    const responseText = await getChatResponse(messages, experienceLevel)

    // Streaming mais suave preservando formatação
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // Dividir por sentenças e parágrafos para preservar formatação
        const segments = responseText.split(/(\n\n|\n|\*\*[^*]+\*\*|[.!?]+\s)/)
        let index = 0

        const interval = setInterval(() => {
          if (index < segments.length) {
            const segment = segments[index]
            if (segment && segment.trim()) {
              // Escapar aspas duplas para JSON
              const escapedSegment = segment.replace(/"/g, '\\"').replace(/\n/g, "\\n")
              controller.enqueue(encoder.encode(`data: {"type":"text-delta","textDelta":"${escapedSegment}"}\n\n`))
            }
            index++
          } else {
            controller.enqueue(encoder.encode(`data: {"type":"finish","finishReason":"stop"}\n\n`))
            controller.close()
            clearInterval(interval)
          }
        }, 50) // Velocidade mais rápida mas preservando estrutura
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error: any) {
    console.error("Erro na API de chat:", error)

    const errorMessage = error.message || "Erro interno do servidor"

    return new Response(
      JSON.stringify({
        error: errorMessage,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
