import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

function PaymentList() {
  const payments = [
    {
      department: "Cardiology",
      status: "Pending",
    },
    {
      department: "Dentistry",
      status: "Approved",
    },
    // Add more payments
  ];

  const departmentIcons = {
    Cardiology: faCreditCard,
    Dentistry: faCreditCard,
    // Add more department icons
  };

  const statusIcons = {
    Pending: faExclamationCircle,
    Approved: faCheckCircle,
    // Add more status icons
  };

  return (
    <Card className="mt-4">
      <Card.Header>
        <h5>Payment History</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {payments.map((payment, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex border rounded my-1 p-3 mx-2"
          >
            <Row className="align-items-center">
              <Col sm={"auto"}>
                <Row>
                  <p className="mb-0">
                    <FontAwesomeIcon
                      icon={departmentIcons[payment.department]}
                    />
                    <strong>{payment.department}</strong>
                  </p>
                </Row>
                <Row>
                  <p className="mb-0">
                    <FontAwesomeIcon icon={statusIcons[payment.status]} />{" "}
                    {payment.status}
                  </p>
                </Row>
              </Col>
              <Col sm={"auto"} className="justify-content-lg-end">
                <Button variant="primary">
                  <FontAwesomeIcon icon={faCreditCard} />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default PaymentList;
