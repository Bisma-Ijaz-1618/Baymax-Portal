import { useRef, useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuthHook";
import flag from "../../img/pakistan.png";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //validate pwd
const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/;
const Login = () => {
  const HOSPITAL_LIST = [
    "Hospital 1",
    "Hospital 2",
    "Hospital 3",
    "Hospital 4",
  ];
  const CITY_LIST = ["City 1", "City 2", "City 3", "City 4"];
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
  const [contactNumber, setContactNumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [hospital, setHospital] = useState("");
  const [address, setAddress] = useState({
    address: "",
    city: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleRegisteration = async (event) => {
    event.preventDefault();
    if (!PWD_REGEX.test(password) || !EMAIL_REGEX.test(email)) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      console.log(
        JSON.stringify({
          email,
          password,
          address,
          contactNumber,
          regNumber,
          hospital,
        })
      );
      const response = await axios.post(
        "/auth/register",
        JSON.stringify({
          email,
          password,
          address,
          contactNumber,
          regNumber,
          hospital,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(response));
      console.log(response.data);
      //clear input fields out of the registeration form.
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
        console.log("error:", error);
      } else if (error.response?.status === 409) {
        setErrMsg("Email already exists");
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
        <Row className=" col-md-11 auth-row justify-content-center">
          <Col className=" py-5 auth-col-left col-md-3 text-left">
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
                Log In
              </Button>
            </Row>
          </Col>
          <Col className="py-5 px-5 col-md-9">
            <Row className="text-center">
              <h1 className="water-color">Hospital Registeration</h1>
            </Row>
            <Form className="" onSubmit={handleRegisteration}>
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
                <Col className="col-md-6">
                  <Form.Group>
                    <Form.Label htmlFor="email" className="water-color">
                      {" "}
                      Email
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
                      placeholder="Email"
                    />
                    <Form.Text
                      id="email"
                      className={email && !validEmail ? "instructions" : "hide"}
                    >
                      Email not valid!
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="contactNumber" className="water-color">
                      Contact Number
                    </Form.Label>
                    <div className="d-flex align-items-center">
                      <Image
                        src={flag}
                        alt="Pakistan Flag"
                        className="mr-2 "
                        style={{ height: "35px", width: "auto" }}
                      />{" "}
                      +92
                      <Form.Control
                        type="tel"
                        id="contactNumber"
                        onChange={(e) => setContactNumber(e.target.value)}
                        value={contactNumber}
                        placeholder="Contact Number"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="passowrd" className="water-color">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      id="passowrd"
                      ref={passwordRef}
                      autoComplete="off" //no suggestions
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="passowrd" className="water-color">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      id="passowrd"
                      ref={passwordRef}
                      autoComplete="off" //no suggestions
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-md-6">
                  <Form.Group>
                    <Form.Group controlId="address">
                      <Form.Label className="water-color">Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={address.address}
                        onChange={handleAddressChange}
                      />
                    </Form.Group>
                    <Form.Label htmlFor="cities" className="water-color">
                      City
                    </Form.Label>
                    <Form.Control
                      as="select"
                      id="cities"
                      name="city"
                      value={address.city}
                      required
                      onChange={handleAddressChange}
                    >
                      <option value="">Select an option</option>
                      <option value="City 1">City 1</option>
                      <option value="City 2">City 2</option>
                      <option value="City 3">City 3</option>
                      <option value="City 4">City 4</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="hospital" className="water-color">
                      Hospital
                    </Form.Label>
                    <Form.Control
                      as="select"
                      id="hospital"
                      value={hospital}
                      required
                      onChange={(e) => setHospital(e.target.value)}
                    >
                      <option value=" ">Select an option</option>
                      <option value="Hospital 1">Hospital 1</option>
                      <option value="Hospital 2">Hospital 2</option>
                      <option value="Hospital 3">Hospital 3</option>
                      <option value="Hospital 4">Hospital 4</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="RegNo">
                    <Form.Label className="water-color">
                      Hospital Registeration Number {"(PHC)"}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Registeration Number"
                      name="regno"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mx-5 px-5 py-3">
                <Button
                  type="submit"
                  className="water-bg"
                  disabled={
                    !validPassword ||
                    !validEmail ||
                    !regNumber ||
                    !contactNumber ||
                    !address.address ||
                    !address.city ||
                    hospital == " "
                      ? true
                      : false
                  }
                >
                  Register
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
