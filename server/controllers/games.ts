import { Response, Request } from 'express'
import { GameService } from '../services'

async function getGames(req: Request, res: Response) {
  const { sessionId } = req.params
  const games = await GameService.getGames(sessionId)
  if (games && games.length > 0) {
    res.status(200).json(games)
  } else {
    res.sendStatus(204)
  }
}

async function getGame(req: Request, res: Response) {
  const { gameId } = req.params
  const game = await GameService.getGame(parseInt(gameId))
  if (game) {
    res.status(200).json(game)
  } else {
    res.sendStatus(404)
  }
}

const GameController = {
  getGames,
  getGame,
}

export { GameController }
