import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService  from "./AuthService";
import jwt from "jwt-decode";

const Protected = () => {
  const user = AuthService.getCurrentUser();
  let is_ath = false;

  console.log("User in Protected");
  console.log(user?.access_token);

  function isTokenExpired(exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpTime = exp;
    console.log("currentTime: "+currentTime)
    console.log("tokenExpTime: "+tokenExpTime)
    return tokenExpTime < currentTime;
  }

  if (user?.access_token) {
    console.log("Has data in local storage");
    const decode_user = jwt(user.access_token)
    if (isTokenExpired(decode_user.exp)) {
      console.log("Token is  expired")
      is_ath = false;
    } else {
      console.log("Token is not expired")
      is_ath = true;
    }
  } else {
    is_ath = false;
    console.log("Don't Has data in local storage");
  }
  console.log("Is auth: " + is_ath)

  if (!is_ath) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};
export default Protected;
