import React from "react";
import {
  Button,
  Container,
  Card,
  ProgressBar,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const generateRecords = () => {
  const numRecords = Math.floor(Math.random() * 6) + 1; // Randomize number of records (1 to 6)
  const records = [];
  for (let i = 0; i < numRecords; i++) {
    const readings = [
      "Temperature",
      "SpO2",
      "Heart Rate",
      "Respiration Rate",
    ].map((reading) => ({
      reading,
      progress: getRandomProgress(),
    }));
    records.push({ id: i + 1, readings });
  }
  return records;
};

const getRandomProgress = () => {
  const progressOptions = ["success", "warning", "danger"];
  const randomIndex = Math.floor(Math.random() * progressOptions.length);
  return progressOptions[randomIndex];
};

const RecordCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const records = generateRecords();
  const handleViewRecord = () => {
    navigate(`/auth/doctor/AllRecords/${id}`);
  };
  return (
    <Row className="mt-3 profile-section white-bg water-border rounded">
      <Row className="py-2 profile-heading-row water-color">
        <Col>
          <h5 className="profile-heading-text">Record Summary</h5>
        </Col>
        <Col
          xs={4}
          className="mx-0 px-0 d-flex justify-content-end align-items-center"
        >
          {" "}
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
          />
          <Button
            onClick={() => {
              handleViewRecord();
            }}
            className="m-0 p-2 water-color profile-section-btn ms-2"
          >
            <FaEye />
          </Button>
        </Col>
      </Row>
      <Row
        className="scroll-container"
        style={{ height: "200px", overflowX: "auto" }}
      >
        <Row
          style={{ height: "50px" }}
          className="p-0  justify-content-start align-items-center"
        >
          <Col md="auto">Key: </Col>

          <Col md={2} className="mx-2  rounded green-bg h-80">
            {" "}
            Normal
          </Col>
          <Col md={2} className="mx-2  rounded yellow-bg h-80">
            {" "}
            Risky
          </Col>
          <Col md={2} className="mx-2  rounded fire-bg h-80">
            {" "}
            Critical
          </Col>
        </Row>
        <Row className="record-summary-container">
          <Row className="p-2 ">
            {records.map((record, index) => (
              <Col key={index} md="auto" className=" border p-2 rounded m-1">
                <div className="record-item-container">
                  <h6>
                    Record ID:{" "}
                    {Math.floor(Math.random() * (1000 - 100 + 1)) + 100}
                  </h6>
                  {record.readings.map((reading, index) => (
                    <Row key={index} className="align-items-center">
                      <Col>{reading.reading}</Col>
                      <Col md={2}>
                        <ProgressBar now={100} variant={reading.progress} />
                      </Col>
                    </Row>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

export default RecordCard;
