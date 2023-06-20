import { prisma } from '../utils'
const fetch = require('node-fetch')

type QuestionModel = {
  question: { text: string }
  correctAnswer: string
  incorrectAnswers: string[]
  difficulty: string
}

let difficultyMap = new Map<string, number>([
  ['easy', 1],
  ['medium', 2],
  ['hard', 3],
])

async function generateQuestions() {
  var triviaQuestionsFromAPI: QuestionModel[]

  const response = await fetch(
    'https://the-trivia-api.com/v2/questions?limit=15'
  )
  const data = (await response.json()) as QuestionModel[]

  triviaQuestionsFromAPI = data

  const questionsToBeAdded = triviaQuestionsFromAPI.map((item) => {
    return {
      title: item.question.text,
      question_difficulty_type_id: difficultyMap.get(item.difficulty),
      questionItems: [item.correctAnswer, ...item.incorrectAnswers],
      correctAnswer: item.correctAnswer,
    }
  })

  questionsToBeAdded.forEach(async (item) => {
    await prisma.questions.create({
      data: {
        title: item.title,
        question_difficulty_type_id: item.question_difficulty_type_id,
        question_items: {
          create: item.questionItems.map((questionItem) => {
            return {
              value: questionItem,
              outcome: questionItem === item.correctAnswer,
            }
          }),
        },
      },
    })
  })
}

async function getQuestions(gameType: number) {
  await QuestionService.generateQuestions()
  const limit = gameType === 2 ? 1 : 15
  return prisma.questions.findMany({
    take: limit,
  })
}

const QuestionService = {
  generateQuestions,
  getQuestions,
}

export { QuestionService }
