import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BasicExample() {
  return (
    <div className="card">
      <div className="card-body">
        <Form className="rounded p-4 p-sm-3">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>รหัสสินค้า</Form.Label>
                <Form.Control
                  name="productId"
                  type="text"
                  placeholder="รหัสสินค้า"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="barcode">
                <Form.Label>บาร์โค๊ด</Form.Label>
                <Form.Control name="barcode" type="int" placeholder="บาร์โค๊ด" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>ชื่อสินค้า</Form.Label>
                <Form.Control name="productName" type="text" placeholder="ชื่อสินค้า" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>กลุ่มลูกค้า</Form.Label>
              <Form.Select name="customerGroup" className="mb-3" aria-label="Default select example">
                <option>เลือกกลุ่มลูกค้า</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
         <Col>
         <br/>

          </Col>
          </Row>
          <Button  variant="outline-primary" type="submit" >
            ค้นหา
          </Button>
          
        </Form>
      </div>
    </div>
  );
}

export default BasicExample;
