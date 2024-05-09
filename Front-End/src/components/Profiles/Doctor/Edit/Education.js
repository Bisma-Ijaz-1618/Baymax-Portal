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
import { FaGraduationCap, FaPlusCircle, FaSave } from "react-icons/fa";

function DoctorEducationAccordion() {
  const [educations, setEducations] = useState([
    {
      degree: "Bachelor of Medicine",
      school: "Medical University",
      fieldOfStudy: "Medicine",
      startDate: "2012-09-01",
      endDate: "2018-06-30",
      grade: "Distinction",
    },
    {
      degree: "Master of Surgery",
      school: "Surgical College",
      fieldOfStudy: "Surgery",
      startDate: "2018-09-01",
      endDate: "2022-06-30",
      grade: "High Merit",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the newEducation state when modal is closed
    setNewEducation({
      degree: "",
      school: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
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
            <FaGraduationCap />
          </div>
          <h4 className="my-2 timeline-title ">{education.degree}</h4>
        </Row>
        <Row>
          <div className="mx-3 my-2 px-5 py-0 timeline-panel">
            <p>
              <strong>{education.school}</strong>
            </p>
            <p>{education.fieldOfStudy}</p>
            <p>
              {formatDateInWords(education.startDate)} -{" "}
              {formatDateInWords(education.endDate)}
            </p>
            <p>{education.grade}</p>
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
            <h4 className="profile-heading-text">Education</h4>
          </Col>
          <Col
            xs={4}
            className="mx-0 px-0 d-flex justify-content-end align-items-center"
          >
            <Button
              className="mx-2 profile-section-btn water-color"
              onClick={addEducation}
            >
              <FaPlusCircle />
            </Button>
            <Button
              className="mx-2 profile-section-btn water-color"
              onClick={addEducation}
            >
              <FaSave />
            </Button>
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
          <Modal.Title>Add Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="degree">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="school">
              <Form.Label>School</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school"
                name="school"
                value={newEducation.school}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="fieldOfStudy">
              <Form.Label>Field of Study</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter field of study"
                name="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={newEducation.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={newEducation.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter grade"
                name="grade"
                value={newEducation.grade}
                onChange={handleInputChange}
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
