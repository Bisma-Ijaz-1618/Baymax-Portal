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
      <>
        <Row className="text-center">
          <h1 className="water-color">How Do You Want To Register?</h1>
        </Row>
        <Row className="col-md-10 h-100 m-auto align-items-center">
          <Col className=" reg-type-container  py-4 m-auto">
            <Row className="mx-5 px-5 py-2 justify-content-around">
              <Link to="hospital">
                <Button className="w-100 water-bg my-2">
                  Register your Hospital/Clinic
                </Button>
              </Link>
              <Link to="doctor">
                <Button className="w-100 water-bg my-2">
                  Register as a Doctor
                </Button>
              </Link>
              <Link to="patient">
                <Button className="w-100 water-bg my-2">
                  Register as a Patient
                </Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </>
    </>
  );
};

export default RegType;
