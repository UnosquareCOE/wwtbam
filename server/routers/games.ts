import { Router } from 'express'
import { GameController } from '../controllers'

const GamesRouter = Router()

GamesRouter.route('/:gameId').get(GameController.getGame)

export { GamesRouter }
