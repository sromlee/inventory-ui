import React , { useState } from "react";
import { Form, Button } from "react-bootstrap";



const Login = () => {
  
  const [values, setValues] = useState({});

  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(name, value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    event.persist();

  };

  return (
    <div className="color-overley d-flex justify-content-center align-item-center">
      
      <Form className="rounded p-4 p-sm-3"  onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label> Username</Form.Label>
          <Form.Control  name = "username" type="username" placeholder="Enter Username" onChange={onFormChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onFormChange}>
          <Form.Label> Password</Form.Label>
          <Form.Control  name = "password"  type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox" onChange={onFormChange}>
          <Form.Check  name = "remember"  type="checkbox" label="Remember Me"></Form.Check>
        </Form.Group>
        <Button variant="primary" type="submit">
            Login
        </Button>
      </Form>
    </div>
  );
}
export default Login;
