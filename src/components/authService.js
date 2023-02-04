import axios from "../api/axios";
import jwt from "jwt-decode";

const API_LOGOUT_URL = "/api/v1/logout";

const logout = ({ access_token }) => {

  let token = "Bearer " + access_token;
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  axios
    .get(API_LOGOUT_URL, { headers, withCredentials: true })
    .then((response) => console.log(response));

  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentRole = (token)=>{
  const decode_user = jwt(token)
  return decode_user.Role
}

const getLocalRefreshToken = () =>{
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
}

const updateLocalAccessToken = (token) =>  {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
}

const AuthService = {
  logout,
  getCurrentUser,
  getCurrentRole,
  updateLocalAccessToken,
  getLocalRefreshToken,
};

export default AuthService;
