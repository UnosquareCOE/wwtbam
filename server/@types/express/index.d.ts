import { Express } from 'express-serve-static-core'

interface TokenData {
  accountId: number
  iat: number | undefined
}

declare global {
  namespace Express {
    interface Request {
      tokenData: TokenData
    }
  }
}
