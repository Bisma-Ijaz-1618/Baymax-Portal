import { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuthHook";
import flag from "../../img/pakistan.png";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //validate pwd
const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/;
const CONTACT_REGEX = /^[0-9]{11}$/;

const Login = () => {
  const BLOOD_GROUP = [
    "A-",
    "A+",
    "B-",
    "B+",
    "O-",
    "O+",
    "AB-",
    "AB+",
    "Not Sure",
  ];
  const CITY_LIST = ["City 1", "City 2", "City 3", "City 4"];
  const navigate = useNavigate();

  const errRef = useRef();

  //form data
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validCPassword, setValidCPassword] = useState(false);
  const [cnicNumber, setCnicNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [validContactNumber, setValidContactNumber] = useState(false);
  const [eContactNumber, setEContactNumber] = useState("");
  const [validEContactNumber, setValidEContactNumber] = useState(false);
  const [DOB, setDOB] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
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

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
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
    setValidEContactNumber(CONTACT_REGEX.test(eContactNumber));
  }, [eContactNumber]);

  useEffect(() => {
    //user is adjusting so no error message
    setErrMsg("");
  }, [
    email,
    password,
    confirmPassword,
    address,
    contactNumber,
    age,
    gender,
    cnicNumber,
    eContactNumber,
    bloodGroup,
    DOB,
  ]);

  const handleRegisteration = async (event) => {
    //in case of invalid info
    event.preventDefault();
    try {
      const roles = { User: 2001, Patient: 2002 };
      const username = firstname + " " + lastname;

      const response = await axios.post(
        "/auth/register/patient",
        JSON.stringify({
          email,
          username,
          password,
          address,
          contactNumber,
          age,
          gender,
          cnicNumber,
          eContactNumber,
          bloodGroup,
          DOB,
          roles,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
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
        <Row className="text-center m-auto">
          <h1 className="success-color">
            Registeration Successfull!
            <br /> You can now Log In!
          </h1>
        </Row>
      ) : (
        <>
          <Row className="text-center">
            <h1 className="water-color">Patient Registeration</h1>
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
                <Row>
                  <Col className="col-md-6">
                    <Form.Group controlId="firstName">
                      <Form.Label className="water-color">
                        First Name
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="Enter first name"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="col-md-6">
                    <Form.Group controlId="lastName">
                      <Form.Label className="water-color">Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Enter last name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-md-6">
                    <Form.Group controlId="age">
                      <Form.Label className="water-color">Age</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="gender">
                      <Form.Label className="water-color">Gender</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label htmlFor="DOB" className="water-color">
                    Date Of Birth
                  </Form.Label>

                  <Form.Control
                    type="date"
                    id="dob"
                    name="DOB"
                    onChange={(e) => setDOB(e.target.value)}
                    value={DOB}
                    placeholder="Date Of Birth"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="email" className="water-color">
                    {" "}
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    placeholder="Enter Email"
                  />
                  <Form.Text
                    className={email && !validEmail ? "instructions" : "hide"}
                  >
                    Email not valid!
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
                  <Form.Label htmlFor="eContactNumber" className="water-color">
                    Emergency Contact Number
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
                      onChange={(e) => setEContactNumber(e.target.value)}
                      value={eContactNumber}
                      placeholder="Emergency Contact Number"
                      required
                    />
                  </div>
                  <Form.Text
                    className={
                      eContactNumber && !validEContactNumber
                        ? "instructions"
                        : "hide"
                    }
                  >
                    Number not valid!
                  </Form.Text>
                </Form.Group>
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
                    <option value="">Select a city</option>
                    {CITY_LIST.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="bloodGroup" className="water-color">
                    Blood Group
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="bloodGroup"
                    value={Object.keys(bloodGroup)[0] || ""}
                    required
                    onChange={(e) => {
                      const selectedBloodGroupKey = e.target.value;
                      setBloodGroup(BLOOD_GROUP[selectedBloodGroupKey]);
                    }}
                  >
                    <option value="">Select a blood group</option>
                    {Object.keys(BLOOD_GROUP).map((bloodGroupKey) => (
                      <option key={bloodGroupKey} value={bloodGroupKey}>
                        {BLOOD_GROUP[bloodGroupKey]}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId=" cnicNo">
                  <Form.Label className="water-color">CNIC</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter CNIC Number"
                    name="cnicno"
                    value={cnicNumber}
                    onChange={(e) => setCnicNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-5 px-5 py-3">
              <Form.Group controlId="termsCheckbox">
                <Form.Check
                  className="water-color py-2"
                  required
                  type="checkbox"
                  label="I agree to the terms and conditions"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                className="water-bg"
                disabled={
                  !validPassword ||
                  !validEmail ||
                  !validCPassword ||
                  !address ||
                  !validContactNumber ||
                  !validEContactNumber ||
                  !cnicNumber ||
                  !bloodGroup ||
                  !DOB ||
                  !gender ||
                  !age ||
                  !agreeTerms
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
