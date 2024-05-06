import React from "react";
import { Button, ListGroup, Card, Col, Row, Badge } from "react-bootstrap";
import { FaExpand } from "react-icons/fa";
import Objects from "../../../../utils/dateUtil";
const AppointmentList = ({ Title, Array, Length, isHorizontal }) => {
  console.log(Title, Length);
  const handleExpandClick = () => {};
  const DateOptions = Object.DateOptions;
  const TimeOptions = Object.TimeOptions;
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          {Title} <Badge bg="primary">{Length ? Length : 0}</Badge>
        </h5>
        <Button
          variant="link"
          className="my-0 btn-icon"
          onClick={handleExpandClick}
        >
          <FaExpand />
        </Button>
      </Card.Header>

      <Card.Body>
        <ListGroup {...(isHorizontal ? { horizontal: true } : {})}>
          {Array.map((item, index) => (
            <ListGroup.Item key={index} className="">
              <Row className="justify-content-around">
                <Col className="justify-content-start">
                  <h5 className="my-0">{item.value1}</h5>
                </Col>
                <Col className="justify-content-end"></Col>
              </Row>
              <Row>
                <p>
                  Date;{" "}
                  {new Date(item.value2).toLocaleString("en-US", DateOptions)}
                </p>
                <p>
                  Time:{" "}
                  {new Date(item.value3).toLocaleTimeString([], TimeOptions)} -{" "}
                  {new Date(item.value4).toLocaleTimeString([], TimeOptions)}
                </p>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default AppointmentList;
