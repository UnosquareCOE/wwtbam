import { Router } from 'express'
import { SessionController } from '../controllers'
import { verifyAuth } from '../middleware/verifyAuth'

const SessionsRouter = Router()

SessionsRouter.route('/').get(SessionController.getSessions)

SessionsRouter.route('/:sessionId').get(SessionController.getSession)

SessionsRouter.route('/').post(SessionController.createSession)

SessionsRouter.route('/:sessionId').delete(SessionController.deleteSession)

SessionsRouter.route('/:sessionId/participants').get(
  SessionController.getSessionParticipants
)

SessionsRouter.route('/:sessionId/games').get(SessionController.getGames)

export { SessionsRouter }
