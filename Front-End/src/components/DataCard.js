import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import logo from "../img/background2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faEye,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
function Data_Card() {
  return (
    <Card border="info" bg="dark" className="data-card">
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>Some quick exaample text </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex justify-content-around">
        <Button
          variant="outline-success"
          className="rounded-circle icon-button"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button variant="outline-danger" className="rounded-circle icon-button">
          <FontAwesomeIcon icon={faHeart} />
        </Button>
        <Button variant="outline-info" className="rounded-circle icon-button">
          <FontAwesomeIcon icon={faEye} />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Data_Card;
