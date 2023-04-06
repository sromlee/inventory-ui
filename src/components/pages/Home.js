import React from "react";
import AuthService from "../AuthService";
import { Container } from "react-bootstrap";

function Home() {
  const token = AuthService.getCurrentUser();

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark p-2 text-dark bg-opacity-25 py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">Welcome !</h1>
              {token ? (
                <p className="fs-4"></p>
              ) : (
                <div>
                  <hr />
                  <a> กรุณาเข้าสู่ระบบเพื่อใช้งาน
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <hr />
      <Container>
        <div className="row">
          <div className="col-sm-6">
            <div className="card text-center">
              <div className="card-body">
                <a href="/inventory" className="btn btn-outline-dark">
                  ตรวจสอบสินค้า
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </Container>
    </div>
  );
}

export default Home;
