import React, { useState } from "react";
import Select from "react-select";
import Pagination from "react-bootstrap/Pagination";
import ImageModal from "./ImageModal";
import { Button } from "react-bootstrap";
import "./table.css";

const columnLabels = {
  accrued_out_qty: "ยอดค้างส่ง",
  balance_qty_net: "ยอดคงเหลือ (สุทธิ)",
  barcode: "บาร์โค้ด",
  book_out_qty: "ยอดค้างจอง",
  code: "รหัส",
  discount: "ส่วนลด",
  image: "รูป",
  name: "ชื่อสินค้า",
  price: "ราคา",
  properties: "รายละเอียด",
  total_price: "ราคาสุทธิ",
  unit_standard: "หน่วยนับยอดคงเหลือ",
  images: "รูป",
};

export default function Table(props) {
  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "code",
    "barcode",
    "balance_qty_net",
    "price",
  ]);
  const [ellipsis, setEllipsis] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [selectionColumnVisible, setSelectionColumnVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStates, setModalStates] = useState(
    props.currentItems.map(() => false)
  );

  console.log("Sorted column " + sortColumn);

  const data = props.currentItems.sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn])
      return props.sortOrder === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn])
      return props.sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleEllipsis = () => {
    setEllipsis(!ellipsis);
  };

  const allColumns = Object.keys(data[0]).map((column) => ({
    label: columnLabels[column] || column,
    value: column,
  }));

  const handleSelectedColumns = (selected) => {
    setSelectedColumns(selected.map((item) => item.value));
  };

  const handleSortOrder = (column) => {
    setSortColumn(column);
    // props.setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    props.setSortOrder(props.sortOrder === "asc" ? "desc" : "asc");
  };

  const getColumnLabel = (column) => columnLabels[column] || column;

  const paginate = (pageNumber) => {
    props.setCurrentPageNumber(pageNumber, props.sortOrder);
    setEllipsis(pageNumber > 3 && pageNumber < props.pageNumbers.length - 2);
  };

  const toggleSelectionColumn = () => {
    setSelectionColumnVisible(!selectionColumnVisible);
  };

  return (
    <div>
      <div className="col-sm-5 col-md-6">
        <br />
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={toggleSelectionColumn}
        >
          เลือก field{" "}
        </button>
        {selectionColumnVisible && (
          <Select
            lassName="small-select"
            options={allColumns}
            isMulti
            value={selectedColumns.map((column) => ({
              label: getColumnLabel(column),
              value: column,
            }))}
            onChange={handleSelectedColumns}
          />
        )}
      </div>
      <div>
        <hr />
        <div className="table table-striped table-responsive-sm">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                {selectedColumns.map((column, index) => (
                  <th
                    key={index}
                    onClick={() => handleSortOrder(column)}
                    style={{ cursor: "pointer", textAlign: "center" }}
                  >
                    {getColumnLabel(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.currentItems.map((item, index) => (
                <tr key={index}>
                  {selectedColumns.map((column, i) => (
                    <td
                      key={i}
                      style={{
                        color: item["item_type"] === 3 ? "blue" : "black",
                      }}
                    >
                      {" "}
                      {column === "name" ? (
                        <div>
                          <a
                            style={{
                              color: "blue",
                              textDecorationLine: "underline",
                            }}
                            onClick={() => {
                              const newModalStates = [...modalStates];
                              newModalStates[index] = true;
                              setModalStates(newModalStates);
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item[column]}
                          </a>
                          {modalStates[index] && (
                            <ImageModal
                              isModalOpen={modalStates[index]}
                              setIsModalOpen={(value) => {
                                const newModalStates = [...modalStates];
                                newModalStates[index] = value;
                                setModalStates(newModalStates);
                              }}
                              imageUri={
                                "http://27.254.66.181:8080/SMLJavaRESTService/v3/api/product/image/v2/" +
                                item["images"] +
                                "?p=DATA&d=data1"
                              }
                            />
                          )}
                        </div>
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="container">
            <Pagination
              size="sm"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {props.pageNumbers.map((number, index) => {
                if (
                  index === 0 ||
                  index === props.pageNumbers.length - 1 ||
                  (index >= props.currentPage - 2 &&
                    index <= props.currentPage + 2) ||
                  (index >= props.pageNumbers.length - 5 &&
                    index <= props.pageNumbers.length - 2) ||
                  (index === 1 && ellipsis) ||
                  (index === props.pageNumbers.length - 2 && ellipsis)
                ) {
                  return (
                    <Pagination.Item
                      key={number}
                      active={number === props.currentPage}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Pagination.Item>
                  );
                } else if (
                  (index === 2 && !ellipsis) ||
                  (index === props.pageNumbers.length - 3 && ellipsis)
                ) {
                  return (
                    <Pagination.Ellipsis
                      key={number}
                      onClick={toggleEllipsis}
                    />
                  );
                }
              })}
            </Pagination>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
