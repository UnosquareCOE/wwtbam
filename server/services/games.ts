import { games } from '@prisma/client'
import { prisma } from '../utils'
import { QuestionService } from './questions'

async function getGames(sessionId: number) {
  const games = await prisma.games.findMany({
    where: { session_id: sessionId },
    select: {
      id: true,
      game_type_id: true,
      created_date: true,
    },
  })

  return games.map((game) => {
    const { id, game_type_id, created_date } = game
    return {
      id,
      gameTypeId: game_type_id,
      createdDate: created_date,
    }
  })
}

async function getGame(gameId: number) {
  try {
    const game = await prisma.games.findFirst({
      where: { id: gameId },
      include: {
        game_questions: {
          include: {
            questions: {
              include: {
                question_items: true,
              },
            },
          },
        },
      },
    })

    // const { id, game_questions, game_participants } = game || {}
    return {
      game,
    }
  } catch (error) {
    return null
  }
}

async function createGame(type: number, sessionId: number) {
  const questions = await QuestionService.getQuestions(type)

  const game: games = await prisma.games.create({
    data: {
      created_date: new Date(),
      description: 'Some default description',
      session_id: sessionId,
      game_type_id: type,
      game_questions: {
        create: questions.map((item) => {
          return { sequence: item.id, question_id: item.id }
        }),
      },
    },
    include: {
      game_questions: {
        include: {
          questions: {
            include: {
              question_items: true,
            },
          },
        },
      },
    },
  })

  return game
}

const GameService = {
  getGames,
  getGame,
  createGame,
}

export { GameService }
