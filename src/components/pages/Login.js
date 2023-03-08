import { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../context/AuthProvider";

const LOGIN_URL = "/api/v1/login";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("username", username);
    data.append("password", password);

    try {
      const response = await axios.post(LOGIN_URL, data, {
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });

      setAuth(true);

      if (response.data.access_token) {
        console.log("Local storeage " + response.data.access_token);
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log("No server response"+err);
      } else if (err.response.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response.status === 401) {
        setErrMsg("Incorrect Username and Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="section d-flex flex-column min-vh-100">
      <div className="card text-center">
        <div className="card-body">
          <div className="container card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
            <div className="text-center">
              <h1> เข้าสู่ระบบ </h1>
            </div>
            <div className="color-overley d-flex justify-content-center align-item-center">
              <Form className="rounded p-4 p-sm-3" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label> Username </Form.Label>
                  <Form.Control
                    name="username"
                    type="username"
                    ref={userRef}
                    placeholder="Enter Username"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label> Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
                <div>
                  <br></br>
                </div>
                <div
                  ref={errRef}
                  className={errMsg ? "alert alert-danger p-1" : "offscreen"}
                  role="alert"
                  aria-live="assertive"
                >
                  {errMsg}
                </div>

                <hr />

                <span className="line">
                  <Link to="/"> Sign Up</Link>
                </span>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
