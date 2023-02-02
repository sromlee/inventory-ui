import React from "react";
import { Navigate ,Outlet} from "react-router-dom";
import AuthService from "./AuthService";
import UnauthorizedModal from "./UnauthorizeModal";

const ProtectedAdmin = ()  => {
  
  let user = AuthService.getCurrentUser()
  var is_admin = false
  console.log("User in Protected")
  console.log(user)

  if(user){
    const role = AuthService.getCurrentRole(user.access_token)
    console.log("User in Protected")
    console.log(role)
    if (role == "admin") {
       is_admin =true
    }
  }


  if (!is_admin) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;;
};
export default ProtectedAdmin;
