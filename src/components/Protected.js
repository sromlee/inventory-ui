import React from "react";
import { Navigate ,Outlet} from "react-router-dom";
import AuthService from "./authService";


const Protected = ()  => {
  
  const user = AuthService.getCurrentUser()
  console.log("User in Protected")
  console.log(user)


  if (!user?.access_token ) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;;
};
export default Protected;
