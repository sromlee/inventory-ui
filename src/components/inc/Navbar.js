import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import AuthService from "../authService";

function Navigation() {
  const { user } = useAuth();
  
  return (
    <>
      <div className="navbar-expand-lg bg-light shadow">
        <div className="row">
          <div className="col-md-12">
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
              <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav>
                    <Nav.Link href="/"> Home</Nav.Link>
                    <Nav.Link href="/inventory"> ตรวจสอบสินค้า</Nav.Link>
                    <Nav.Link href="/usersetting"> User Setting</Nav.Link>
                   
                  </Nav>
                </Navbar.Collapse>
                <div className="d-flex align-items-center">
                  {user ? (
                    <button
                      type="button"
                      className="btn btn-primary me-3"
                      onClick={(e) => {
                        e.preventDefault();
                        AuthService.logout(user)
                        window.location.href = "/";
                      }}
                    >
                      ออกจากระบบ
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary me-3"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/login";
                      }}
                    >
                      เข้าสู่ระบบ
                    </button>
                  )}
                </div>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
