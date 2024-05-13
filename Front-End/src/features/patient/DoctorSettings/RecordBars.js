import React from "react";
import { Container, Card, ProgressBar, Row, Col, Form } from "react-bootstrap";

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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const records = generateRecords();

  return (
    <Card>
      <Card.Header className="white-bg d-flex justify-content-between align-items-center">
        <h5 className="p-0 m-0">Record Summary</h5>
        <div>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
      </Card.Header>
      <Card.Body
        className="scroll-container p-2 d-flex flex-column"
        style={{ maxHeight: "300px", overflowX: "auto" }}
      >
        <Row className="p-2 d-flex flex-row justify-content-start align-items-center">
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

        <Container className="record-summary-container">
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
        </Container>
      </Card.Body>
    </Card>
  );
};

export default RecordCard;
