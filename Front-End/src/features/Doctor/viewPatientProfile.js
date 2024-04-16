import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

// Function to generate random patient data
const generateRandomPatientData = () => {
  // Generate random patient information
  const patient = {
    userId: "123", // Example userId
    username: "John Doe",
    age: Math.floor(Math.random() * 90) + 10, // Random age between 10 and 99
    gender: Math.random() < 0.5 ? "Male" : "Female", // Random gender
    address: {
      address: "123 Main St",
      city: "New York",
    },
    contactNumber: "1234567890",
    eContactNumber: "0987654321",
    cnicNumber: "1234567890123",
    bloodGroup: "A+",
    DOB: new Date(1990, 5, 15), // Example date of birth (YYYY, MM, DD)
    imageUrl: `https://randomuser.me/api/portraits/${
      Math.random() < 0.5 ? "men" : "women"
    }/${Math.floor(Math.random() * 100)}.jpg`, // Random profile picture URL
    backgroundBannerUrl: `https://picsum.photos/1200/400?random=${Math.floor(
      Math.random() * 100
    )}`, // Random background banner URL
  };
  return patient;
};

const PatientProfilePage = () => {
  const [patient] = useState(generateRandomPatientData());

  return (
    <Container>
      <Row>
        <Col>
          <h1>Patient Profile</h1>
          <hr />
          <Row>
            <Col md={4}>
              <Image src={patient.backgroundBannerUrl} fluid />
              <Image
                src={patient.imageUrl}
                roundedCircle
                fluid
                className="mt-3"
              />
            </Col>
            <Col md={8}>
              <h3>{patient.username}</h3>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>Gender:</strong> {patient.gender}
              </p>
              <p>
                <strong>Address:</strong> {patient.address.address},{" "}
                {patient.address.city}
              </p>
              <p>
                <strong>Contact Number:</strong> {patient.contactNumber}
              </p>
              <p>
                <strong>Emergency Contact Number:</strong>{" "}
                {patient.eContactNumber}
              </p>
              <p>
                <strong>CNIC Number:</strong> {patient.cnicNumber}
              </p>
              <p>
                <strong>Blood Group:</strong> {patient.bloodGroup}
              </p>
              <p>
                <strong>Date of Birth:</strong> {patient.DOB.toDateString()}
              </p>
              {/* Add more fields as needed */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientProfilePage;
