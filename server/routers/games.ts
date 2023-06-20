import { Router } from 'express'
import { GameController } from '../controllers'

const GamesRouter = Router()

GamesRouter.route('/:gameId').get(GameController.getGame)

GamesRouter.route('/').post(GameController.createGame)

// GamesRouter.route('/:gameId/participants').get(
//   GameController.,
// )

export { GamesRouter }
