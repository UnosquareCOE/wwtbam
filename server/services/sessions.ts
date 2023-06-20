import { prisma } from '../utils'

async function getSessions(ownerId: number) {
  const sessions = await prisma.sessions.findMany({
    where: { owner_id: ownerId },
    select: {
      id: true,
      name: true,
      created_date: true,
    },
  })

  return sessions.map((session) => {
    const { id, name, created_date } = session
    return {
      id,
      name: name,
      createdDate: created_date,
    }
  })
}

async function getSession(sessionId: number) {
  try {
    const session = await prisma.sessions.findFirst({
      where: { id: sessionId },
    })
    const { id, name, created_date, owner_id } = session || {}
    return {
      id,
      name: name,
      createdDate: created_date,
      ownerId: owner_id,
    }
  } catch (error) {
    return null
  }
}

async function createSession(
  sessionName: string,
  password: string,
  ownerId: number
) {
  const session = await prisma.sessions.create({
    data: {
      name: sessionName,
      password,
      created_date: new Date(),
      owner_id: ownerId,
    },
  })
  const { id, name, created_date } = session
  return { id: id, name: name, createdDate: created_date }
}

async function deleteSession(sessionId: number) {
  const openGames = await prisma.games.findMany({
    where: { session_id: sessionId },
  })

  if (openGames.length == 0) {
    const session = await prisma.sessions.delete({
      where: { id: sessionId },
    })
    return session
  }
  return null
}

async function getSessionParticipants(sessionId: number) {
  try {
    const participants = await prisma.participants.findMany({
      where: { session_id: sessionId },
      select: {
        id: true,
        name: true,
        avatar: true,
        created_date: true,
      },
    })
    return participants.map((participant) => {
      const { id, name, avatar, created_date } = participant
      return {
        id,
        name,
        avatar,
        createdDate: created_date,
      }
    })
  } catch (error) {
    return null
  }
}

const SessionService = {
  getSessions,
  getSession,
  getSessionParticipants,
  createSession,
  deleteSession,
}

export { SessionService }
