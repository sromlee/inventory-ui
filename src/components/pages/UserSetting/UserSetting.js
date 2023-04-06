import React from "react";
import UserSearchForm from "./UserSearchForm";

function Usersetting() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {" "}
      <div className="card">
        <div className="card mt-4">
          <div className="card-body">
            <h1> จัดการผู้ใช้งาน </h1>
            <hr/>
            <UserSearchForm/>
            <hr/>
           
            <hr/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usersetting;
