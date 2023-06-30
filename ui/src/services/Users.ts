import instance from "../utils/axios";

const createAccount = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
) => {
  return await instance
    .post("/auth/register", { email, firstName, lastName, password })
    .then((response) => {
      return response;
    });
};

const getAccount = async (userId: number) => {
  return await instance.get(`/accounts/${userId}`).then((response) => {
    return response;
  });
};

const getAccountByEmail = async (emailAddress: string) => {
  return await instance.get(`/accounts/${emailAddress}`).then((response) => {
    return response;
  });
};

const AccountService = {
  createAccount: createAccount,
  getAccount: getAccount,
  getAccountByEmail: getAccountByEmail,
};

export default AccountService;
