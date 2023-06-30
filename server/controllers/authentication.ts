import { Response, Request } from 'express'
import { AuthenticationService } from '../services'

async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body
  const jwt = await AuthenticationService.authenticate(email, password)
  if (jwt) {
    res.status(200).send(jwt)
  } else {
    res.sendStatus(401)
  }
}

async function refresh(req: Request, res: Response) {
  const accountId = res.locals.user as number
  const jwt = await AuthenticationService.refresh(accountId)
  if (jwt) {
    res.status(200).send(jwt)
  } else {
    res.sendStatus(401)
  }
}

async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body
  const account = await AuthenticationService.register(
    email,
    firstName,
    lastName,
    password
  )
  if (account) {
    res.status(200).send(account)
  } else {
    res.sendStatus(401)
  }
}

const AuthenticationController = {
  authenticate,
  register,
  refresh,
}

export { AuthenticationController }
