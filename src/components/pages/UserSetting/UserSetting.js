import React from "react";
import UserSettingTable from "./UserSettingTable";
import UserSearchForm from "./UserSearchForm";

function Usersetting() {
  return (
    <div>
      {" "}
      <div className="card">
        <div className="card mt-4">
          <div className="card-body">
            <h2> จัดการผู้ใช้งาน </h2>
            <hr/>
            <UserSearchForm/>
            <hr/>
            <UserSettingTable/>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usersetting;
