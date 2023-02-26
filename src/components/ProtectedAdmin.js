import React from "react";
import { Navigate ,Outlet} from "react-router-dom";
import AuthService from "./AuthService";

const ProtectedAdmin = ()  => {
  
  let user = AuthService.getCurrentUser()
  var is_admin = false

  if(user){
    const role = AuthService.getCurrentRole(user.access_token)
    if (role === "admin") {
       is_admin =true
    }
  }


  if (!is_admin) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;;
};
export default ProtectedAdmin;
