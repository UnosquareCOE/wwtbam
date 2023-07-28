import axios from "axios";
import TokenUtils from "./token";
import NavigationRoutes from "../constants/routes";

const instance = axios.create({
  // process.env.REACT_APP_API_URL ??
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token =
      config.url !== "/auth/refresh"
        ? TokenUtils.getAccessToken()
        : TokenUtils.getRefreshToken();
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalConfig = err.config;
    console.log("org,:", originalConfig);

    if (err.response && err.response.status === 401) {
      if (originalConfig.url !== "/auth/refresh") {
        const refreshResponse = await instance.post("/auth/refresh");

        if (refreshResponse.status === 200) {
          TokenUtils.setUser(refreshResponse.data);
          return instance(originalConfig);
        }
        return Promise.reject(err);
      } else {
        TokenUtils.removeUser();
        window.location.href = NavigationRoutes.Login;
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
