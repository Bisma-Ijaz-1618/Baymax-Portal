import { useState } from "react";
import { Offcanvas, Button, Container, Row, Col } from "react-bootstrap";
import Draggable from "react-draggable";
import { FaChartLine } from "react-icons/fa";
import LineGraph from "./LineGraph";
const DraggableOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" className="mx-1" onClick={handleShow}>
        <FaChartLine />{" "}
      </Button>

      <Draggable handle=".offcanvas-header">
        <Offcanvas
          show={show}
          onHide={handleClose}
          backdrop={false}
          placement="bottom"
          className="sensors-offcanvas"
        >
          <Offcanvas.Header closeButton className="offcanvas-header">
            <Offcanvas.Title>Sensor Readings Time Lapse</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container className="d-flex flex-row flex-wrap">
              <h5>Heart Rate</h5>
              <LineGraph />
              <h5>SpO2</h5>
              <LineGraph />
              <h5>Respiration Rate</h5>
              <LineGraph />
              <h5>Temperature</h5>
              <LineGraph />
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
      </Draggable>
    </>
  );
};

export default DraggableOffcanvas;
