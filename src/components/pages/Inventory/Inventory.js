import React from "react";
import Table from "./InventoryTable";
import InventorySearchForm from "./InventorySearchForm";
import { useState, useEffect } from "react";
import AuthService from "../../AuthService";

function Inventory() {
  const [errors, setError] = useState([]);
  const [show, setShow]=useState(false)
  const [productResult, setProductResult] = useState([]);
  const role = AuthService.getCurrentRole(
    AuthService.getCurrentUser().access_token
  );

  console.log(show)
  console.log(productResult)

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
                  setProductResult={setProductResult}
                  setError={setError}
                  setShow={setShow}
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
                {show ? <Table data={productResult.products} /> : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
