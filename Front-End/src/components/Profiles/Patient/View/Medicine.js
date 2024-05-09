import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FaPlusCircle, FaSave, FaPills, FaEdit, FaTrash } from "react-icons/fa";

function PatientMedicineAccordion() {
  const [medicines, setMedicines] = useState([
    {
      name: "Aspirin",
      frequency: 1,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    {
      name: "Ibuprofen",
      frequency: 2,
      days: ["Monday", "Wednesday", "Friday"],
    },
    {
      name: "Paracetamol",
      frequency: 1,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    frequency: 1,
    days: [],
  });

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the newMedicine state when modal is closed
    setNewMedicine({
      name: "",
      frequency: 1,
      days: [],
    });
  };

  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: value,
    });
  };

  const handleDaysSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewMedicine({
      ...newMedicine,
      days: selectedOptions,
    });
  };

  const addMedicine = () => {
    handleShowModal();
  };

  const handleSaveMedicine = () => {
    setMedicines([...medicines, newMedicine]);
    handleCloseModal();
  };
  const handleEditMedicine = (index) => {
    const medicineToEdit = medicines[index];
    setNewMedicine({
      name: medicineToEdit.name,
      frequency: medicineToEdit.frequency,
      days: [...medicineToEdit.days],
    });
    setShowModal(true);
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };
  const handleDeleteMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const renderMedicineRows = () => {
    return medicines.map((medicine, index) => (
      <Row
        className="my-2 d-flex flex-row justify-content-center alin-items-center"
        key={index}
      >
        <Col>
          <Row xs="auto" className="my-2">
            <div className="timeline-badge black-color">
              <FaPills />
            </div>
            <h4 className="my-2 timeline-title">{medicine.name}</h4>
          </Row>
          <Row>
            <div className="mx-3 my-2 px-5 py-0 timeline-panel white-bg">
              <p>Frequency: {medicine.frequency}</p>
              <p>Days: {medicine.days.join(", ")}</p>
            </div>
          </Row>
        </Col>
        <Col
          sm="auto"
          className="d-flex flex-row align-items-center justify-content-center"
        >
          <Button
            className="mx-2 profile-section-btn water-color"
            onClick={() => handleEditMedicine(index)}
          >
            <FaEdit />
          </Button>
          <Button
            className="mx-2 profile-section-btn water-color"
            onClick={() => handleDeleteMedicine(index)}
          >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    ));
  };

  const handleDaysCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (value === "EveryDay" && checked) {
      setNewMedicine({
        ...newMedicine,
        days: ["Everyday"],
      });
    } else if (value === "EveryDay" && !checked) {
      setNewMedicine({
        ...newMedicine,
        days: [],
      });
    } else {
      if (checked) {
        setNewMedicine({
          ...newMedicine,
          days: [...newMedicine.days, value],
        });
      } else {
        setNewMedicine({
          ...newMedicine,
          days: newMedicine.days.filter((day) => day !== value),
        });
      }
    }
  };
  return (
    <>
      <Row className="mt-3 profile-section white-bg water-border rounded">
        <Row className="py-2 profile-heading-row water-color">
          <Col xs={8}>
            <h4 className="profile-heading-text">Medicine Schedule</h4>
          </Col>
          <Col
            xs={4}
            className="mx-0 px-0 d-flex justify-content-end align-items-center"
          >
            <Button
              className="mx-2 profile-section-btn water-color"
              onClick={addMedicine}
            >
              <FaPlusCircle />
            </Button>
            <Button
              className="mx-2 profile-section-btn water-color"
              onClick={addMedicine}
            >
              <FaSave />
            </Button>
          </Col>
        </Row>
        <Row className="w-100">
          <Container fluid className="profile-sub-section">
            {renderMedicineRows()}
          </Container>
        </Row>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine name"
                name="name"
                value={newMedicine.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="frequency">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter frequency"
                name="frequency"
                value={newMedicine.frequency}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="days">
              <Form.Label>Days</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="EveryDay"
                  name="days"
                  value="EveryDay"
                  checked={newMedicine.days.length === 7}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Monday"
                  name="days"
                  value="Monday"
                  checked={newMedicine.days.includes("Monday")}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Tuesday"
                  name="days"
                  value="Tuesday"
                  checked={newMedicine.days.includes("Tuesday")}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Wednesday"
                  name="days"
                  value="Wednesday"
                  checked={newMedicine.days.includes("Wednesday")}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Thursday"
                  name="days"
                  value="Thursday"
                  checked={newMedicine.days.includes("Thursday")}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Friday"
                  name="days"
                  value="Friday"
                  checked={newMedicine.days.includes("Friday")}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Saturday"
                  name="days"
                  value="Saturday"
                  checked={newMedicine.days.includes("Saturday")}
                  onChange={handleDaysCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Sunday"
                  name="days"
                  value="Sunday"
                  checked={newMedicine.days.includes("Sunday")}
                  onChange={handleDaysCheckboxChange}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveMedicine}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PatientMedicineAccordion;
