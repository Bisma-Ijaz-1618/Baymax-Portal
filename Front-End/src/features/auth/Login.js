import { useRef, useState, useEffect, useContext } from "react";

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
  const [passwordFocus, setPasswordFocus] = useState(false);

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
      } else if (roles.includes(2001)) {
        navigate("/auth/user", { replace: true });
      }
      //clear input fields out of the registeration form.
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
      <section className="authSection">
        <h1 className="auto">LogIn</h1>
        <br />
        <form className="authForm" onSubmit={handleLogin}>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "hide"}
            aria-live="assertive"
          >
            {errMsg}
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
          <button disabled={!validPassword || !validEmail ? true : false}>
            LogIn
          </button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
