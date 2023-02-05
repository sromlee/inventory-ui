import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import AuthService from "../../AuthService";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function InventorySearchForm(props) {
  const SEARCH_URL = "/api/v1/search";
  const role = AuthService.getCurrentRole(
    AuthService.getCurrentUser().access_token
  );
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownTitle, setDropdownTitle] = useState("");

  const handleSelect = (e) => {
    console.log(e);
    props.setCustomer(e);
    setDropdownTitle(e);
  };

  useEffect(() => {
    console.log("SearchTerm: " + searchTerm);
    if (searchTerm.length < 3) {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      console.log("Start to Searh " + searchTerm);
      // Send Axios request here
      axios
        .get(
          SEARCH_URL,
          {
            params: {
              barcode: searchTerm,
              product_name: searchTerm,
              product_id: searchTerm,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          props.setProductResult(res.data);
          if (res.data.products.length === 0) {
            console.log(res.data.products.length)
            props.setShow(false);
          } else {
            props.setShow(true);
          }
        })
        .catch(
          (err) => props.setError("err")

          // console.log("(InventorySearchForm : Get product name list :)" + err)
        );
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
              <Form.Label> ค้นหา </Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                autoComplete="off"
                aria-expanded="false"
                size="sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
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
