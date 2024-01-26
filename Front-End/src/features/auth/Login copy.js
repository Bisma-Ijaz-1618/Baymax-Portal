import { useRef, useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuthHook";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //validate pwd
const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/;
const Login = () => {
  const { auth, persist, setPersist, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const emailRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  //hooks
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    //setValidUsername);
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    //user is adjusting so no error message
    setErrMsg("");
  }, [password, email]);
  const togglePersist = () => {
    setPersist((prev) => !prev);
    console.log("toggle", persist);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
    console.log("changing persist::", persist);
  }, [persist]);

  const handleLogin = async (event) => {
    //in case of invalid info
    event.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      const cookies = response.headers["cookie"];
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const username = response?.data.username;
      setAuth({ username, email, password, roles, accessToken });
      console.log(username);
      setEmail("");
      setPassword("");
      if (roles.includes(5150)) {
        navigate("/auth/admin", { replace: true });
      } else if (roles.includes(2003)) {
        navigate("/auth/doctor", { replace: true });
      } else if (roles.includes(2002)) {
        navigate("/auth/patient", { replace: true });
      } else if (roles.includes(2004)) {
        navigate("/auth/hospital", { replace: true });
      } else {
        navigate("/auth/user", { replace: true });
      }
      //clear Form.Control fields out of the registeration form.
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Server Error");
        console.log("error:", error);
      } else if (error.response?.status === 409) {
        setErrMsg("Email already exists");
      } else if (error.response?.status === 401) {
        setErrMsg("Email or password you provided is incorrect!");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <Container
        fluid
        className="auth-container d-flex justify-content-center align-items-center"
      >
        <Row className=" col-md-8 auth-row justify-content-center">
          <Col className=" py-5 auth-col-left col-md-4 text-left">
            <Row className="px-4 justify-content-center align-items-center">
              <h1 className="">BAYMAX</h1>
              <h3 className="py-4">Welcome To Our Platform</h3>
              <h6>
                {" "}
                Baymax is a remote medical monitoring system offering a holistic
                solution to the evolving needs of virtual healthcare. Begin your
                journey with an end-to-end platform, integrated effortlessly
                with the Baymax Kit.
              </h6>
            </Row>
            <Row className="px-4 py-4">
              <h6 className="underline">Don't have an account?</h6>
              <Button
                onClick={(e) => navigate("/register", { replace: false })}
                className="mx-2 water-bg"
              >
                Register Now!
              </Button>
            </Row>
          </Col>
          <Col className="py-5 px-5 col-md-8">
            <Row className="text-center">
              <h1 className="water-color">Log In</h1>
            </Row>
            <Form className="" onSubmit={handleLogin}>
              <Row>
                <Form.Group>
                  <Form.Text
                    ref={errRef}
                    className={errMsg ? "errMsg" : "hide"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="email" className="water-color">
                    {" "}
                    Email:
                  </Form.Label>

                  <Form.Control
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off" //no suggestions
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                  <Form.Text
                    id="email"
                    className={email && !validEmail ? "instructions" : "hide"}
                  >
                    Email not valid!
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="passowrd" className="water-color">
                    Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="passowrd"
                    ref={passwordRef}
                    autoComplete="off" //no suggestions
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
                <Form.Group className="py-3">
                  <Form.Check
                    id="persist"
                    onChange={togglePersist}
                    checked={persist}
                    label="Trust this device"
                    className="water-color"
                  />
                </Form.Group>
              </Row>
              <Row className="mx-5 px-5 py-2">
                <Button
                  type="submit"
                  className="water-bg"
                  disabled={!validPassword || !validEmail ? true : false}
                >
                  Log in
                </Button>
              </Row>
            </Form>
            <Row className=" py-2 justify-content-center align-items-center">
              <hr className="my-2 mx-2 text-dark w-25" />
              Sign In with your Google acocunt
              <hr className="my-2 mx-2 text-dark w-25" />
            </Row>
            <Row className="mx-5 px-5 py-2">
              <Button className="white-bg water-color">Google</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
