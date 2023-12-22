import { useRef, useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuthHook";
const RegType = () => {
  const navigate = useNavigate();

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
              <h6 className="underline">Have an account?</h6>
              <Button
                onClick={(e) => navigate("/auth/login", { replace: false })}
                className="mx-2 water-bg"
              >
                Login Now!
              </Button>
            </Row>
          </Col>
          <Col className="py-5 px-5 col-md-8 justify-content-around">
            <Row className="text-center">
              <h1 className="water-color">How Do You Want To Register?</h1>
            </Row>
            <Row className="col-md-10 h-100 m-auto align-items-center">
              <Col className=" reg-type-container  py-4 m-auto">
                <Row className="mx-5 px-5 py-2 justify-content-around">
                  <Button
                    onClick={(e) =>
                      navigate("/register/hospital", { replace: false })
                    }
                    className="w-100 water-bg my-2"
                  >
                    Register your Hospital/Clinic
                  </Button>
                  <Button
                    onClick={(e) =>
                      navigate("/register/doctor", { replace: false })
                    }
                    className="water-bg my-2"
                  >
                    Register as a Doctor
                  </Button>
                  <Button
                    onClick={(e) =>
                      navigate("/register/patient", { replace: false })
                    }
                    className="water-bg my-2"
                  >
                    Register as a Patient
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegType;
