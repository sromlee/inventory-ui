import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">
    <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        หน้าหลัก
                      </Link>
                    </li>

                    <li className="nav-item ">
                      <Link className="nav-link" to="/Inventory">
                        ตรวจสอบสินค้า
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link" to="/UserSetting">
                        จัดการผู้ใช้งาน
                      </Link>
                    </li>
                  </ul>
</div>
  );
}

export default Navbar;
