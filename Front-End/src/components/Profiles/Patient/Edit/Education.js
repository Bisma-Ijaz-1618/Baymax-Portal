import { useState } from "react";
import {
  Toast,
  ToastContainer,
  Accordion,
  Button,
  Card,
  Col,
  Form,
  Container,
  Row,
  Modal,
} from "react-bootstrap";
import {
  FaBandAid,
  FaGraduationCap,
  FaPlusCircle,
  FaSave,
} from "react-icons/fa";

function DoctorEducationAccordion() {
  const [educations, setEducations] = useState([
    {
      Condition: "Autoimmune Haemolytic Anaemia",
      diagnosisTime: "2020-09-01",
      severity: 8,
    },
    {
      Condition: "ASD Secundum",
      diagnosisTime: "2018-09-01",
      severity: 9,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEducation, setNewEducation] = useState({
    Condition: "",
    severity: "",
    diagnosisTime: "",
    endDate: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the newEducation state when modal is closed
    setNewEducation({
      Condition: "",
      diagnosisTime: "",
      endDate: "",
      severity: "",
    });
  };
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: value,
    });
  };

  const addEducation = () => {
    handleShowModal();
  };

  const handleSaveEducation = () => {
    setEducations([...educations, newEducation]);
    handleCloseModal();
  };
  const formatDateInWords = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  };
  const renderEducationRows = () => {
    return educations.map((education, index) => (
      <Row className="my-2" key={index}>
        <Row xs="auto" className="my-2">
          <div className="timeline-badge black-color">
            <FaBandAid />
          </div>
          <h4 className="my-2 timeline-title ">{education.Condition}</h4>
        </Row>
        <Row>
          <div className="mx-3 my-2 px-5 py-0 timeline-panel">
            <p>
              <strong>{education.school}</strong>
            </p>
            <p>{education.fieldOfStudy}</p>
            <p>
              {formatDateInWords(education.diagnosisTime)} -{" "}
              {formatDateInWords(education.endDate)}
            </p>
            <p>Severity : {education.severity}</p>
          </div>
        </Row>
      </Row>
    ));
  };
  return (
    <>
      <Row className="mt-3 profile-section white-bg water-border rounded ">
        <Row className="py-2 profile-heading-row water-color">
          <Col xs={8}>
            <h4 className="profile-heading-text">Symptoms/Conditions</h4>
          </Col>
        </Row>
        <Row>
          <Container className="profile-sub-section">
            {renderEducationRows()}
          </Container>
        </Row>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Disease</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Condition">
              <Form.Label>Condition</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Condition"
                name="Condition"
                value={newEducation.Condition}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="diagnosisTime">
              <Form.Label>Since</Form.Label>
              <Form.Control
                type="date"
                name="diagnosisTime"
                value={newEducation.diagnosisTime}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="severity">
              <Form.Label>Severity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter severity"
                name="severity"
                value={newEducation.severity}
                onChange={handleInputChange}
                min="1"
                max="10"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEducation}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DoctorEducationAccordion;
