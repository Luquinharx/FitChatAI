export interface Exercise {
  id: string
  name: string
  category: string
  description: string
  instructions: string[]
  videoUrl: string
  equipment: string[]
  muscleGroups: string[]
  difficulty: "Iniciante" | "Intermediário" | "Avançado"
  tips: string[]
  commonMistakes: string[]
}

export const exerciseLibrary: Exercise[] = [
  {
    id: "agachamento",
    name: "Agachamento",
    category: "Pernas",
    description: "Exercício fundamental para fortalecimento de pernas e glúteos",
    instructions: [
      "Fique em pé com os pés afastados na largura dos ombros",
      "Mantenha o peito erguido e o core contraído",
      "Desça flexionando quadris e joelhos como se fosse sentar",
      "Desça até as coxas ficarem paralelas ao chão",
      "Suba empurrando pelos calcanhares",
      "Mantenha os joelhos alinhados com os pés",
    ],
    videoUrl: "/videos/agachamento.mp4",
    equipment: ["Peso corporal", "Barra", "Halteres"],
    muscleGroups: ["Quadríceps", "Glúteos", "Isquiotibiais"],
    difficulty: "Iniciante",
    tips: [
      "Mantenha o peso nos calcanhares",
      "Não deixe os joelhos passarem da ponta dos pés",
      "Respire fundo na descida e expire na subida",
    ],
    commonMistakes: ["Joelhos para dentro", "Inclinação excessiva do tronco", "Não descer o suficiente"],
  },
  {
    id: "rosca-biceps",
    name: "Rosca Bíceps",
    category: "Braços",
    description: "Exercício isolado para desenvolvimento dos músculos bíceps",
    instructions: [
      "Fique em pé com halteres nas mãos",
      "Mantenha os cotovelos próximos ao corpo",
      "Flexione os braços levando os pesos em direção aos ombros",
      "Contraia o bíceps no topo do movimento",
      "Desça controladamente até a posição inicial",
      "Mantenha o core estável durante todo o movimento",
    ],
    videoUrl: "/videos/rosca-biceps.mp4",
    equipment: ["Halteres", "Barra", "Cabo"],
    muscleGroups: ["Bíceps", "Antebraços"],
    difficulty: "Iniciante",
    tips: ["Evite balançar o corpo", "Controle a fase excêntrica (descida)", "Mantenha os punhos firmes"],
    commonMistakes: ["Usar impulso do corpo", "Cotovelos muito afastados", "Amplitude incompleta"],
  },
  {
    id: "supino",
    name: "Supino Reto",
    category: "Peito",
    description: "Exercício composto para desenvolvimento do peitoral, ombros e tríceps",
    instructions: [
      "Deite no banco com os pés firmes no chão",
      "Segure a barra com pegada um pouco mais larga que os ombros",
      "Retire a barra do suporte e posicione sobre o peito",
      "Desça a barra controladamente até tocar o peito",
      "Empurre a barra para cima até extensão completa dos braços",
      "Mantenha as escápulas retraídas durante todo movimento",
    ],
    videoUrl: "/videos/supino.mp4",
    equipment: ["Barra", "Banco", "Halteres"],
    muscleGroups: ["Peitoral", "Ombros", "Tríceps"],
    difficulty: "Intermediário",
    tips: ["Mantenha os pés no chão", "Contraia o core para estabilidade", "Use um spotter para segurança"],
    commonMistakes: [
      "Arco excessivo nas costas",
      "Barra muito alta ou baixa no peito",
      "Velocidade excessiva na descida",
    ],
  },
]

export function findExercise(query: string): Exercise | null {
  const normalizedQuery = query.toLowerCase()

  return (
    exerciseLibrary.find(
      (exercise) =>
        exercise.name.toLowerCase().includes(normalizedQuery) ||
        exercise.category.toLowerCase().includes(normalizedQuery) ||
        exercise.muscleGroups.some((muscle) => muscle.toLowerCase().includes(normalizedQuery)),
    ) || null
  )
}

export function getExercisesByCategory(category: string): Exercise[] {
  return exerciseLibrary.filter((exercise) => exercise.category.toLowerCase() === category.toLowerCase())
}

export function getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
  return exerciseLibrary.filter((exercise) =>
    exercise.muscleGroups.some((muscle) => muscle.toLowerCase().includes(muscleGroup.toLowerCase())),
  )
}
