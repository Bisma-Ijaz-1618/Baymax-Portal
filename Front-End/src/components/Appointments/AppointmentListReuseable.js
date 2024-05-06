import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { BsCalendar, BsClockFill } from "react-icons/bs";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
function AppointmentList({ headingColor, title, appointments }) {
  const CategoryList = ["Urgent", "Today", "All"];
  const [selectedCategory, setSelectedCategory] = useState(CategoryList[0]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <>
      <Card className="align-items-stretch" style={{ border: "none" }}>
        <Card.Header className="d-flex flex-row justify-content-between white-bg align-items-center">
          <h5 className="black-color p-0 m-0">Appointments</h5>
          <Form.Group controlId="categorySelect">
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {CategoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Card.Header>
        <ListGroup variant="flush py-1 px-1">
          {appointments.map((appointment, index) => (
            <ListGroup.Item key={index} className="border rounded m-1 p-1">
              <Row className="m-0 px-0 d-flex flex-row align-items-center justify-content-start text-left">
                <Col md="auto" className="list-icon-holder p-0 m-0">
                  <BsClockFill className=" m-0 water-color" />
                </Col>
                <Col className="mx-2">
                  <Row>
                    <strong className="p-0 m-0"> Name</strong>
                  </Row>
                  <Row>Date</Row>
                </Col>

                <Col sm="auto" className="p-0 m-0 justify-content-start">
                  <Row sm="auto" className="p-0 m-1">
                    <Button variant="primary" className="p-1 water-bg w-100">
                      <small>Reshedule</small>
                    </Button>
                  </Row>
                  <Row sm="auto" className="p-0 m-1">
                    <Button variant="outline-danger" className="p-0 w-100">
                      <small>Cancel</small>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
}

export default AppointmentList;
