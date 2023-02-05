import React from "react";
import ResponsiveExample from "./InventoryTable";
import InventorySearchForm from "./InventorySearchForm";
import { useState } from "react";
import AuthService from "../../AuthService";

function Inventory() {
  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [customer, setCustomer] = useState("");
  const [errors, setError] = useState([]);
  const role = AuthService.getCurrentRole(
    AuthService.getCurrentUser().access_token
  );

  const submitHandler = async (e) => {
    setError("");
    var error = [];
    e.preventDefault();

    if (role === "admin ") {
      if (!customer) {
        error.push("กรุณาเลือกกลุ่มลูกค้าที่ต้องการ");
      }
    }

    if (buttonClicked === "productId") {
      if (!productId) {
        error.push("กรุณาเลือกรหัสสินค้าที่ต้องการค้นหา");
      }
    }
    if (buttonClicked === "productName") {
      if (!productId) {
        error.push("กรุณาเลือกสินค้าที่ต้องการค้นหา");
      }
    }
    if (buttonClicked === "barcode") {
      if (!barcode) {
        error.push("กรุณาเลือกบาร์โค้ดที่ต้องการค้นหา");
      }
    }

    if (error.length >= 1) {
      setError(error);
    } else {
      // call api
    }

    console.log("There is/are error in the form : " + error);
    console.log("Button clicked: " + buttonClicked);
    console.log("Product id: " + productId);
    console.log("ProductName: " + productName);
    console.log("Barcode: " + barcode);
    console.log("Customer: " + customer);
    // Call api
  };

  // Call api

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container px-lg-5 ">
        <div className="card mt-4">
          <div className="card-body">
            <h2> ตรวจสอบสินค้า </h2>
            <hr />
            <div className="card justify-content-md-center">
              <div className="card-body">
                <InventorySearchForm
                  setProductID={setProductID}
                  setProductName={setProductName}
                  setBarcode={setBarcode}
                  setButtonClicked={setButtonClicked}
                  setCustomer={setCustomer}
                  submitHandler={submitHandler}
                />
                {errors.length >= 1 ? (
                  <div className="small" role="alert">
                    {errors.map((item, i) => (
                      <div
                        className="text-danger"
                        variant="danger"
                        size="sm"
                        key={i}
                      >
                        {" "}
                        {item}{" "}
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <hr />
            <ResponsiveExample />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
