import React from "react";
import jwtDecode from "jwt-decode";
import AuthService from "../authService";
import logo from "../images/logo.png"

function Home() {
  const token = AuthService.getCurrentUser();

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                id="carouselExampleSlidesOnly"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={logo} className="d-block w-100" alt="..." />
                  </div>
                </div>
              </div>
              <hr/>
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
    </div>
  );
}

export default Home;
