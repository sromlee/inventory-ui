import axios from "axios";
import AuthService from "../components/AuthService";
import TokenService from "../TokenService";

const BASE_URL = "http://174.138.18.87";
// const BASE_URL = "http://localhost:8000/"
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  
  function (config) {
    const token = AuthService.getCurrentUser();
    config.headers["Access-Control-Allow-Origin"] = "*";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token.access_token;
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    // if u add new Chainable promise or other interceptor
    // You have to return `config` inside of a rquest
    // otherwise u will get a very confusing error
    // and spend sometime to debug it.
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (!err.response) {
      return Promise.reject();
    }

    if (originalConfig.url !== "/api/v1/refresh" && err.response) {
      // Access Token was expired
      var data = new FormData();
      data.append("refresh_token", TokenService.getLocalRefreshToken());

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          console.log(
            "=========== refreshToken : " + TokenService.getLocalRefreshToken()
          );

          const rs = await instance.post("/api/v1/refresh", data, {
            headers: { "Content-Type": "application/json;" },
            params: { refresh_token: TokenService.getLocalRefreshToken() },
            withCredentials: true, //Add userID as a param
          });

          const accessToken = rs.data.access_token;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      if (err.response.status === 500 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    if (originalConfig.url === "/api/v1/refresh" && err.response.status === 401) {
      
      localStorage.removeItem("user");
      console.log("Refresh token expired ..........  "+ originalConfig.url)
      window.location.href = '/unauthorized';

      return Promise.reject(err);;
    }

    return Promise.reject(err);
  }
);

export default instance;
