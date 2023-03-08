import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../AuthService";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  let user = AuthService.getCurrentUser();
  const routeToLogin = () =>{ 
    let path = `/login`; 
    navigate(path);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className=" bg-dark p-2 text-dark bg-opacity-25 py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            {user ? (
              <div className="m-4 m-lg-5">
                <h1>session expired</h1>
                <div className="flexGrow">
                  <button className="btn btn-danger btn-md" onClick={routeToLogin}>
                    {" "}
                    กรุณาเข้าสู่ระบบเพื่อใช้งาน {" "}
                  </button>
                </div>
              </div>
            ) : (
              <div className="m-4 m-lg-5">
                <h1>กรุณาเข้าสู่ระบบเพื่อใช้งาน</h1>
                <div className="flexGrow">
                  <button className="btn btn-primary btn-md" onClick={routeToLogin}>
                    {" "}
                    เข้าสู่ระบบ{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Unauthorized;
