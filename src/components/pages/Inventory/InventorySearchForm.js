import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthService from "../../authService";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import AutoComplete from "./AutoComplete";

function InventorySearchForm() {
  const token_header = "Bearer " + AuthService.getCurrentUser().access_token;
  const PRODUCTID_LIST_URL = "api/search/pre-search/product_Id";
  const PRODUCTNAME_LIST_URL = "api/search/pre-search/product_name";
  const BARCODE_LIST_URL = "api/search/pre-search/barcode";

  const headers = {
    Authorization: token_header,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };
  const [productList, setproductList] = useState([]);
  const [productNameList, setproductNameList] = useState([]);
  const [productBarcodeList, setproductBarcodeList] = useState([]);
  
  // Get Product ID list
  useEffect(() => {
    axios
      .get(PRODUCTID_LIST_URL, {
        headers,
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
        headers,
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
        headers,
        withCredentials: true,
      })
      .then((res) => setproductBarcodeList(res.data))
      .catch((err) =>
        console.log("(InventorySearchForm : Get barcode list :)" + err)
      );
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <Form className="rounded p-4 p-sm-3" aria-expanded="false">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>รหัสสินค้า</Form.Label>
                <AutoComplete data={productList.fetch_items} />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="productId">
                <Form.Label>บาร์โค้ด</Form.Label>
                <AutoComplete data={productBarcodeList.fetch_items} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="productId">
                <Form.Label>ชื่อสินค้า</Form.Label>
                <AutoComplete data={productNameList.fetch_items} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>กลุ่มลูกค้า</Form.Label>
              <Form.Select
                name="customerGroup"
                className="mb-3"
                aria-label="Default select example"
              >
                <option>เลือกกลุ่มลูกค้า</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col>
              <br />
            </Col>
          </Row>
          <Button variant="outline-primary" type="submit">
            ค้นหา
          </Button>
        </Form>
        {/* <div> {getProductList()}</div> */}
      </div>
    </div>
  );
}

export default InventorySearchForm;
