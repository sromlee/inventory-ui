import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="section footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h6> Company Information</h6>
            <hr />
            <p>something</p>
          </div>
          <div className="col-6">
            <h6>Quick Links</h6>
            <hr />
            <div>
              {" "}
              <Link to="/"> Home</Link>
            </div>
            <div>
              {" "}
              <Link to="/inventory"> ตรวจสอบสินค้า</Link>
            </div>
            <div>
              {" "}
              <Link to="/userSetting"> User Setting</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Footer;
