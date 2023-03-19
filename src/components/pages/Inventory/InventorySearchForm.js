import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../../api/axios";
import { useState, useEffect, useRef } from "react";
import AuthService from "../../AuthService";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function InventorySearchForm(props) {
  const SEARCH_URL = "/api/v1/search";
  const SEARCH_CUSTOMER = "/api/v1/search/customer_names";
  const role = AuthService.getCurrentRole(
    AuthService.getCurrentUser().access_token
  );

  console.log("Role: " + role);

  const [customer, setCustomer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownTitle, setDropdownTitle] = useState("เลือกลูกค้า");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const [data, setData] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    setCustomer(e);
    setDropdownTitle(e);
  };

  useEffect(() => {
    axios
      .get(SEARCH_CUSTOMER, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data.customer_names;
        if (role === "admin") {
          data.push("store_price");
        }
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    props.setError("");
    console.log("SearchTerm: " + searchTerm);
    if (searchTerm.length <= 3) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const delayDebounceFn = setTimeout(() => {
      console.log("Start to Searh " + searchTerm);

      props.setError("");
      if (
        role === "user" ||
        role === "sale_store" ||
        role === "sale_admin_store"
      ) {
        setCustomer("store_price");
      }

      if (customer != "") {
        console.log(customer);
        // Send Axios request here
        props.setCurrentPageNumber(1);
        setLoading(true);
        axios
          .get(SEARCH_URL, {
            params: {
              search_term: searchTerm,
              limit: 10,
              customer_name: customer,
            },
            signal: abortController.signal,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
            withCredentials: true,
          })
          .then((res) => {
            props.setProductResult(res.data);
            if (res.data.products.length === 0) {
              console.log(res.data.products.length);
              props.setShow(false);
              props.setError("ไม่พบสินค้า");
            } else {
              props.setShow(true);
            }
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("Request was aborted");
            } else if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              props.setError("Error: " + err.response.data.message);
            } else if (err.request) {
              // The request was made but no response was received
              props.setError("No response from server");
            } else {
              // Something happened in setting up the request that triggered an Error
              props.setError("Error: " + err.message);
            }
            props.setShow(false);
          })
          .finally(() => setLoading(false));
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, customer]);

  return (
    <div>
      <Form className="" aria-expanded="false" onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group
              className="mb-2"
              controlId="productId"
              onSubmit={submitHandler}
            >
              <p> ค้นหา </p>
              <Form.Control
                type="text"
                value={searchTerm}
                autoComplete="off"
                aria-expanded="false"
                size="sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            {loading && (
              <div>
                <div className="d-flex align-items-center">
                  <strong>Loading... </strong>
                  <div
                    className="spinner-border spinner-custom"
                    role="status"
                    size="sm"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          {(role === "admin" ||
            role === "sale_admin_shopping_mall" ||
            role === "sale_shopping_mall") && (
            <Col>
              <Form.Group required>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={dropdownTitle}
                  size="sm"
                  onSelect={handleSelect}
                  required
                >
                  {data.map((item, index) => (
                    <Dropdown.Item key={item} eventKey={item}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Form.Group>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
}

export default InventorySearchForm;
