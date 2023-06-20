import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, verifiedToken) => {
      if (err) {
        return res.sendStatus(401)
      }
      try {
        const { accountId, iat } = verifiedToken as JwtPayload
        // TODO res.locals
        req.tokenData = { accountId, iat }
        next()
      } catch (error) {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
}
