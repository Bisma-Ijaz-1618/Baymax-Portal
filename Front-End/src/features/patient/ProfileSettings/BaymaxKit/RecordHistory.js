import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const RecordHistoryPage = () => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate("../record");
  };
  const [records, setRecords] = useState([
    {
      id: 1,
      spo2: getRandomStatus(),
      heartRate: getRandomStatus(),
      respirationRate: getRandomStatus(),
      bloodPressure: getRandomStatus(),
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      date: "2024-03-15",
    },
    {
      id: 2,
      spo2: getRandomStatus(),
      heartRate: getRandomStatus(),
      respirationRate: getRandomStatus(),
      bloodPressure: getRandomStatus(),
      startTime: "11:30 AM",
      endTime: "12:30 PM",
      date: "2024-03-15",
    },
    {
      id: 3,
      spo2: getRandomStatus(),
      heartRate: getRandomStatus(),
      respirationRate: getRandomStatus(),
      bloodPressure: getRandomStatus(),
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      date: "2024-03-15",
    },
    {
      id: 4,
      spo2: getRandomStatus(),
      heartRate: getRandomStatus(),
      respirationRate: getRandomStatus(),
      bloodPressure: getRandomStatus(),
      startTime: "2:30 PM",
      endTime: "3:30 PM",
      date: "2024-03-15",
    },
    {
      id: 5,
      spo2: getRandomStatus(),
      heartRate: getRandomStatus(),
      respirationRate: getRandomStatus(),
      bloodPressure: getRandomStatus(),
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      date: "2024-03-15",
    },
  ]);

  const handleSend = () => {
    console.log("Records sent");
  };

  // Function to generate random sensor status
  function getRandomStatus() {
    const statuses = ["Normal", "High", "Low"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  return (
    <div className="container mt-4">
      <h2>Record History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>SPO2</th>
            <th>Heart Rate</th>
            <th>Respiration Rate</th>
            <th>Blood Pressure</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Date</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.spo2}</td>
              <td>{record.heartRate}</td>
              <td>{record.respirationRate}</td>
              <td>{record.bloodPressure}</td>
              <td>{record.startTime}</td>
              <td>{record.endTime}</td>
              <td>{record.date}</td>
              <td>
                <Button className="mx-2" variant="primary" onClick={handleSend}>
                  Send
                </Button>
                <Button className="mx-2" variant="primary" onClick={handleView}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecordHistoryPage;
