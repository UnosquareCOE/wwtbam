import { prisma } from '../utils'

async function getAccounts() {
  const accounts = await prisma.accounts.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  })

  return accounts.map((account) => {
    const { id, first_name, last_name, email } = account
    return {
      id,
      firstName: first_name,
      lastName: last_name,
      emailAddress: email,
    }
  })
}

async function getAccount(accountId: number) {
  try {
    const account = await prisma.accounts.findFirst({
      where: { id: accountId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    })

    const { id, first_name, last_name, email } = account || {}
    return {
      id,
      firstName: first_name,
      lastName: last_name,
      emailAddress: email,
    }
  } catch (error) {
    return null
  }
}

async function createAccount(
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  const account = prisma.accounts.create({
    data: {
      password,
      first_name: firstName,
      last_name: lastName,
      email,
    },
  })

  return account
}

async function updateAccount(
  accountId: number,
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  const account = prisma.accounts.update({
    where: { id: accountId },
    data: {
      password,
      first_name: firstName,
      last_name: lastName,
      email,
    },
  })

  return account
}

async function deleteAccount(accountId: number) {
  const account = prisma.accounts.update({
    where: { id: accountId },
    data: {
      active: false,
    },
  })

  return account
}

const AccountService = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
}

export { AccountService }
