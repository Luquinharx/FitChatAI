import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = process.env.GOOGLE_API_KEY!
const genAI = new GoogleGenerativeAI(API_KEY)

const systemPrompt = `Você é um personal trainer virtual especializado em fitness.

PERSONALIDADE:
- Motivador e encorajador
- Linguagem clara e direta
- Respostas objetivas e práticas
- Sempre prioriza segurança

FORMATO DE RESPOSTA:
- Máximo 3-4 parágrafos por resposta
- Use **negrito** para destacar pontos importantes
- Inclua emojis fitness: 🏋️‍♂️ 💪 🔥 ✅ ❌ 🎯 📹
- Separe seções com quebras de linha

ESTRUTURA IDEAL:
**Técnica Principal:** (1-2 frases)

**Execução:** (3-4 passos máximo)
1. Passo 1
2. Passo 2
3. Passo 3

**Dicas Importantes:** ✅ (2-3 dicas máximo)

**Erros Comuns:** ❌ (1-2 erros principais)

VÍDEOS:
- SEMPRE forneça links reais do YouTube quando solicitado
- Use: 📹 **Vídeo:** [Título](link) ou "Busque: 'termo de busca'"
- Canais recomendados: Athlean-X, FitnessBlender, Jeff Nippard

SEGURANÇA:
- Sempre mencione aquecimento
- Foque na técnica correta
- Progressão gradual
- Consulte profissionais quando necessário

IMPORTANTE: Seja conciso, prático e motivador. Evite textos longos.`

export async function getChatResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  experienceLevel = "iniciante",
): Promise<string> {
  try {
    if (!API_KEY) {
      throw new Error("Chave da API do Google não configurada")
    }

    // Usando o modelo gemini-2.0-flash que é mais avançado
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    })

    // Preparando o histórico de chat (últimas 10 mensagens para contexto)
    const recentMessages = messages.slice(-10)
    const history = recentMessages
      .slice(0, -1)
      .map((msg) => `${msg.role === "user" ? "Usuário" : "Personal Trainer"}: ${msg.content}`)
    const lastMessage = messages[messages.length - 1].content

    // Criando o prompt completo com contexto
    const prompt = `${systemPrompt}

NÍVEL DE EXPERIÊNCIA DO USUÁRIO: ${experienceLevel}

HISTÓRICO DA CONVERSA:
${history.length > 0 ? history.join("\n\n") : "Primeira interação"}

PERGUNTA/MENSAGEM ATUAL:
${lastMessage}

RESPOSTA (como personal trainer virtual motivador e técnico):`

    console.log("Enviando requisição para Gemini...")

    // Gerando a resposta
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (!text || text.trim().length === 0) {
      throw new Error("Resposta vazia da API")
    }

    console.log("Resposta recebida do Gemini com sucesso")
    return text.trim()
  } catch (error: any) {
    console.error("Erro ao obter resposta do Gemini:", error)

    // Tratamento específico de erros
    if (error instanceof Error) {
      const message = error.message.toLowerCase()

      if (message.includes("api key") || message.includes("authentication")) {
        throw new Error("🔑 Erro de autenticação com a API. Verifique a configuração da chave API.")
      }

      if (message.includes("network") || message.includes("failed to fetch") || message.includes("connection")) {
        throw new Error("🌐 Erro de conexão. Verifique sua internet e tente novamente.")
      }

      if (message.includes("quota") || message.includes("limit") || message.includes("rate")) {
        throw new Error("⏱️ Limite de requisições atingido. Aguarde alguns minutos e tente novamente.")
      }

      if (message.includes("not found") || message.includes("not supported") || message.includes("model")) {
        throw new Error("🤖 Modelo de IA temporariamente indisponível. Tente novamente em alguns minutos.")
      }

      if (message.includes("safety") || message.includes("blocked")) {
        throw new Error("🛡️ Conteúdo bloqueado por políticas de segurança. Reformule sua pergunta.")
      }
    }

    // Erro genérico
    throw new Error("❌ Erro inesperado ao processar sua pergunta. Tente novamente ou reformule a pergunta.")
  }
}

// Função para detectar nível de experiência baseado na mensagem
export function detectExperienceLevel(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("iniciante") || lowerMessage.includes("começando") || lowerMessage.includes("nunca fiz")) {
    return "iniciante"
  }

  if (
    lowerMessage.includes("intermediário") ||
    lowerMessage.includes("já treino") ||
    lowerMessage.includes("alguns meses")
  ) {
    return "intermediário"
  }

  if (
    lowerMessage.includes("avançado") ||
    lowerMessage.includes("anos de treino") ||
    lowerMessage.includes("competição")
  ) {
    return "avançado"
  }

  return "iniciante" // padrão
}
