import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../../api/axios";
import { useState, useEffect , useRef} from "react";
import AuthService from "../../AuthService";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function InventorySearchForm(props) {
  const SEARCH_URL = "/api/v1/search";
  const role = AuthService.getCurrentRole(
    AuthService.getCurrentUser().access_token
  );

  const [customer, setCustomer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownTitle, setDropdownTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    console.log(e);
    setCustomer(e);
    setDropdownTitle(e);
  };

  useEffect(() => {
    props.setError("");
    console.log("SearchTerm: " + searchTerm);
    if (searchTerm.length < 3) {
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
              limit: 1000,
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
      <Form
        className="col-sm-5 col-md-6"
        aria-expanded="false"
        onSubmit={submitHandler}
      >
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
                  <Dropdown.Item eventKey="B2S">B2S</Dropdown.Item>
                  <Dropdown.Item eventKey="OFM">OFM</Dropdown.Item>
                  <Dropdown.Item eventKey="BigC">BigC</Dropdown.Item>
                  <Dropdown.Item eventKey="The Mall">The Mall</Dropdown.Item>
                  <Dropdown.Item eventKey="Amarin">Amarin</Dropdown.Item>
                  <Dropdown.Item eventKey="Se-ed">Se-ed</Dropdown.Item>
                  <Dropdown.Item eventKey="Asia Book, Watsons">
                    Asia Book, Watsons
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="CJ">CJ</Dropdown.Item>
                  <Dropdown.Item eventKey="store_price">
                    Store Price
                  </Dropdown.Item>
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
