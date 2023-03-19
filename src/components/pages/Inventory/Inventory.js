import React from "react";
import Table from "./InventoryTable";
import InventorySearchForm from "./InventorySearchForm";
import { useState } from "react";
// import AuthService from "../../AuthService";

const ITEMS_PER_PAGE = 10; // Number of items to display per page

function Inventory() {
  const [errors, setError] = useState([]);
  const [show, setShow] = useState(false);
  const [productResult, setProductResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const [sortOrder, setSortOrder] = useState("asc")
  const pageNumbers = [];
  let currentItems = [];

  if (productResult.products) {
     currentItems = productResult.products.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

 
    console.log("Page: " + currentPage);

    for (
      let i = 1;
      i <= Math.ceil(productResult.products.length / ITEMS_PER_PAGE);
      i++
    ) {
      pageNumbers.push(i);
    }
  }
  const  setCurrentPageNumber = (pageNumber, sortOrder) => {
    setCurrentPage(pageNumber);
    setSortOrder(sortOrder);
  };

  console.log(errors);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container px-lg-5 ">
          <div className="card-body">
            <hr />
            <div className="card justify-content-md-center">
              <div className="card-body">
                <InventorySearchForm
                  setProductResult={setProductResult}
                  setError={setError}
                  setShow={setShow}
                  setCurrentPageNumber={setCurrentPageNumber}
                />
                {errors ? (
                  <div className="small" role="alert">
                    <div className="text-danger" variant="danger" size="sm">
                      {" "}
                      {errors}{" "}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {show ? (
                  <Table
                    data={productResult.products}
                    totalItem={productResult.total_items}
                    setCurrentPageNumber={setCurrentPageNumber}
                    currentItems={currentItems}
                    pageNumbers={pageNumbers}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Inventory;
