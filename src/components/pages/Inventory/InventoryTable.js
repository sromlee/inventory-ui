import React, { useState } from "react";
import Select from "react-select";
import "./table.css";

export default function Table(props) {
  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "code",
    "barcode",
    "balance_qty",
    "price",
  ]);
  const [sortColumn, setSortColumn] = useState(null);

  const data = props.data.sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  const allColumns = Object.keys(data[0]).map((column) => ({
    label: column,
    value: column,
  }));

  const handleSelectedColumns = (selected) => {
    setSelectedColumns(selected.map((item) => item.value));
  };

  return (
    <div>
      <div>
        <hr />
        <div className="table table-striped table-responsive-sm">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                {selectedColumns.map((column, index) => (
                  <th
                    key={index}
                    onClick={() => setSortColumn(column)}
                    style={{ cursor: "pointer", textAlign: "center" }}
                  >
                    {column === "accrued_out_qty"
                      ? "ยอดค้างส่ง"
                      : column === "balance_qty"
                      ? "ยอดคงเหลือ (สุทธิ)"
                      : column === "barcode"
                      ? "บาร์โค้ด"
                      : column === "book_out_qty"
                      ? "ยอดค้างจอง"
                      : column === "code"
                      ? "รหัส"
                      : column === "discount"
                      ? "รหัส"
                      : column === "image"
                      ? "รูป"
                      : column === "name"
                      ? "ชื่อสินค้า"
                      : column === "price"
                      ? "ราคา"
                      : column === "properties"
                      ? "รายละเอียด"
                      : column === "total_price"
                      ? "ราคาสุทธิ"
                      : column === "unit_standard"
                      ? "หน่วยนับยอดคงเหลือ"
                      : column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {selectedColumns.map((column, i) => (
                    <td
                      key={i}
                      style={{
                        color: item["item_type"] === 3 ? "blue" : "black",
                      }}
                    >
                      {column === "รูป" ? (
                        <img src={item[column]} alt="product image" />
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
      </div>
      <div className="mb-3">
        <Select
          lassName="small-select"
          options={allColumns}
          isMulti
          value={selectedColumns.map((column) => ({
            label: column,
            value: column,
          }))}
          onChange={handleSelectedColumns}
        />
      </div>
    </div>
  );
}
