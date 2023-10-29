import { useRef, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import ROLES_LIST from "../../Config/userRoles";
const USER_REGEX = /^[A-Za-z0-9]{3,23}$/; //validate the username with
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //validate pwd
const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/;

const Register = () => {
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const matchPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const rolesRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [roles, setRoles] = useState({});

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //hooks
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    //setValidUsername);
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    //user is adjusting so no error message
    setErrMsg("");
  }, [email, username, password, matchPassword, lastname, firstname, roles]);

  const handleSignUp = async (event) => {
    //in case of invalid info
    event.preventDefault();
    if (
      !USER_REGEX.test(username) ||
      !PWD_REGEX.test(password) ||
      !EMAIL_REGEX.test(email)
    ) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "/auth/register",
        JSON.stringify({
          username,
          email,
          firstname,
          lastname,
          password,
          roles,
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
        setErrMsg("Email or Username already exists");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section className="success">
          <h1 className="auto">Registeration successfull!</h1>
          <Link to="/auth/login" className="auto">
            <u>
              <h1>SignIn</h1>
            </u>
          </Link>
        </section>
      ) : (
        <section className="authSection">
          <h1 className="auto">Registration Form</h1>
          <br />
          <form className="authForm" onSubmit={handleSignUp}>
            <p
              ref={errRef}
              className={errMsg ? "errMsg" : "hide"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off" //no suggestions
              onChange={(e) => setUser(e.target.value)}
              value={username}
              required
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && username && !validUsername
                  ? "instructions"
                  : "hide"
              }
            >
              4 to 24 characters.
              <br />
              First character should be a letter.
              <br />
              Only letters and numbers are allowed.
            </p>

            <label htmlFor="email">Email:</label>
            <input
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
            <p
              id="email"
              className={
                emailFocus && email && !validEmail ? "instructions" : "hide"
              }
            >
              Email not valid! <br />
            </p>

            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              ref={firstNameRef}
              autoComplete="off" //no suggestions
              onChange={(e) => setFirstName(e.target.value)}
              value={firstname}
              required
            />

            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              ref={lastNameRef}
              autoComplete="off" //no suggestions
              onChange={(e) => setLastName(e.target.value)}
              value={lastname}
              required
            />

            <label htmlFor="roles">Select Role:</label>
            <select
              id="roles"
              value={Object.keys(roles)[0] || ""}
              ref={rolesRef}
              required
              onChange={(e) => {
                const selectedRoleKey = e.target.value;
                setRoles({
                  [selectedRoleKey]: ROLES_LIST[selectedRoleKey],
                });
              }}
            >
              <option value="">Select an option</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
              <option value="User">User</option>
            </select>

            <label htmlFor="passowrd">Password:</label>
            <input
              type="password"
              id="passowrd"
              ref={passwordRef}
              autoComplete="off" //no suggestions
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "hide"
              }
            >
              Must be 8 to 24 characters in length.
              <br />
              Must have one uppercase, one lowercase letter, and one digit
              <br />
              Must have one special character (!, @, #, $, or %).
            </p>

            <label htmlFor="matchPassowrd">Confirm Password:</label>
            <input
              type="password"
              id="matchPassowrd"
              ref={matchPasswordRef}
              autoComplete="off" //no suggestions
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchpwdnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="validpwdnote"
              className={
                matchPassword && matchFocus && !validMatch
                  ? "instructions"
                  : "hide"
              }
            >
              Passwords Must Match!
            </p>

            <button
              className="reg-button"
              disabled={
                !validUsername || !validPassword || !validMatch ? true : false
              }
            >
              SignUp
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
