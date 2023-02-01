import React from "react";
import AuthService from "../authService";
import { Col, Row, Container } from "react-bootstrap";

function Home() {
  const token = AuthService.getCurrentUser();

  return (
    <div classNameName="d-flex flex-column min-vh-100">
      <header classNameName=" bg-dark py-5">
        <div classNameName="container px-lg-5">
          <div classNameName="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div classNameName="m-4 m-lg-5">
              <h1 classNameName="display-5 fw-bold">ยินดีต้อนรับ !</h1>
              {token ? (
                <p classNameName="fs-4"></p>
              ) : (
                <div>
                  <hr />
                  <a className="btn btn-primary btn-md" href="/login">
                    {" "}
                    เข้าสู่ระบบ{" "}
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
          <div className="col-sm-6">
            <div className="card text-center">
              <div className="card-body">
                <a href="/usersetting" className="btn btn-outline-dark">
                  จัดการผู้ใช้
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
