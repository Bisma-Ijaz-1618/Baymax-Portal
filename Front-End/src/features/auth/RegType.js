import { Row, Col, Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegType = () => {
  return (
    <>
      <>
        <Row className="text-center">
          <h1 className="water-color">How Do You Want To Register?</h1>
        </Row>
        <Row className="col-md-10 h-100 m-auto align-items-center">
          <Col className=" reg-type-container  py-4 m-auto">
            <Row className="mx-5 px-5 py-2 justify-content-around">
              {/* <Link to="hospital">
                <Button className="w-100 water-bg my-2">
                  Register your Hospital/Clinic
                </Button>
              </Link> */}
              <Link to="doctor" className="my-2">
                <Button className="w-100 water-bg my-2">
                  Register as a Doctor
                </Button>
              </Link>
              <Link to="patient" className="my-2">
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
