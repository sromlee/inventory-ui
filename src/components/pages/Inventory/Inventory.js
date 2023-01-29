import React from "react";
import ResponsiveExample from "./InventoryTable";
import BasicExample from "./InventorySearchForm";

function Inventory() {
  return (
    <div>
      <div className="card">
        <div className="card mt-4">
          <div className="card-body">
            <h2> ตรวจสอบสินค้า </h2>
            <hr/>
            <BasicExample/>
            <hr/>
            <ResponsiveExample/>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
