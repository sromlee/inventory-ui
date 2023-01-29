import React from "react";
import jwtDecode from "jwt-decode";
import AuthService from "../authService";

function Home() {
  const token = AuthService.getCurrentUser();

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="main-heading"> Company Name </h3>
              <div className="underline mx-auto"></div>
              {token ? (
                <p>Welcome ! {jwtDecode(token.access_token).User}</p>
              ) : (
                <p> Hi ,Please login</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main header
      <section className="section bg-c-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading">ลงชื่อเข้าสู่ระบบ</h3>
              <div className="underline mx-auto"></div>
            </div>
            <div className="card">
              <div className="card-body">
                <Login />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
