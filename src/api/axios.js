import axios from "axios";
import AuthService from "../components/AuthService";
import { useAuth } from "../components/context/AuthProvider";
import TokenService from "../TokenService";
import React from "react";

const BASE_URL = "http://localhost:8000/";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = AuthService.getCurrentUser();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token.access_token;
    }
    console.log("request => config ====================================");
    console.log(config);
    console.log("request => config ====================================");

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

    if (originalConfig.url !== "/api/v1/refresh" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          console.log("=========== refreshToken : "+ TokenService.getLocalRefreshToken())  
          const rs = await instance.post("/api/v1/refresh", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);


export default instance;
