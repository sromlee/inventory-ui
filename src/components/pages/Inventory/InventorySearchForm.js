import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import AutoComplete from "./AutoComplete";
import AuthService from "../../AuthService";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function InventorySearchForm(props) {
  const role = AuthService.getCurrentRole(
    AuthService.getCurrentUser().access_token
  );

  const PRODUCTID_LIST_URL = "api/search/pre-search/product_Id";
  const PRODUCTNAME_LIST_URL = "api/search/pre-search/product_name";
  const BARCODE_LIST_URL = "api/search/pre-search/barcode";
  const [dropdownTitle, setDropdownTitle] = useState("");

  // Variable for pre-search feild
  const [productList, setproductList] = useState([]);
  const [productNameList, setproductNameList] = useState([]);
  const [productBarcodeList, setproductBarcodeList] = useState([]);

  const handleSelect = (e) => {
    console.log(e);
    props.setCustomer(e);
    setDropdownTitle(e);
  };

  const handleOnClick = (e) => {
    props.setButtonClicked(e.target.id);
  };

  // Get Product ID list
  useEffect(() => {
    axios
      .get(PRODUCTID_LIST_URL, {
        withCredentials: true,
      })
      .then((res) => setproductList(res.data))
      .catch((err) =>
        console.log("(InventorySearchForm : Get product id list :)" + err)
      );
  }, []);

  // Get Product Name list
  useEffect(() => {
    axios
      .get(PRODUCTNAME_LIST_URL, {
        withCredentials: true,
      })
      .then((res) => setproductNameList(res.data))
      .catch((err) =>
        console.log("(InventorySearchForm : Get product name list :)" + err)
      );
  }, []);

  // Get Barcode list
  useEffect(() => {
    axios
      .get(BARCODE_LIST_URL, {
        withCredentials: true,
      })
      .then((res) => setproductBarcodeList(res.data))
      .catch((err) =>
        console.log("(InventorySearchForm : Get barcode list :)" + err)
      );
  }, []);

  return (
    <div>
      <Form
        className="rounded p-4 p-sm-3"
        aria-expanded="false"
        onSubmit={props.submitHandler}
      >
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="productId">
              <Form.Label>รหัสสินค้า</Form.Label>
              <AutoComplete
                data={productList.fetch_items}
                name="productId"
                setProductID={props.setProductID}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <div style={{ display: "flex" }}>
            <Button
              id="productId"
              className="btn btn-dark btn-sm"
              type="submit"
              style={{ marginLeft: "auto" }}
              onClick={handleOnClick}
            >
              ค้นหา
            </Button>
          </div>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="barcode">
              <Form.Label>บาร์โค้ด</Form.Label>
              <AutoComplete
                data={productBarcodeList.fetch_items}
                name="barcode"
                setBarcode={props.setBarcode}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col>
            <div style={{ display: "flex" }}>
              <Button
                id="barcode"
                className="btn btn-dark btn-sm"
                type="submit"
                style={{ marginLeft: "auto" }}
                onClick={handleOnClick}
              >
                ค้นหา
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="productName">
              <Form.Label>ชื่อสินค้า</Form.Label>
              <AutoComplete
                data={productNameList.fetch_items}
                name="productName"
                setProductName={props.setProductName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex" }}>
              <Button
                id="productName"
                style={{ marginLeft: "auto" }}
                type="submit"
                className="btn btn-dark btn-sm"
                onClick={handleOnClick}
              >
                ค้นหา
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          {role === "admin" && (
            <Col>
              <Form.Group required>
                <DropdownButton
                  alignRight
                  title={dropdownTitle ? dropdownTitle : "กลุ่มลูกค้า"}
                  id="dropdown-menu-align-right"
                  size="sm"
                  onSelect={handleSelect}
                  required
                >
                  <Dropdown.Item eventKey="BigC">Big C</Dropdown.Item>
                  <Dropdown.Item eventKey="Lotus">Lotus</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Col>
          )}
        </Row>
      </Form>

      {/* <div> {getProductList()}</div> */}
    </div>
  );
}

export default InventorySearchForm;
