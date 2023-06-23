import { prisma } from '../utils'

type Participant = {
  participantId: string
  participantTypeId: number
}

async function getGames(sessionId: string) {
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
    return {
      game,
    }
  } catch (error) {
    return null
  }
}

async function createGame(
  type: number,
  sessionId: string,
  participants: Participant[]
) {
  const game = await prisma.games.create({
    data: {
      session_id: sessionId,
      game_type_id: type,
      created_date: new Date(),
    },
  })

  const lifelinesAndMilestones = await prisma.game_types.findFirst({
    where: { id: type },
    include: {
      game_type_lifelines: {
        include: {
          lifelines: true,
        },
      },
      game_type_milestones: true,
    },
  })

  const { id, session_id, game_type_id, created_date } = game
  const { game_type_lifelines, game_type_milestones } =
    lifelinesAndMilestones || {}

  return {
    id,
    sessionId: session_id,
    gameTypeId: game_type_id,
    status: 'Not Started',
    createdDate: created_date,
    participants: participants,
    currentQuestion: 0,
    lifelines: game_type_lifelines,
    milestones: game_type_milestones,
  }
}

const GameService = {
  getGames,
  getGame,
  createGame,
}

export { GameService }
