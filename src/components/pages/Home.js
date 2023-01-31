import React from "react";
import AuthService from "../authService";
import { Col, Row, Container } from "react-bootstrap";

function Home() {
  const token = AuthService.getCurrentUser();

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className=" bg-dark py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">ยินดีต้อนรับ !</h1>
              {token ? (
                <p className="fs-4"></p>
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
        <div class="row">
          <div class="col-sm-6">
            <div class="card text-center">
              <div class="card-body">
                <a href="/inventory" class="btn btn-outline-dark">
                  ตรวจสอบสินค้า
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card text-center">
              <div class="card-body">
                <a href="/usersetting" class="btn btn-outline-dark">
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
