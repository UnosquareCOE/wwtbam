import instance from "../utils/axios";

const authenticate = async (email: string, password: string) => {
  return await instance.post("/auth", { email, password }).then((response) => {
    return response;
  });
};

const refresh = async () => {
  return await instance.post("/auth/refresh").then((response) => {
    return response;
  });
};

const AuthService = {
  authenticate: authenticate,
  refresh: refresh,
};

export default AuthService;
