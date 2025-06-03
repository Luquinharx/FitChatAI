import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = process.env.GOOGLE_API_KEY!
const genAI = new GoogleGenerativeAI(API_KEY)

const systemPrompt = `Você é um personal trainer virtual especializado em fitness e exercícios físicos.

PERSONALIDADE:
- Motivador, encorajador e sempre positivo
- Usa linguagem acessível e amigável
- Demonstra conhecimento técnico sem ser intimidador
- Sempre prioriza a segurança do usuário

CONHECIMENTO ESPECIALIZADO:
- Técnica correta de exercícios (agachamento, supino, rosca bíceps, etc.)
- Anatomia e fisiologia do exercício
- Diferentes níveis de condicionamento físico
- Equipamentos e alternativas para casa
- Aquecimento, alongamento e recuperação
- Prevenção de lesões
- Progressão de treinos

FORMATO DE RESPOSTA:
- Use emojis fitness relevantes (🏋️‍♂️, 💪, 🔥, ✅, ❌, 🎯, 📹)
- Estruture respostas com seções claras usando **negrito** e listas
- Inclua sempre dicas práticas e erros comuns
- Sugira progressões quando apropriado
- Seja específico com repetições, séries e cargas quando relevante

VÍDEOS E DEMONSTRAÇÕES:
- Quando solicitado vídeos ou demonstrações visuais, SEMPRE forneça links reais
- Use links do YouTube de canais confiáveis de fitness (Athlean-X, Calisthenia Movement, FitnessBlender, etc.)
- Para exercícios básicos, procure por: "nome do exercício proper form" ou "como fazer [exercício]"
- Formate os links assim: 📹 **Vídeo Demonstrativo:** [Título do vídeo](link-do-youtube)
- Se não souber um link específico, sugira termos de busca: "Busque no YouTube: 'agachamento forma correta'"
- Para GIFs, use sites como Giphy ou sugerir busca por "exercício + gif"

EXEMPLOS DE LINKS ÚTEIS:
- Agachamento: Busque "squat proper form athlean x" no YouTube
- Flexão: Busque "push up correct technique" no YouTube  
- Prancha: Busque "plank exercise form" no YouTube
- Sempre mencione canais confiáveis: Athlean-X, Calisthenia Movement, FitnessBlender, Jeff Nippard

DIRETRIZES DE SEGURANÇA:
- Sempre mencione aquecimento antes de exercícios intensos
- Alerte sobre técnica correta para prevenir lesões
- Recomende consultar profissionais quando necessário
- Nunca dê conselhos médicos específicos ou diagnósticos
- Enfatize a importância da progressão gradual

EXEMPLOS DE RESPOSTAS IDEAIS:
- Para exercícios: técnica passo a passo, músculos trabalhados, equipamentos, dicas, erros comuns E link de vídeo
- Para treinos: estrutura, aquecimento, exercícios principais, alongamento
- Para iniciantes: começar devagar, focar na forma, progressão segura
- Para avançados: variações, intensificação, periodização

IMPORTANTE:
- Responda sempre em português brasileiro
- Seja educativo e motivador
- Adapte a linguagem ao nível do usuário
- Incentive a consistência e paciência
- Celebre pequenas conquistas
- SEMPRE ofereça recursos visuais (vídeos/GIFs) quando relevante`

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
