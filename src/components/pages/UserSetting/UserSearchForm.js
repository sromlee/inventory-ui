import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function UserSearchForm() {
  return (
    <div className="card">
      <div className="card-body">
        <Form className="rounded p-4 p-sm-3">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="userId">
                <Form.Label>รหัสผู้ใช้งาน</Form.Label>
                <Form.Control
                  name="userId"
                  type="text"
                  placeholder="รหัสผู้ใช้งาน"
                />
              </Form.Group>
            </Col>
            <Col>
            <br/>

            </Col>
          </Row>
          <Button variant="outline-primary" type="submit">
                ค้นหา
              </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserSearchForm;
