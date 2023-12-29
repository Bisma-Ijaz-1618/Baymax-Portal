import { useRef, useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuthHook";
import { Outlet } from "react-router-dom";
const RegType = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container
        fluid
        className="auth-container justify-content-center align-items-center"
      >
        <Row className=" col-md-10 auth-row d-flex justify-content-center">
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
          <Col className="py-5 px-5 col-md-8">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegType;
