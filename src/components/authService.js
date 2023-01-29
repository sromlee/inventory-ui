import axios from "../api/axios";
const API_LOGOUT_URL = "/logout";

const logout = ({ access_token }) => {
  // const { user } = useAuth();
  let token = "Bearer "+access_token
  const config = {
    headers:{
      "Content-Type": "application/json",
      "Authorization": token,
      
    }
  };

  try {
    console.log("access_token in auth");
    console.log(token);
    const response = axios.get(API_LOGOUT_URL, config, {withCredentials: true}
    );
    console.log(response)

  } catch (err) {
    if (!err?.response) {
      console.log("No server response");
    } else if (err.response.status === 400) {
      console.log("Missing username or password");
    } else if (err.response.status === 401) {
      console.log("Incorrect Username and Password");
    } else {
      console.log("Login Failed");
    }
  }

  localStorage.removeItem("user");
};
// return axios.get(API_URL + "signout").then((response) => {
//   return response.data;
// });

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  logout,
  getCurrentUser,
};

export default AuthService;
