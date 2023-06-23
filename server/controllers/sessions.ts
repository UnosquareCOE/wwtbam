import { Response, Request } from 'express'
import { GameService, SessionService } from '../services'

async function getSessions(req: Request, res: Response) {
  const sessions = await SessionService.getSessions(req.tokenData.accountId)
  if (sessions && sessions.length > 0) {
    res.status(200).json(sessions)
  } else {
    res.sendStatus(204)
  }
}

async function getSession(req: Request, res: Response) {
  const { sessionId } = req.params
  const session = await SessionService.getSession(sessionId)
  if (session) {
    res.status(200).json(session)
  } else {
    res.sendStatus(404)
  }
}

async function getSessionParticipants(req: Request, res: Response) {
  const { sessionId } = req.params
  const participants = await SessionService.getSessionParticipants(sessionId)
  if (participants) {
    res.status(200).json(participants)
  } else {
    res.sendStatus(404)
  }
}

async function createSession(req: Request, res: Response) {
  const { name, password } = req.body
  const ownerId = req.tokenData.accountId
  const session = await SessionService.createSession(name, password, ownerId)
  if (session) {
    res.status(201).send(session)
  } else {
    res.sendStatus(400)
  }
}

async function deleteSession(req: Request, res: Response) {
  const { sessionId } = req.params
  const session = await SessionService.deleteSession(sessionId)
  if (session) {
    res.sendStatus(204)
  } else {
    res.send(400)
  }
}

async function getGames(req: Request, res: Response) {
  const { sessionId } = req.params
  const games = await GameService.getGames(sessionId)
  if (games && games.length > 0) {
    res.status(200).send(games)
  } else {
    res.send(204)
  }
}

async function createGame(req: Request, res: Response) {
  const { sessionId } = req.params
  const { type } = req.body
  const game = await GameService.createGame(type, sessionId, [])
  res.status(201).send(game)
}

const SessionController = {
  getSessions,
  getSession,
  getSessionParticipants,
  createSession,
  deleteSession,
  getGames,
  createGame,
}

export { SessionController }
