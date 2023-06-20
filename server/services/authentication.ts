import { prisma } from '../utils'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

async function authenticate(email: string, password: string) {
  const account = await prisma.accounts.findFirst({
    where: { email },
  })

  const authenticated = await bcrypt.compare(password, account?.password ?? '')

  if (authenticated) {
    const accessToken = jwt.sign(
      { accountId: account?.id },
      `${process.env.JWT_SECRET}`
    )
    return accessToken
  }

  return null
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
}

export { AuthenticationService }
