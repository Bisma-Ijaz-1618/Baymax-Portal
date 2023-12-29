import { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import flag from "../../img/pakistan.png";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //validate pwd
const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/;
const CONTACT_REGEX = /^[0-9]{11}$/;

const Login = () => {
  const CITY_LIST = ["City 1", "City 2", "City 3", "City 4"];
  const navigate = useNavigate();

  const errRef = useRef();

  //form data
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validCPassword, setValidCPassword] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [validContactNumber, setValidContactNumber] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState({
    address: "",
    city: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  useEffect(() => {
    //setValidUsername);
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidCPassword(password == confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setValidContactNumber(CONTACT_REGEX.test(contactNumber));
  }, [contactNumber]);

  useEffect(() => {
    //user is adjusting so no error message
    setErrMsg("");
  }, [password, email, confirmPassword]);

  const handleRegisteration = async (event) => {
    event.preventDefault();
    try {
      const roles = { User: 2001, Hospital: 2004 };
      const username = hospitalName;
      const response = await axios.post(
        "/auth/register/hospital",
        JSON.stringify({
          email,
          username,
          password,
          roles,
          contactNumber,
          regNumber,
          address,
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
      {success ? (
        <>
          <Row className="text-center m-auto">
            <h1 className="success-color">
              Registeration Successfull!
              <br /> You can now Log In!
            </h1>
          </Row>
        </>
      ) : (
        <>
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
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
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
                    />
                    <Form.Control
                      type="tel"
                      id="contactNumber"
                      onChange={(e) => setContactNumber(e.target.value)}
                      value={contactNumber}
                      placeholder="Contact Number"
                      required
                    />
                  </div>
                  <Form.Text
                    id="contactNumber"
                    className={
                      contactNumber && !validContactNumber
                        ? "instructions"
                        : "hide"
                    }
                  >
                    Number not valid!
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="passowrd" className="water-color">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="passowrd"
                    autoComplete="off" //no suggestions
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="Password"
                  />
                  <Form.Text
                    id="passowrd"
                    className={
                      password && !validPassword ? "instructions" : "hide"
                    }
                  >
                    Must be 8 to 24 characters in length.Must have one
                    uppercase, one lowercase letter, and one digit. Must have
                    one special character (!, @, #, $, or %).!
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="cpassowrd" className="water-color">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="cpassowrd"
                    autoComplete="off" //no suggestions
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    placeholder="Confirm Password"
                  />
                  <Form.Text
                    id="passowrd"
                    className={
                      confirmPassword && !validCPassword
                        ? "instructions"
                        : "hide"
                    }
                  >
                    Password doesn't match!
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col className="col-md-6">
                <Form.Group controlId="address">
                  <Form.Label className="water-color">Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={address.address}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
                <Form.Group>
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
                <Form.Group controlId="hospital">
                  <Form.Label className="water-color">
                    Hospital/Clinic Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Hospital/Clinic Name"
                    name="hospitalName"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
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
                  !validCPassword ||
                  !validEmail ||
                  !regNumber ||
                  !validContactNumber ||
                  !address.address ||
                  !address.city ||
                  !hospitalName
                    ? true
                    : false
                }
              >
                Register
              </Button>
            </Row>
          </Form>
        </>
      )}
    </>
  );
};

export default Login;
