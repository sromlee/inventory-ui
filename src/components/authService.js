import axios from "../api/axios";
import jwt from "jwt-decode";
import jwtDecode from "jwt-decode";

const API_LOGOUT_URL = "/api/v1/logout";

const logout = ({ access_token }) => {
  // const { user } = useAuth();
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

const AuthService = {
  logout,
  getCurrentUser,
  getCurrentRole,
};

export default AuthService;
