import jwtDecode from "jwt-decode";

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user?.accessToken;
};

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user?.refreshToken;
};

const getJWT = () => jwtDecode(getAccessToken());

const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const isTokenExpired = (token: any) => {
  const jwt = jwtDecode(token) as any;
  const currentTime = new Date().getTime() / 1000;
  return currentTime > jwt.exp;
};

const TokenUtils = {
  getAccessToken,
  getRefreshToken,
  getJWT,
  setUser,
  removeUser,
  isTokenExpired,
};

export default TokenUtils;
