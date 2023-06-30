import { prisma } from '../utils'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants/auth'
import { AccountService } from './accounts'

async function authenticate(email: string, password: string) {
  const account = await prisma.accounts.findFirst({
    where: { email },
  })

  const authenticated = await bcrypt.compare(password, account?.password ?? '')

  if (authenticated) {
    const tokens = await generateTokens(account)
    return { tokens, account }
  }

  return null
}

async function refresh(accountId: number) {
  const account = await AccountService.getAccount(accountId)
  if (account) {
    return await generateTokens(account)
  }
  return Error('Token could not be generated')
}

function generateTokens(account: any) {
  return new Promise((response, reject) => {
    try {
      const accessToken = jwt.sign({ sub: account.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: 1000,
      })
      const refreshToken = jwt.sign({ sub: account.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: 60000,
      })
      response({ accessToken, refreshToken })
    } catch (error) {
      reject(error)
    }
  })
}

async function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  const hashy = await bcrypt.hash(password, 10)

  const account = await prisma.accounts.create({
    data: {
      password: hashy,
      first_name: firstName,
      last_name: lastName,
      email,
    },
  })
  const mapped = {
    firstName: account.first_name,
    lastName: account.last_name,
    email: account.email,
  }
  return { mapped }
}

const AuthenticationService = {
  authenticate,
  register,
  refresh,
}

export { AuthenticationService }
