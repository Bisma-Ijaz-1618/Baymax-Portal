import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState(generateRandomData());

  function generateRandomData() {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        time: i,
        spo2: Math.floor(Math.random() * 100),
        heartRate: Math.floor(Math.random() * 100),
        respirationRate: Math.floor(Math.random() * 100),
        bloodPressure: Math.floor(Math.random() * 100),
      });
    }
    return data;
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Sensor Dashboard</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>SPO2 Sensor</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sensorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" domain={[0, 9]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="spo2"
                name="SPO2"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <h4>Heart Rate Sensor</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sensorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" domain={[0, 9]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="heartRate"
                name="Heart Rate"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Respiration Rate Sensor</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sensorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" domain={[0, 9]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="respirationRate"
                name="Respiration Rate"
                stroke="#ffc658"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <h4>Blood Pressure Sensor</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sensorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" domain={[0, 9]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bloodPressure"
                name="Blood Pressure"
                stroke="#000000"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Combined Sensor Readings</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sensorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" domain={[0, 9]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="spo2"
                name="SPO2"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="heartRate"
                name="Heart Rate"
                stroke="#82ca9d"
              />
              <Line
                type="monotone"
                dataKey="respirationRate"
                name="Respiration Rate"
                stroke="#ffc658"
              />
              <Line
                type="monotone"
                dataKey="bloodPressure"
                name="Blood Pressure"
                stroke="#000000"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default SensorDashboard;
