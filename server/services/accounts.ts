import { prisma } from "../utils";

async function getAccounts() {
  const accounts = await prisma.accounts.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  });

  return accounts.map((account) => {
    const { id, first_name, last_name, email } = account;
    return {
      id,
      firstName: first_name,
      lastName: last_name,
      emailAddress: email,
    };
  });
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
  });

  return account;
}

const AccountService = {
  getAccounts,
  createAccount,
};

export { AccountService };
