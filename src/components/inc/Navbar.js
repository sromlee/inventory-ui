import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import AuthService from "../AuthService";
import logo from "../images/logo.png"

function Navigation() {
  const { user } = useAuth();

  return (
    <>
      <div className="navbar-expand-lg bg-light shadow">
        <div className="row">
          <div className="col-md-12">
            <Navbar
              className=" text-to-right ml-auto"
              collapseOnSelect
              expand="sm"
              bg="light"
              variant="light"
            >
              <Container>
                <Navbar.Brand>
                  <img width="150" src={logo} alt="DILOK"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav
                    className="justify-content-end"
                    style={{ width: "100%" }}
                  >
                    <Nav.Link className="nav-item nav-link px-3" href="/">
                      {" "}
                      Home
                    </Nav.Link>
                    <Nav.Link className="nav-item nav-link px-3" href="/inventory">
                      {" "}
                      ตรวจสอบสินค้า
                    </Nav.Link>
                    <div>
                     
                      {user ? (
                        <Button
                          className="ml- auto"
                          type="button"
                          variant="outline-info"
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            AuthService.logout(user);
                            window.location.href = "/login";
                          }}
                        >
                          {" "}
                          ออกจากระบบ
                        </Button>
                      ) : (
                        <Button
                          className="ml- auto"
                          type="button"
                          variant="outline-info"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/login";
                          }}
                        >
                          เข้าสู่ระบบ
                        </Button>
                      )}
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
